# LotM Living Wiki — Phase 2 (Interactive Shell) Implementation Plan

> **For agentic workers:** execute task-by-task with subagent-driven-development. Steps use `- [ ]`. The design contract is `docs/superpowers/specs/2026-06-24-lotm-phase2-interactive-wiki-design.md` — read it for any task.

**Goal:** Build the multi-section interactive wiki shell (nav router, map view, Pathways/Organizations/Roselle/Epochs/General sections, welcome slider, cross-links, hover tooltips) on an extended, spoiler-bounded data model. Data is seeded/groundable now; real content fills in Track B.

**Architecture:** Unchanged stack (React 18 UMD + Tailwind + Babel classic via `text/plain#appsrc`, `file://`-runnable). Extend `lotm-engine.js` (generic resolver primitives) and `lotm-data.js` (new collections), grow `index.html` into a view-routed app. Reuse the Phase-1 SVG map from `lotm-world-atlas.html` for the Map view.

**Tech Stack:** React 18 UMD, Tailwind Play, Babel Standalone, Node ≥18 (`node:test`).

## Global Constraints
- Spoiler boundary ch.250; `chapterN.html` = ch N+1; allowed `chapter0..chapter249`. No stamp > 250. No fabrication — every fact cited by chapter.
- Arabic RTL; `file://`; no build; zero npm deps; Babel `text/plain#appsrc` classic runtime (never `type="text/babel"`).
- Universal entity fields: `id`, `first_appeared_chapter`, optional `states[]`(`since_chapter`), `events[]`(`chapter`), `sources[]`. Sub-arrays filtered by their own stamp field.
- Reuse existing CSS tokens; Pathways/sections inherit the dark-glass + red-moon theme.

---

## Task 1 — Engine generalization
**Files:** modify `lotm-engine.js`; modify `test/engine.test.js`.
**Produces:**
- `visibleSub(arr, chapter, key='since_chapter') -> []` — filter any sub-array by its stamp field (`since_chapter`/`chapter`/`known_chapter`), ascending by that field.
- `byId(list, id) -> entity|null`.
- `resolvePathway(p, ch)`, `resolveOrganization(o, ch)`, `resolveEra(e, ch)`, `resolveDocument(d, ch)`, `resolveLocation(l, ch)` — each returns null if `!isVisible`, else `{...identity, state?, <visible sub-arrays>}` (e.g. pathway: `sequences` filtered by `known_chapter`; org: `member_ids` resolved + `events`; era: `facts`; document: `entries`; location: visible `state` + `contains_ids`).
- `visibleOf(list, ch, resolveFn) -> []` — generic visible-and-resolved list.
Keep all Phase-1 functions working unchanged (reimplement `visibleCharacters` on top of the new primitives, identical behavior). Pure, dual-export.
**Steps:** write failing tests for `visibleSub` boundary-inclusive + future-hidden + each resolver returning null pre-introduction and composing sub-arrays at a mid chapter → run (fail) → implement → run (pass, all prior tests still green) → commit.

## Task 2 — Extended data model + seed + validation
**Files:** modify `lotm-data.js`; modify `test/data.test.js`.
- Add collections `families, pathways, organizations, eras, documents, locations, glossary` per the design §4 (universal fields).
- **Seed, grounded by cheap grep over allowed files only** (`chapter0..chapter249`): set each seeded entity's `first_appeared_chapter` to the real first-mention chapter (e.g. النظام السري ch.28, روزيل ch.4, نادي التاروت ch.7). Seed: the families+pathways present in the reference image with conservative `first_appeared_chapter` (a pathway only seeded if its name appears ≤250; leave sequences mostly empty/locked — Track B fills them); `organizations` = نادي التاروت + النظام السري + the main churches; `eras` = the five epochs (order 1–5, blurb minimal, facts via Track B); `documents` = مذكرات روزيل (entries via Track B); `locations` = the existing map regions/cities from `lotm-world-atlas.html` REGIONS/CITIES converted to the new shape (carry `map.cx/cy/poly`); `glossary` = a few core terms (مسار، تسلسل، بيوندر، الضباب الرمادي) with defs grounded in text.
- Do NOT fabricate blurbs — where text isn't yet extracted, use a short factual stub clearly marked (e.g. `blurb_ar` derived only from confirmed mentions) and rely on `sources`.
**Validation tests (extend spoiler test to ALL collections):** every `first_appeared_chapter`, `states[].since_chapter`, `events[].chapter`, `sequences[].known_chapter`, `facts[].chapter`, `entries[].chapter` ≤ cap; ids unique within each collection; **referential integrity**: every `family_id`, `pathway.id` referenced by characters, `member_ids`, `parent_id`, `contains_ids`, `location_id`, glossary `ref.id` resolves to an existing entity. Run → fix → commit.

## Task 3 — App nav shell + view router + welcome slider
**Files:** modify `index.html` (`appsrc`).
- Add `view` state (`'general'|'characters'|'pathways'|'map'|'organizations'|'roselle'|'epochs'`) + a top RTL nav bar (Arabic labels) highlighting the active view; keep the chapter slider in the header on all views.
- **Welcome overlay:** if `localStorage['lotm.chapter']` is unset on load, show a centered glass modal "إلى أي فصل وصلت؟" with the slider (1..CAP) + "ابدأ" button; on confirm, persist and dismiss. Add a small header button to reopen it.
- Render the existing Characters section under `view==='characters'`; stub the other views as labeled placeholders (filled in Tasks 4–6). Default view `'general'`.
- Verify in browser: nav switches views, slider persists across views, welcome overlay appears only when storage is empty. No console errors.

## Task 4 — Map view (data-driven + clickable briefs)
**Files:** modify `index.html` (`appsrc`).
- Port the SVG map (regions, seas, pins, atmosphere) from `lotm-world-atlas.html` into a `MapView` driven by `LOTM.locations` (use `map.poly/cx/cy`). Dim/hide locations with `first_appeared_chapter > chapter`.
- Pins/regions are clickable → a side **brief panel**: location `state.blurb_ar`, a "ما بداخلها" list of `contains_ids` (cross-link chips), and "من هنا الآن" = characters whose resolved state `location_id` is this location (cross-link chips). All slider-bounded.
- Keep pan/zoom-to-region on click; red-moon + vignette retained.
- Verify: at ch.250 expected regions/pins show; clicking باكلوند shows its brief + كلاين/أودري as present; sliding below a location's first chapter hides it.

## Task 5 — Pathways view (spoiler-aware)
**Files:** modify `index.html` (`appsrc`).
- Families as columns (reference-image layout), each listing its visible pathways (`first_appeared_chapter ≤ chapter`); a pathway opens a detail with its sequence ladder 9→0: named where `known_chapter ≤ chapter`, else a locked "؟؟؟" slot; plus blurb + sources.
- A family with no visible pathways is hidden. Pathway detail links to characters on that pathway (cross-link).
- **Decision pending user confirm:** spoiler-aware by default (this task). If user chose full-static-reference instead, render all families/pathways/sequences unfiltered — implement whichever the controller specifies at dispatch.
- Verify: sliding the chapter reveals more pathways/sequences; nothing un-introduced leaks at low chapters.

## Task 6 — Organizations, Roselle, Epochs views
**Files:** modify `index.html` (`appsrc`).
- Three list→detail views sharing one generic `EntityList`/`EntityDetail` pattern: detail shows resolved `blurb_ar` + chapter-cited rows (org: members (cross-links) + events; Roselle: diary entries grouped by `topic_ar`, each "فصل N"; epochs: ordered facts "فصل N"). All slider-bounded.
- Verify each view renders the seed and respects the slider; cross-links from org members open character details.

## Task 7 — Cross-links, hover tooltips, General hub
**Files:** modify `index.html` (`appsrc`).
- `LinkChip({kind,id})` — clickable chip that sets `view` + selected entity for that kind; used everywhere entities reference each other (character→pathway, org→members, location→contains, etc.).
- `Term({children, def, ref})` — inline wrapper showing a glossary def (or short entity blurb) on hover AND keyboard focus (a11y); pulls from `LOTM.glossary` by id when `def` omitted.
- **General hub** (`view==='general'`): mainline-knowledge landing — cards linking to each section + a few key `Term`-annotated concepts (مسار, تسلسل, الحقب, نادي التاروت), each a cross-link.
- Verify: clicking a character's pathway opens the pathway; hovering a glossary term shows its definition; General cards navigate correctly. No console errors.

---

## Track B (separate plan, after the shell) — Focused EPUB extraction
Parallel sub-agents read `chapter0..chapter249` in batches, returning chapter-cited structured data for: main+recurring characters, the 22 pathways' revealed sequences, organizations/sects/churches, مذكرات روزيل entries, the five epochs' facts, and key kingdoms/locations. Controller consolidates + dedupes + chapter-stamps into `lotm-data.js`, then a change report. Replaces seed stubs with real content.

## Self-review checklist
- Spec §4 collections all present (T2) ✔ · §5 engine primitives (T1) ✔ · §6 nav/map/sections/links/tooltips/welcome (T3–T7) ✔ · §3 spoiler-aware pathways (T5, pending confirm) ✔.
- No stamp>250 + referential integrity tested across ALL collections (T2).
- No fabricated blurbs; stubs marked + cited.
