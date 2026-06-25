# Injection Playbook — filling the wiki from the EPUB

How new chapter content is added to the Lord of the Mysteries living wiki. **Claude does all
injection; the user only reads and sets the chapter cutoff.** The non-negotiable rule: **every
atomic fact ships with a verbatim quote from its chapter, verified by `node --test`.** No quote ⇒
the fact does not ship.

## The hard boundary
- Read ONLY `_epub_extract/OEBPS/chapter0.html` … `chapter{cutoff-1}.html`.
  `chapterN.html` = novel chapter `N+1`. Current cutoff: `data/meta.js` → `encodedThroughChapter`.
- Never open a chapter file past the cutoff. Never use outside knowledge of later events.

## The fact model (what to write)
Add facts to the right `data/<type>.js` file. Universal fields: `id`, `first_appeared_chapter`
(+ `first_appeared_quote`), optional `states[]`/`events[]`/`aliases[]`/`sequences[]`/`facts[]`/
`entries[]`/`members[]`, and `sources[]` on blurbs.

- **Atomic fact** (a single sourceable claim): carries its value + chapter + `quote`.
  Chapter field by kind: `states/aliases/relationships/members` → `since_chapter`;
  `events/facts/entries` → `chapter`; `sequences` → `known_chapter`; entity intro →
  `first_appeared_chapter` + `first_appeared_quote`.
- **`quote`** = a short (≈3–10 words) span copied **verbatim** from the cited chapter file that
  genuinely **supports** the claim (not just contains the words — read the surrounding text).
  Copy real bytes, including any EPUB typos. Verify before saving:
  `node -e "const G=require('./tools/grounding.js'); console.log(G.quoteInChapter('YOUR QUOTE', CHAPTER))"` → must print `{ ok: true }`.
- **`blurb_ar`** = a prose summary. It carries `sources: [chapters]` (no single quote) and must not
  claim anything beyond those cited chapters.
- **If a fact can't earn a supporting verbatim quote ≤ cutoff: drop it** (and report it). Never
  invent a quote.

## The per-batch loop
1. **Confirm the cutoff** with the user (it only moves forward as they read).
2. **Read in batches.** Dispatch sub-agents over ranges of allowed chapter files; each emits
   candidate facts as `{ collection, entity_id, field, value, chapter, quote }`, copying quotes
   verbatim. Spoiler rule applies to every agent.
3. **Gate.** Run `node --test`. The grounding suite (`test/grounding.test.js`) rejects any fact
   whose quote isn't found in its cited chapter; drop those candidates.
4. **Merge** the verified facts into the right `data/*.js` files — new entities, or new
   chapter-stamped `states`/`events`/etc. on existing ones. Keep referential integrity (every
   `family_id`/`member_ids`/`parent_id`/`pathway.id`/`hq_location_id`/`ref.id` must resolve).
5. **Bump `meta.encodedThroughChapter`** only once the batch is fully merged and green.
6. **Deliver a change report:** entities/facts added (each with chapter + quote) and a list of any
   dropped/unverifiable candidates.

## What the tests guarantee (run `node --test`)
- `grounding.test.js` — every fact's quote is verbatim-present in its cited chapter (skips if
  `_epub_extract/` is absent). Includes a guard test proving a wrong quote is rejected.
- `data.test.js` — nothing stamped past the cutoff; ids unique; referential + temporal integrity.
- `engine`/`grounding-helper` — resolver + verifier unit tests.

## Caveat the verifier does NOT catch
The quote test proves a quote is *real and in its chapter*, not that it *supports the claim*. That
semantic judgment is the writer's job — pick on-topic spans, read context, prefer the passage that
names the entity/event. When unsure, drop.

## Deaths (spoiler-safe)
A character death is recorded with a top-level `death_chapter: N` field (NOT `status:'dead'`, which would leak before the slider reaches it). The engine derives `status:'dead'` only once `chapter >= death_chapter`. Keep `status:'alive'` and add `death_chapter`, plus a chapter-stamped death `event` with a verbatim quote.
