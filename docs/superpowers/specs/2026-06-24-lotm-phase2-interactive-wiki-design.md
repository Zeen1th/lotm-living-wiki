# LotM Living Wiki — Phase 2: Interactive Wiki (Design Spec)

**Date:** 2026-06-24
**Status:** Approved direction (shell-first + focused extraction), pre-implementation
**Builds on:** Phase 1 (merged) — `lotm-engine.js`, `lotm-data.js`, `index.html`, the chapter-stamped resolver + slider.

---

## 1. Goal

Turn the single Characters view into a multi-section **interactive wiki**: a map you can toggle into, plus browsable, cross-linked sections for Pathways, Organizations/Sects, Roselle's Diary, the Five Epochs, and a General/mainline hub — every section spoiler-bounded by the reading-chapter slider, all data grounded in the EPUB (chapters 1–250).

**Two tracks:**
- **Track A (this spec, build now):** the interactive shell — navigation, map view, all section UIs, welcome slider, cross-links, hover tooltips — running on an extended data model. Seeded with what is cheaply groundable; the rest fills from Track B.
- **Track B (follow-on):** focused EPUB extraction populating the new collections with chapter-cited data. Runs after the shell exists.

## 2. Hard rules (unchanged, reaffirmed)

- **Spoiler boundary = ch.250.** Read only `_epub_extract/OEBPS/chapter0.html`…`chapter249.html` (`chapterN.html` = novel ch `N+1`). Nothing stamped beyond 250.
- **No fabrication.** Every fact carries a chapter and comes from the EPUB text. (Phase-1 caught a fabricated "Gehrman Sparrow" alias — that class of error is the thing this rule prevents.)
- **Arabic RTL, `file://`-runnable, no build step, zero npm deps**, Babel classic-runtime workaround preserved.

## 3. Key design decision — Pathways are spoiler-aware (NOT all 22 shown upfront)

The reference image shows the full 22-pathway tree grouped by the "above" deity families. But revealing all 22 pathways and their deities at ch.250 is itself a major spoiler — the reader has not met them all. **Therefore the Pathways tab is itself filtered by the slider:** a pathway (and its deity family) appears only once `first_appeared_chapter ≤ N`, and within a pathway only the sequence names revealed by N are shown; the rest render as locked "؟؟؟" slots. The tab becomes a *discovery board* that fills as you read — consistent with the whole app's principle and with the user's anti-spoiler intent.
*(A "full reference (show spoilers)" toggle can be added later if wanted; default is spoiler-safe.)*

## 4. Data model extensions (`lotm-data.js`)

All entity types use the SAME universal fields so the resolver stays generic: `id`, `first_appeared_chapter`, optional `states[]` (each `since_chapter`), optional `events[]` (each `chapter`), and a `sources: [chapter,…]` citation list. New top-level collections:

```js
families: [   // the "above" / Great Old One groupings from the reference image
  { id, name_ar, name_en, color, first_appeared_chapter, blurb_ar, sources }
]
pathways: [
  { id, name_ar, name_en, family_id, color, first_appeared_chapter,
    sequences: [ { n, name_ar, name_en, known_chapter } ],  // 0..9; only known ones named
    blurb_ar, sources }
]
organizations: [   // sects, clubs, churches — النظام السري, نادي التاروت, الكنائس…
  { id, name_ar, name_en, kind:'sect'|'club'|'church'|'state', first_appeared_chapter,
    states:[ { since_chapter, blurb_ar, leader_id, hq_location_id } ],
    member_ids:[charId], events:[{chapter,text}], sources }
]
eras: [   // الحقب الخمس
  { id, order, name_ar, name_en, first_appeared_chapter, blurb_ar,
    facts:[ { chapter, text } ], sources }
]
documents: [   // مذكرات روزيل and similar in-world texts
  { id, name_ar, name_en, kind:'diary', first_appeared_chapter, blurb_ar,
    entries:[ { chapter, topic_ar, text } ], sources }
]
locations: [   // for the map + Locations browsing
  { id, name_ar, name_en, kind:'kingdom'|'city'|'sea'|'region', parent_id|null,
    map:{ cx, cy, poly? }, first_appeared_chapter,
    states:[ { since_chapter, blurb_ar } ], contains_ids:[id], sources }
]
glossary: [   // hover-tooltip definitions for short terms
  { id, term_ar, def_ar, ref:{ kind, id }|null }   // ref optionally links to an entity
]
```

Character entities also gain optional cross-link fields already supported: `pathway.id` (→ pathways), and a `location_id` on states (→ locations/map).

## 5. Resolver/engine additions (`lotm-engine.js`)

Generalize the Phase-1 functions into reusable primitives + thin per-type wrappers:
- `visibleList(list, chapter)` — generic `isVisible` filter (already exists as the core of `visibleCharacters`).
- `visibleSub(arr, chapter, key)` — filter any sub-array (sequences/facts/entries/events/members) by its stamp field (`known_chapter`/`chapter`/`since_chapter`). One helper, used everywhere.
- `resolvePathway/Org/Era/Document/Location(entity, chapter)` — compose visible state + visible sub-arrays, mirroring `resolveCharacter`.
- `byId(collection, id)` — lookup for cross-links.
All pure, dual Node/browser export, unit-tested (boundary-inclusive, future-hidden).

## 6. UI / navigation

- **Top nav (RTL):** General · Characters · Pathways · Map · Organizations · Roselle · Epochs. The chapter slider stays in the header on every view.
- **Welcome overlay (first load only):** centered modal "إلى أي فصل وصلت؟" with the slider + "ابدأ". Sets `localStorage['lotm.chapter']`; never shown again (re-openable from a small header control).
- **Map view:** the Phase-1 SVG map, now data-driven from `locations` — regions/pins render from data, dim/hide by chapter, and **clicking a region opens a brief panel** (its `blurb_ar` + a list of what it `contains` + characters currently located there, each a cross-link). Character "current location" comes from their resolved state's `location_id`.
- **Pathways view:** families as columns (image layout), pathways as entries, each opening a detail with its sequence ladder (known vs locked) + blurb. Spoiler-filtered per §3.
- **Organizations / Roselle / Epochs views:** list → detail, detail shows resolved blurb + chapter-cited facts/entries/members/events, with cross-links.
- **Cross-links:** any entity reference renders as a clickable chip that switches view + opens that entity. **Hover tooltips:** a `<Term def=… ref=…>` wrapper shows a glossary definition (or a short entity blurb) on hover; keyboard-focusable for a11y.

## 7. Scope discipline

- **In:** the shell for all sections above + map interactivity + welcome slider + cross-links/tooltips, on the extended model, with seed/groundable data.
- **Track B (separate plan):** the focused extraction that fills the collections with real chapter-cited content (main+recurring characters, 22 pathways' known sequences, sects/churches, Roselle's diary, the five epochs, key kingdoms).
- **Out (for now):** items/artifacts section; the "full-reference spoiler" pathway toggle; non-Arabic UI.

## 8. Success criteria

- Top nav switches between all sections; slider persists and bounds every section.
- Welcome overlay sets the chapter on first load.
- Map: clicking a kingdom/area shows its brief + contents + who's there; everything respects the slider.
- Pathways tab fills in as the slider advances; no un-revealed pathway/sequence leaks.
- Click a character's pathway → pathway detail; hover a term → its definition.
- All seeded data carries chapter citations; tests assert no stamp > 250 across every collection.
