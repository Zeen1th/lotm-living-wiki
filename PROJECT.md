# Lord of the Mysteries — World Atlas

An interactive, responsive lore-companion **World Map** for the web novel *Lord of the Mysteries*.
Single self-contained HTML file — open it in any browser, no build step.

> **Handoff note for the next chat:** read this file first. Everything you need to continue the
> project (what it is, how it's built, how to run/verify it, and the design rules) is below.

---

## TL;DR

- **File:** `lotm-world-atlas.html` (one file, ~700 lines, fully self-contained).
- **Stack:** React 18 + ReactDOM (UMD via CDN), Tailwind Play CDN, Babel Standalone, Google Fonts. Lucide icons are hand-inlined as SVG React components (no runtime dep).
- **Run:** open the file directly, **or** serve the folder and visit `/lotm-world-atlas.html`.
- **Status:** Complete and verified in-browser. No console errors.

---

## What it does

- **Dark-glass sidebar** with: brand crest, search bar, two tabs (**Locations** / **Registry**),
  grouped lists (Registered Cities, Continents & Realms, Seas & Straits), and a footer.
- **Stylized SVG world map** (`viewBox 0 0 1000 640`, `preserveAspectRatio="xMidYMid meet"` so
  every continent/ocean is always visible — no edge cropping).
- **3 glowing city pins** → click opens a sleek modal with lore + character tags.
- **Search** filters both the Locations list and the character Registry, **and** dims
  non-matching pins on the map.
- **Sidebar click → pan + zoom + highlight** of that region (smooth 1s ease). A **Reset View**
  button appears while a region is focused.
- **Responsive:** desktop = sidebar + map; mobile = top bar with an **Index/Map** toggle that
  slides the sidebar over.
- **A11y:** keyboard focus rings, `Esc`/backdrop closes modal, `prefers-reduced-motion` respected.

---

## Design system (keep this consistent if you extend it)

**Theme:** dark Victorian / Steampunk + Lovecraftian. Deep slate + crimson + brass over parchment tints.

| Token | Hex | Use |
|---|---|---|
| `--void` | `#080a0d` | app background |
| `--abyss` | `#04050a` | Forsaken Land (pitch black) |
| `--sea` | `#0a1119` | ocean fill |
| `--slate` / `--slate-2` | `#1a212c` / `#232c3a` | land fill |
| `--parchment` | `#d8c39a` | primary text accent |
| `--crimson` / `--crimson-glow` | `#b3122b` / `#ef2d45` | primary accent (cities, active) |
| `--brass` / `--brass-dim` | `#c8a24a` / `#8a7330` | secondary accent (seas, labels) |

**Type:** `Cinzel Decorative` + `Cinzel` (display/engraved), `IM Fell English` (antique italic
field-notes), `Spectral` (body). Eyebrows use letter-spaced uppercase Cinzel.

**Signature element:** the **Forsaken Land of the Gods** — a pitch-black void in the far East with
animated lightning bolts and rising embers.

---

## Code map (inside `lotm-world-atlas.html`)

- `<style>` — CSS variables, glass/hairline utilities, keyframes (pin beat, fog drift, lightning
  flicker, embers, modal rise), region/pin hover + dim states.
- **Icons** — `I` wrapper + named Lucide-style SVG components (`Search`, `Pin`, `Crown`, `Anchor`,
  `Sun`, `Moon`, `Scale`, `Rope`, `Zap`, etc.).
- **Data** (edit these to add content):
  - `REGIONS` — continents + seas. Each: `{ id, name, kind:'region'|'sea', icon, cx, cy, poly?, fill, tagline, lore, label? }`.
  - `CITIES` — pinned cities. Each: `{ id, name, region, regionId, icon, cx, cy, accent, tagline, lore, chars:[charId] }`.
  - `CHARACTERS` — keyed map. Each: `{ id, name, alias, pathway, icon, locId, accent, note }`.
- **Components:** `Crest`, `WorldMap` (pan/zoom math + regions + pins + atmosphere),
  `Sidebar` → `PlaceList` / `CharList`, `Modal`, and `App` (state: tab, query, selectedId, modal, mobilePanel).

**Pan math:** focusing a place sets `selectedId`; the `.panZoom` group transforms to
`translate(500 - s·cx, 320 - s·cy) scale(s)` with `s = 1.85`, animated via CSS.

---

## ⚠️ Build gotcha (already solved — don't reintroduce)

The CDN React preset defaults to the **automatic JSX runtime**, which emits
`import ... "react/jsx-runtime"` and breaks under the UMD build. **Fix in place:** the JSX lives in
a `<script type="text/plain" id="appsrc">` block and is compiled manually at the bottom with
`Babel.transform(src, { presets: [['react', { runtime: 'classic' }]] })` then `eval`'d.
If you add JSX, keep it inside that script block — do **not** switch to `type="text/babel"`.

---

## How to run / verify

Any static server works. This repo already has a Claude Code preview config:

```jsonc
// .claude/launch.json  (under "S:/!Dev/AI note taker/New AI note taker")
{ "name": "lotm", "runtimeExecutable": "python",
  "runtimeArgs": ["-m", "http.server", "8101", "--directory", "S:/!Dev/Lord of mysteries"],
  "port": 8101 }
```

Then open `http://localhost:8101/lotm-world-atlas.html`.
Or simply double-click the HTML file (CDN scripts load from the network).

---

## Implemented content (exact, from spec)

- **Backlund** (Loen Kingdom) — "City of Hope" — tags: *Klein Moretti (Sherlock Moriarty)*, *Audrey Hall (Justice)*.
- **Rorsted Archipelago** (Sonia Sea) — pirate-infested colonial sea — tag: *Alger Wilson (The Hanged Man)*.
- **City of Silver** (Forsaken Land of the Gods) — dark isolated city ringed by lightning & monsters — tag: *Derrick Berg (The Sun)*.
- Geography: Northern Continent (Loen, Intis, Feysac, Feynapotter), Southern Continent, Berserk Sea, Sonia Sea, Fog Sea, Forsaken Land.

---

## Possible next steps (ideas, not yet done)

- More pins/characters (Tingen, Pritz Harbor, the rest of the Tarot Club).
- A "Pathways / Sequences" reference panel (the 22 pathways).
- Connection lines between related characters/locations.
- Deep-link via URL hash (`#backlund`) to open a place directly.
- Optional: pre-compile the JSX to drop Babel for faster load.
