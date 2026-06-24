# LotM Living Wiki — Verifiable Data Architecture (Design Spec)

**Date:** 2026-06-24
**Status:** Approved direction, pre-implementation
**Builds on:** Phase 1 + Phase 2 shell (merged). The UI/behavior is complete and unchanged by this work.

---

## 1. Why

The Phase-2 seed let two fabrications through (a «كنيسة الإله القدير» church/family that never appears by ch.250; Audrey stamped Seq 9 when she is Seq 8). Root cause: "grounding" was a loose word-grep, not evidence. The user will have **Claude do all data entry from the EPUB**, so the system must make fabrication *structurally impossible to ship* and must *scale* as content grows over months. Decisions taken:
- **Injection model:** Claude extracts and writes all data; the user does not hand-edit. Optimize for a machine pipeline + strict validation.
- **Grounding rigor:** **every atomic fact carries a verbatim quote + its chapter, and an automated test verifies the quote exists in that chapter file.** No quote ⇒ not shipped.

## 2. Non-goals / unchanged

- The wiki **behavior** (chapter slider, spoiler engine, sections, map, cross-links, tooltips) is correct and stays as-is.
- Hard spoiler boundary stays ch.250; `chapterN.html` = novel ch `N+1`; read only `chapter0.html`…`chapter249.html`.
- `file://` double-click run model, RTL Arabic, zero npm deps, Babel `text/plain#appsrc` classic runtime — all preserved.

## 3. The fact model (cited + quoted)

An **atomic fact** is any single, sourceable claim. It carries its evidence inline:

```js
// state snapshot (supersedes earlier ones), evidenced by ONE representative quote:
{ since_chapter: 219, quote: "…ترقّت العدالة إلى التسلسل الثامن…",
  sequence: "التسلسل 8: الوسيط", location: "…", faction: "…" }

// standalone facts each carry { chapter, quote } alongside their value:
alias:    { name: "شيرلوك موريارتي", chapter: 215, quote: "…شيرلوك موريارتي…" }
event:    { chapter: 21, text: "…", quote: "…" }
sequence: { n: 8, name_ar: "…", known_chapter: 219, quote: "…" }
member:   { id: "audrey", since_chapter: 21, quote: "…" }
fact:     { chapter: 30, text: "…", quote: "…" }   // era facts, diary entries
```

- **Granularity:** one quote per *state snapshot* (not per field) — the quote evidences that snapshot at that chapter. Standalone facts each carry their own quote.
- **`first_appeared_chapter`** is paired with `first_appeared_quote` (the introduction passage).
- **Blurbs are synthesis, not quotes.** A `blurb_ar` carries `sources: [chapters]` (no single quote) and is understood as a summary derived only from already-cited facts. The validator requires `sources` on blurbs but does not quote-check them.
- The resolver/engine reads `chapter` / `since_chapter` exactly as today; `quote` is metadata it ignores for filtering. (Optional UI: show the quote as a "source" on hover/expand — a "proof" affordance. Nice-to-have, not required.)

## 4. Quote-verification validator (the core guarantee)

A `node --test` suite (`test/grounding.test.js`) that, for every atomic fact across every collection:
1. Resolves the cited chapter to its file: `_epub_extract/OEBPS/chapter{chapter-1}.html`.
2. Loads that file, strips HTML tags, and **normalizes** both the file text and the `quote`: collapse whitespace, strip Arabic tashkeel/diacritics, normalize alef/ya/ta-marbuta variants.
3. Asserts the normalized quote is a substring of the normalized chapter text.
Also keeps the existing guarantees: no stamp > `encodedThroughChapter`; referential integrity; the HQ/temporal-invariant test.
**Effect:** a fact whose quote isn't actually in its cited chapter fails the build. Fabrication cannot ship.

*Constraint:* this test depends on `_epub_extract/` existing locally (it does; gitignored working artifact). The shipped wiki does not need it. If the extract is absent, the grounding test skips with a clear message (so the repo still builds for someone without the EPUB), but it runs in our workflow.

## 5. Scalable storage (split by type)

Retire the monolithic `lotm-data.js`. Introduce `data/`:
- `data/characters.js`, `data/pathways.js`, `data/families.js`, `data/organizations.js`, `data/locations.js`, `data/eras.js`, `data/documents.js`, `data/glossary.js`, `data/meta.js`.
- Each file is a thin wrapper: `(function(g){ (g.LOTM=g.LOTM||{}).characters = [ /* JSON-shaped */ ]; })(typeof window!=='undefined'?window:globalThis);` — JSON-shaped content, but loads on `file://` with no build step and no `fetch`.
- `index.html` loads `lotm-engine.js` then each `data/*.js` before the app block; the app reads the assembled `window.LOTM`.
- Each type-file grows independently; injection appends validated entries to the relevant file. Node tests `require()` the same files (dual export via the `g.LOTM` pattern + `module.exports` of the assembled object through a small `data/index.js` for tests).

*(Alternative considered: pure-JSON sources + a build step that bundles to one JS file. Cleaner separation but breaks "double-click is always fresh" and adds a moving part. Rejected in favor of the buildless type-split, per the run model.)*

## 6. Injection pipeline (Claude-driven, per chapter batch)

1. User states a new cutoff (now 250).
2. Sub-agents read only allowed chapter files, in batches, and emit **candidate facts each with `{value, chapter, quote}`** (verbatim Arabic quotes copied from the file).
3. The quote-validator gates them; any fact whose quote can't be found in its cited chapter is dropped and reported.
4. Verified facts are merged into the `data/*.js` type-files (new entities, or new chapter-stamped states/events on existing ones).
5. Claude delivers a **change report**: entities/facts added, each with its chapter + quote, plus a list of dropped/unverifiable candidates.

## 7. Migration (first implementation step)

Re-express the current seed in the cited+quoted format, which forces re-grounding:
- **Fix:** Audrey → `Seq 8 (الوسيط)` with the real quote+chapter.
- **Delete:** the «الإله القدير» family and `church_god_almighty`/any church lacking a real quote.
- Re-ground the 4 characters + remaining collections; **drop any fact that cannot earn a verbatim quote** (mark dropped items in the migration report).
- Update `index.html` to load `data/*.js`; remove `lotm-data.js`.
- All existing tests (engine 25, data integrity) plus the new grounding test must pass.

## 8. Components & boundaries

- `data/*.js` — content store, one file per type; each independently editable/injectable.
- `lotm-engine.js` — unchanged resolver (reads chapter stamps; ignores quotes).
- `test/grounding.test.js` — quote-existence validator (reads EPUB chapter files).
- `test/data.test.js` — structural + referential + temporal-invariant checks (extended to the split files).
- `index.html` — loads engine + all `data/*.js`; UI unchanged (optional source-on-hover later).
- Extraction sub-agents (Track B) — produce candidate cited facts; not part of the shipped app.

## 9. Success criteria

- All data lives in `data/*.js`, type-split; `index.html` double-click still works.
- `node --test` includes the grounding suite; **a deliberately wrong quote makes it fail** (we verify this).
- Audrey reads Seq 8; the fake church/family are gone; every shipped fact has a verifiable quote (or is a `sources`-cited blurb).
- The pipeline is documented so each future chapter batch injects cleanly with a change report.
- Nothing past ch.250; referential + temporal integrity hold across the split files.
