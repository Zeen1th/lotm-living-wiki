# Lord of the Mysteries — Living Wiki (Design Spec)

**Date:** 2026-06-24
**Status:** Approved design, pre-implementation
**Owner:** project maintainer (reading the novel, currently at chapter 250)

---

## 1. Purpose

Evolve the existing single-file **World Atlas** (a polished but thin map demo) into a
**living, interactive, spoiler-aware wiki** for *Lord of the Mysteries* — Terraria-wiki style
("see everything, know anything"). The wiki is **filled incrementally as the maintainer reads
the novel**, in **Arabic (RTL)**, themed dark-Victorian + Lovecraftian with the novel's
**red-moon** motif.

The defining feature: the wiki only ever knows what the reader has read. A reading-progress
control lets the reader pick any chapter they've reached and see the world **exactly as it was
known at that point** — spoiler-proof by construction.

## 2. Source of truth & hard spoiler boundary

- Source: `Lord of mysteries.epub` (already the maintainer's **Arabic** translation), extracted to
  `_epub_extract/OEBPS/chapterN.html`.
- **File→chapter mapping: `chapterN.html` = novel chapter `N+1`.**
  Verified: `chapter0.html` = Ch.1 ("قرمزي"), `chapter249.html` = Ch.250
  ("خبرة كبيرة في طلب الموت"), `chapter250.html` = Ch.251 ("الأرباح").
- **Current cutoff = chapter 250.** I may read only `chapter0.html` … `chapter249.html`.
  **`chapter250.html` and higher are off-limits** until the maintainer raises the cutoff.
- All names/terms come **from the EPUB's Arabic text**, not from outside knowledge — this both
  prevents spoilers and avoids translation drift.

## 3. Core data model (the B+C hybrid)

Knowledge lives in a separate **`lotm-data.js`** file: `window.LOTM = { meta, characters,
pathways, locations, organizations, events }`. Loaded via `<script src>` so it works on
double-click (no server, no CORS). The HTML is the *app*; this file is the *content* I extend.

Every fact is **chapter-stamped**. Each entity stores stable identity + an ordered list of
**states** (snapshots that supersede each other) + an **events** timeline.

### Character schema (extends the maintainer's example)
```js
{
  id, name_ar, name_en,
  aliases: [{ name, since_chapter }],
  pathway: { id, name_ar },
  status: 'alive' | 'dead' | 'unknown',
  first_appeared_chapter,
  states: [ { since_chapter, sequence, location, faction, notes } ], // newest with since_chapter ≤ N wins
  events: [ { chapter, type, text } ],                               // the per-character timeline
  abilities: [ … ],
  relationships: [ { id, type, since_chapter } ],
  tags: [ … ]
}
```

**Resolution rule ("as of chapter N"):** for each entity, render the latest `state` whose
`since_chapter ≤ N`; hide entities whose `first_appeared_chapter > N`; hide aliases/events/
relationships stamped after N. This single rule delivers both the **slider (B)** and the
**per-entity history (C)**.

Pathways, locations, organizations follow the same identity+states+events shape where relevant
(e.g. an organization's known leaders/members change over chapters).

## 4. The spoiler engine (UI)

- Top-bar control: **«أقصى فصل قرأته: N»** with a slider from 1 → highest encoded chapter,
  annotated with **volume markers**.
- Changing it re-renders the entire wiki to the "as of N" state.
- Persisted in `localStorage`; defaults to the highest encoded chapter (250 now).
- Hard-capped at the highest encoded chapter — grows only as new chapters are ingested.

## 5. Wiki sections

The beautiful SVG map remains, now as one view among:

- **الشخصيات** — Characters (rich cards → detail pages)
- **المسارات والتسلسلات** — Pathways & the 22 Sequences (each pathway shows its sequence ladder)
- **المواقع** — Locations (list + the interactive map)
- **المنظمات** — Organizations (churches, the Tarot Club, etc.)
- **الجدول الزمني** — global Timeline of major events

Everything cross-links: faction → members, character → location → map pin, character → pathway.

**Initial scope:** Characters · Pathways · Locations · Organizations · Timeline.
**Deferred:** Artifacts/Items (added later once the structure is proven).

## 6. Theme & language

- **Full RTL Arabic** layout and UI labels.
- Arabic-readable display fonts paired with the existing engraved/Victorian look.
- **Red-moon motif:** a large dim crimson moon over the map sky; red-moon accent on hero/section
  headers; a slightly deeper crimson palette. Keep the dark-glass aesthetic and the existing
  design tokens.
- Accessibility preserved: keyboard focus, Esc/backdrop close, `prefers-reduced-motion`.

## 7. Update workflow (each reading session)

1. Maintainer states the new cutoff chapter.
2. I read only up to that chapter's file, in **batches**, using sub-agents to extract structured
   data per the schema (citing the chapter for every fact).
3. I consolidate into `lotm-data.js` (new entities; new chapter-stamped states/events on existing
   ones).
4. I deliver a **change report**: entities added, sequences advanced, deaths, identity reveals —
   each with its chapter citation — for the maintainer to sanity-check before locking in.
5. Raise the encoded-chapter cap and the slider max.

**Discipline:** rely only on the EPUB text up to the cutoff; never encode anything from later
chapters or outside knowledge.

## 8. Technical notes / constraints to preserve

- Keep the runtime-Babel `<script type="text/plain" id="appsrc">` + classic-JSX-runtime workaround
  (documented in PROJECT.md) — do not switch to `type="text/babel"`.
- Must still open by double-click (file://) — hence `lotm-data.js` via `<script>`, not `fetch`.
- React 18 UMD + Tailwind Play + Babel Standalone via CDN (unchanged).
- `_epub_extract/` is a working/source artifact, not shipped content.

## 9. Out of scope (for now)

- Artifacts/Items section.
- Global per-fact provenance UI beyond chapter stamps.
- Any server/build step.
- Multi-language (Arabic only for now; structure keeps `name_en` so English can return later).

## 10. Success criteria

- Wiki loads by double-click, RTL Arabic, red-moon themed.
- Slider to any chapter ≤ encoded cap shows a coherent, spoiler-safe world state.
- Characters/pathways/locations/organizations browsable and cross-linked.
- Data for chapters 1–250 ingested from the EPUB with chapter citations.
- `lotm-data.js` is the single place new chapters get appended, without touching app logic.
