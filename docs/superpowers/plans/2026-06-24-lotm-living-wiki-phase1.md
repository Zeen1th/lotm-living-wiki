# LotM Living Wiki — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-file World Atlas into a spoiler-aware, RTL-Arabic, red-moon-themed wiki whose core is a chapter-stamped data model + a reading-progress slider, delivered as a complete vertical slice: the **Characters** section fully working end-to-end.

**Architecture:** Three browser scripts loaded via `<script>` (no fetch, works on `file://`): `lotm-data.js` (content, `window.LOTM`), `lotm-engine.js` (pure resolver logic, dual Node/browser), and the app HTML (React 18 UMD + Tailwind Play + Babel classic-runtime, JSX compiled at runtime from a `text/plain` block — preserved exactly as today). The resolver is the only logic-heavy unit and is unit-tested in Node.

**Tech Stack:** React 18 UMD, ReactDOM 18 UMD, Babel Standalone (classic JSX runtime), Tailwind Play CDN, Google Fonts. Node ≥ 18 for tests (built-in `node:test` + `node:assert`, zero dependencies).

## Global Constraints

- **Spoiler boundary:** never read/encode beyond **chapter 250**. EPUB file→chapter mapping: `chapterN.html` = novel chapter `N+1`; allowed range `chapter0.html`…`chapter249.html`.
- **Language:** Arabic, **full RTL** (`<html dir="rtl" lang="ar">`). Keep `name_en` in data for future English.
- **Run model:** must open by double-click (`file://`). No bundler, no server required, no `fetch()` of local files.
- **Babel workaround:** JSX stays inside `<script type="text/plain" id="appsrc">`, compiled with `Babel.transform(src,{presets:[['react',{runtime:'classic'}]]})` then `eval`. Do **not** use `type="text/babel"`.
- **Zero npm dependencies** for tests/tools — use Node built-ins only.
- **Design tokens:** reuse existing CSS variables (`--void`, `--crimson`, `--brass`, `--parchment`, …); add red-moon tokens, do not rename existing ones.
- **No data in the app file:** all content lives in `lotm-data.js`; the HTML never hard-codes entities.

---

## File Structure

- `lotm-engine.js` (create) — pure resolver: `currentState`, `isVisible`, `resolveCharacter`, `visibleCharacters`, `encodedThrough`. Dual-export (Node `module.exports` + browser `window.LOTMEngine`). No DOM, no React.
- `lotm-data.js` (create) — `window.LOTM = { meta, characters, pathways, locations, organizations, events }`. Phase 1 ships `meta` + a 4-character **seed** (provisional UI fixture; replaced by Phase 3 ingestion). Also dual-exported so tests can import it.
- `test/engine.test.js` (create) — `node:test` unit tests for the resolver.
- `test/data.test.js` (create) — shape/spoiler validation of `lotm-data.js`.
- `index.html` (create) — the new wiki app (shell + slider + Characters section). Reuses the styles and icon set from `lotm-world-atlas.html`.
- `lotm-world-atlas.html` (keep) — legacy reference, untouched this phase.
- `PROJECT.md` (modify) — update "how to run" + status to point at `index.html` and the new architecture.

---

## Task 1: Resolver engine + unit tests

**Files:**
- Create: `lotm-engine.js`
- Test: `test/engine.test.js`

**Interfaces:**
- Produces (used by all later tasks and the app):
  - `currentState(entity, chapter) -> stateObject | null` — newest `state` with `since_chapter <= chapter`, else `null`.
  - `isVisible(entity, chapter) -> boolean` — `entity.first_appeared_chapter <= chapter`.
  - `visibleAliases(entity, chapter) -> string[]` — alias names with `since_chapter <= chapter`.
  - `visibleEvents(entity, chapter) -> event[]` — events with `chapter <= chapter`, sorted ascending.
  - `resolveCharacter(char, chapter) -> resolved | null` — `null` if not visible; else
    `{ id, name_ar, name_en, pathway, status, aliases, state, events, first_appeared_chapter }`.
  - `visibleCharacters(list, chapter) -> resolved[]` — visible chars resolved, original order.
  - `encodedThrough(data) -> number` — `data.meta.encodedThroughChapter`.

- [ ] **Step 1: Write the failing tests**

```js
// test/engine.test.js
const test = require('node:test');
const assert = require('node:assert');
const E = require('../lotm-engine.js');

const klein = {
  id: 'klein', name_ar: 'كلاين', name_en: 'Klein', first_appeared_chapter: 1,
  aliases: [
    { name: 'جيرمان سبارو', since_chapter: 30 },
    { name: 'شيرلوك موريارتي', since_chapter: 210 },
  ],
  states: [
    { since_chapter: 1,  sequence: 'التسلسل 9: متمرس', location: 'تينغن', faction: 'لا أحد' },
    { since_chapter: 21, sequence: 'التسلسل 8: مهرج',  location: 'باكلوند', faction: 'نادي التاروت' },
  ],
  events: [
    { chapter: 21,  type: 'advance', text: 'ترقى إلى التسلسل 8' },
    { chapter: 240, type: 'reveal',  text: 'حدث متأخر' },
  ],
};

test('currentState picks newest state at or before chapter', () => {
  assert.equal(E.currentState(klein, 1).sequence,  'التسلسل 9: متمرس');
  assert.equal(E.currentState(klein, 20).sequence, 'التسلسل 9: متمرس');
  assert.equal(E.currentState(klein, 21).sequence, 'التسلسل 8: مهرج'); // boundary inclusive
  assert.equal(E.currentState(klein, 999).sequence,'التسلسل 8: مهرج');
});

test('currentState returns null before first state', () => {
  const x = { states: [{ since_chapter: 5, sequence: 's' }] };
  assert.equal(E.currentState(x, 4), null);
});

test('isVisible respects first_appeared_chapter', () => {
  assert.equal(E.isVisible(klein, 0), false);
  assert.equal(E.isVisible(klein, 1), true);
});

test('visibleAliases hides future aliases', () => {
  assert.deepEqual(E.visibleAliases(klein, 50), ['جيرمان سبارو']);
  assert.deepEqual(E.visibleAliases(klein, 210), ['جيرمان سبارو', 'شيرلوك موريارتي']);
});

test('visibleEvents hides future events and sorts ascending', () => {
  assert.deepEqual(E.visibleEvents(klein, 100).map(e => e.chapter), [21]);
  assert.deepEqual(E.visibleEvents(klein, 250).map(e => e.chapter), [21, 240]);
});

test('resolveCharacter returns null when not yet introduced', () => {
  assert.equal(E.resolveCharacter(klein, 0), null);
});

test('resolveCharacter composes the as-of view', () => {
  const r = E.resolveCharacter(klein, 50);
  assert.equal(r.state.sequence, 'التسلسل 8: مهرج');
  assert.deepEqual(r.aliases, ['جيرمان سبارو']);
  assert.equal(r.events.length, 1);
});

test('visibleCharacters filters out not-yet-seen characters', () => {
  const later = { id: 'z', first_appeared_chapter: 300, states: [] };
  const out = E.visibleCharacters([klein, later], 250);
  assert.deepEqual(out.map(c => c.id), ['klein']);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test`
Expected: FAIL — `Cannot find module '../lotm-engine.js'`.

- [ ] **Step 3: Write the engine**

```js
// lotm-engine.js — pure, no DOM/React. Dual Node + browser export.
(function (global) {
  'use strict';

  function currentState(entity, chapter) {
    const states = (entity && entity.states) || [];
    let best = null;
    for (const s of states) {
      if (s.since_chapter <= chapter && (!best || s.since_chapter >= best.since_chapter)) {
        best = s;
      }
    }
    return best;
  }

  function isVisible(entity, chapter) {
    const f = entity && entity.first_appeared_chapter;
    return typeof f === 'number' ? f <= chapter : true;
  }

  function visibleAliases(entity, chapter) {
    return ((entity && entity.aliases) || [])
      .filter(a => a.since_chapter <= chapter)
      .map(a => a.name);
  }

  function visibleEvents(entity, chapter) {
    return ((entity && entity.events) || [])
      .filter(e => e.chapter <= chapter)
      .slice()
      .sort((a, b) => a.chapter - b.chapter);
  }

  function resolveCharacter(char, chapter) {
    if (!isVisible(char, chapter)) return null;
    return {
      id: char.id,
      name_ar: char.name_ar,
      name_en: char.name_en,
      pathway: char.pathway || null,
      status: char.status || 'unknown',
      first_appeared_chapter: char.first_appeared_chapter,
      aliases: visibleAliases(char, chapter),
      state: currentState(char, chapter),
      events: visibleEvents(char, chapter),
    };
  }

  function visibleCharacters(list, chapter) {
    return (list || [])
      .filter(c => isVisible(c, chapter))
      .map(c => resolveCharacter(c, chapter));
  }

  function encodedThrough(data) {
    return (data && data.meta && data.meta.encodedThroughChapter) || 0;
  }

  const API = {
    currentState, isVisible, visibleAliases, visibleEvents,
    resolveCharacter, visibleCharacters, encodedThrough,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  else global.LOTMEngine = API;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test`
Expected: PASS — all tests in `test/engine.test.js` green.

- [ ] **Step 5: Commit**

```bash
git add lotm-engine.js test/engine.test.js
git commit -m "feat: chapter-stamped resolver engine with unit tests"
```

---

## Task 2: Seed data file + shape/spoiler validation

**Files:**
- Create: `lotm-data.js`
- Test: `test/data.test.js`

**Interfaces:**
- Consumes: `lotm-engine.js` (`currentState`, `encodedThrough`).
- Produces: `window.LOTM` / `module.exports` = `{ meta, characters, pathways, locations, organizations, events }`.
  - `meta = { title_ar, encodedThroughChapter: 250, volumes: [{ id, name_ar, start_chapter, end_chapter }] }`.
  - `characters`: array using the Task-1 character schema (`id, name_ar, name_en, aliases[], pathway{id,name_ar}, status, first_appeared_chapter, states[], events[], abilities[], relationships[], tags[]`).
  - `pathways`, `locations`, `organizations`, `events`: present as arrays (may be small/empty in Phase 1).

**Note:** the 4-character seed is a **provisional UI fixture**, not researched content. Chapter stamps are conservative and ≤ 250; Phase 3 ingestion overwrites this with cited data. This is acceptable because Task 2's tests assert *structure and spoiler-safety*, not historical accuracy.

- [ ] **Step 1: Write the failing validation test**

```js
// test/data.test.js
const test = require('node:test');
const assert = require('node:assert');
const E = require('../lotm-engine.js');
const LOTM = require('../lotm-data.js');

test('meta is well-formed and cutoff is 250', () => {
  assert.equal(LOTM.meta.encodedThroughChapter, 250);
  assert.ok(Array.isArray(LOTM.meta.volumes) && LOTM.meta.volumes.length >= 1);
});

test('every collection exists as an array', () => {
  for (const k of ['characters', 'pathways', 'locations', 'organizations', 'events']) {
    assert.ok(Array.isArray(LOTM[k]), `${k} must be an array`);
  }
});

test('no fact is stamped beyond the encoded cutoff (spoiler-safety)', () => {
  const cap = E.encodedThrough(LOTM);
  for (const c of LOTM.characters) {
    assert.ok(c.first_appeared_chapter <= cap, `${c.id} appears after cap`);
    for (const s of c.states) assert.ok(s.since_chapter <= cap, `${c.id} state after cap`);
    for (const a of c.aliases) assert.ok(a.since_chapter <= cap, `${c.id} alias after cap`);
    for (const e of c.events) assert.ok(e.chapter <= cap, `${c.id} event after cap`);
  }
});

test('every character has required identity fields and ids are unique', () => {
  const ids = new Set();
  for (const c of LOTM.characters) {
    for (const f of ['id', 'name_ar', 'name_en', 'first_appeared_chapter']) {
      assert.ok(c[f] !== undefined, `${c.id || '?'} missing ${f}`);
    }
    assert.ok(!ids.has(c.id), `duplicate id ${c.id}`);
    ids.add(c.id);
    assert.ok(c.states.length >= 1, `${c.id} needs >=1 state`);
  }
});

test('resolver runs cleanly over seed at the cutoff', () => {
  const out = E.visibleCharacters(LOTM.characters, 250);
  assert.ok(out.length >= 1);
  for (const r of out) assert.ok(r.state, `${r.id} has no state at ch.250`);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test test/data.test.js`
Expected: FAIL — `Cannot find module '../lotm-data.js'`.

- [ ] **Step 3: Write the seed data file**

```js
// lotm-data.js — content store. Phase 1 seed (provisional fixture, replaced by ingestion).
(function (global) {
  'use strict';

  const LOTM = {
    meta: {
      title_ar: 'سيد الألغاز — موسوعة حية',
      encodedThroughChapter: 250,
      volumes: [
        { id: 'v1', name_ar: 'المجلد الأول: المتنبئ القرمزي', start_chapter: 1,   end_chapter: 206 },
        { id: 'v2', name_ar: 'المجلد الثاني', start_chapter: 207, end_chapter: 250 },
      ],
    },

    characters: [
      {
        id: 'klein', name_ar: 'كلاين مورتي', name_en: 'Klein Moretti',
        first_appeared_chapter: 1, status: 'alive',
        pathway: { id: 'seer', name_ar: 'مسار الرائي' },
        aliases: [
          { name: 'جيرمان سبارو', since_chapter: 30 },
          { name: 'شيرلوك موريارتي', since_chapter: 210 },
        ],
        states: [
          { since_chapter: 1,  sequence: 'التسلسل 9: متمرس', location: 'تينغن', faction: 'لا أحد',
            notes: 'منتقل بروحٍ من عالم آخر إلى جسد كلاين.' },
          { since_chapter: 21, sequence: 'التسلسل 8: مهرج',  location: 'باكلوند', faction: 'نادي التاروت',
            notes: 'مؤسس نادي التاروت؛ "الأحمق" الصامت فوق الضباب الرمادي.' },
        ],
        events: [
          { chapter: 1,   type: 'intro',   text: 'الاستيقاظ في جسد كلاين مورتي.' },
          { chapter: 21,  type: 'advance', text: 'الترقّي إلى التسلسل 8 (مهرج).' },
          { chapter: 30,  type: 'identity',text: 'اتخاذ هوية "جيرمان سبارو".' },
        ],
        abilities: ['العرافة الدقيقة', 'خفة حركة خارقة', 'قراءة حركات الخصم', 'التحكم بتعابير الوجه'],
        relationships: [{ id: 'audrey', type: 'زميل في النادي', since_chapter: 21 }],
        tags: ['نادي التاروت', 'الأحمق', 'بطل'],
      },
      {
        id: 'audrey', name_ar: 'أودري هول', name_en: 'Audrey Hall',
        first_appeared_chapter: 16, status: 'alive',
        pathway: { id: 'spectator', name_ar: 'مسار المتفرّج' },
        aliases: [{ name: 'العدالة', since_chapter: 21 }],
        states: [
          { since_chapter: 16, sequence: 'التسلسل 9: متفرّج', location: 'باكلوند - حي الإمبراطورة',
            faction: 'نبلاء لوين', notes: 'سيدة نبيلة بعقلٍ حادّ خلف آداب المجتمع الراقي.' },
          { since_chapter: 21, sequence: 'التسلسل 9: متفرّج', location: 'باكلوند - حي الإمبراطورة',
            faction: 'نادي التاروت', notes: 'عضو نادي التاروت باسم "العدالة".' },
        ],
        events: [
          { chapter: 16, type: 'intro',  text: 'الظهور الأول في باكلوند.' },
          { chapter: 21, type: 'join',   text: 'الانضمام إلى نادي التاروت كـ"العدالة".' },
        ],
        abilities: ['قراءة لغة الجسد', 'استشعار الأفكار السطحية', 'التواصل الذهني'],
        relationships: [{ id: 'klein', type: 'مؤسس النادي', since_chapter: 21 }],
        tags: ['نادي التاروت', 'العدالة', 'نبيلة'],
      },
      {
        id: 'alger', name_ar: 'ألجير ويلسون', name_en: 'Alger Wilson',
        first_appeared_chapter: 21, status: 'alive',
        pathway: { id: 'sailor', name_ar: 'مسار البحّار' },
        aliases: [{ name: 'الرجل المشنوق', since_chapter: 21 }],
        states: [
          { since_chapter: 21, sequence: 'التسلسل 7: مبارك الرياح', location: 'بحر سونيا - أرخبيل رورستيد',
            faction: 'كنيسة العواصف (سرّاً) / نادي التاروت',
            notes: 'بحّار-كاهن حذِر يبحر في سياسات بحر سونيا.' },
        ],
        events: [
          { chapter: 21, type: 'intro', text: 'الانضمام إلى نادي التاروت كـ"الرجل المشنوق".' },
        ],
        abilities: ['القتال المائي الخارق', 'التحكم بطاقة البرق الطفيفة', 'التلاعب بالرياح والملاحة'],
        relationships: [],
        tags: ['نادي التاروت', 'الرجل المشنوق', 'بحّار'],
      },
      {
        id: 'derrick', name_ar: 'ديريك بيرغ', name_en: 'Derrick Berg',
        first_appeared_chapter: 121, status: 'alive',
        pathway: { id: 'sun', name_ar: 'مسار الشمس' },
        aliases: [{ name: 'الشمس', since_chapter: 121 }],
        states: [
          { since_chapter: 121, sequence: 'التسلسل ?: الشمس', location: 'مدينة الفضة - أرض الآلهة المهجورة',
            faction: 'مدينة الفضة', notes: 'جندي يشعّ أمله ضوءاً جديداً في الأرض المهجورة.' },
        ],
        events: [
          { chapter: 121, type: 'intro', text: 'الظهور في مدينة الفضة.' },
        ],
        abilities: ['ضوء مقدّس', 'أمل لا يُكسر'],
        relationships: [],
        tags: ['مدينة الفضة', 'الشمس'],
      },
    ],

    pathways: [],
    locations: [],
    organizations: [],
    events: [],
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = LOTM;
  else global.LOTM = LOTM;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test`
Expected: PASS — both `engine.test.js` and `data.test.js` green.

- [ ] **Step 5: Commit**

```bash
git add lotm-data.js test/data.test.js
git commit -m "feat: seed content store with shape + spoiler-safety validation"
```

---

## Task 3: App shell — RTL, theme, red moon, chapter slider

**Files:**
- Create: `index.html`
- Modify: `PROJECT.md` (run instructions + status)

**Interfaces:**
- Consumes: `window.LOTM` (Task 2), `window.LOTMEngine` (Task 1).
- Produces (in-app, for Task 4): React state `chapter` (number) + setter, persisted to `localStorage['lotm.chapter']`; clamped to `[1, LOTMEngine.encodedThrough(LOTM)]`. Default = cap. A `<ChapterSlider>` component renders it. App root mounts `#root`.

- [ ] **Step 1: Create `index.html` with RTL shell, red-moon tokens, and the slider**

Copy the `<style>` block, the `I` icon wrapper, and the icon components verbatim from
`lotm-world-atlas.html` (lines ~17–146). Then build the shell. Key requirements, with the exact
critical code:

`<html>` tag and script loads:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>سيد الألغاز — موسوعة حية</title>

<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Arabic display + body fonts, plus the existing engraved Latin fonts -->
<link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Aref+Ruqaa:wght@400;700&family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@700;900&display=swap" rel="stylesheet">

<!-- content + logic BEFORE the app so window.LOTM / window.LOTMEngine exist at eval time -->
<script src="lotm-engine.js"></script>
<script src="lotm-data.js"></script>
```

Add red-moon CSS tokens and a moon visual to the existing `:root`/style block:

```css
:root{
  /* …existing tokens kept… */
  --bloodmoon:#7a0f1c;
  --bloodmoon-glow:#c81d2e;
  --moon-halo:rgba(200,29,46,.35);
}
/* Arabic typography helpers */
body{ font-family:'Amiri', Georgia, serif; }
.font-deco{ font-family:'Aref Ruqaa','Cinzel Decorative', serif; }
.font-display{ font-family:'Aref Ruqaa','Cinzel', serif; }
.eyebrow{ font-family:'Cinzel', serif; letter-spacing:.18em; }
/* RTL: flip the list hover nudge */
.listrow:hover{ transform:translateX(-3px); }
/* red moon over the stage */
.bloodmoon{
  position:absolute; top:6%; left:50%; transform:translateX(-50%);
  width:140px; height:140px; border-radius:50%;
  background:radial-gradient(circle at 38% 38%, #e23048, var(--bloodmoon) 62%, #3a0710 100%);
  box-shadow:0 0 90px 30px var(--moon-halo), inset -14px -10px 40px rgba(0,0,0,.6);
  pointer-events:none; opacity:.85;
}
@media (prefers-reduced-motion: no-preference){
  .bloodmoon{ animation:moonpulse 9s ease-in-out infinite; }
}
@keyframes moonpulse{ 0%,100%{ box-shadow:0 0 80px 24px var(--moon-halo);} 50%{ box-shadow:0 0 120px 46px var(--moon-halo);} }
```

`#root` + the app source block + the compile shim (mirror `lotm-world-atlas.html` lines ~815–821):

```html
<div id="root"></div>
<script type="text/plain" id="appsrc">
const { useState, useMemo, useEffect } = React;
const LOTM = window.LOTM;
const Eng  = window.LOTMEngine;
const CAP  = Eng.encodedThrough(LOTM);

/* ---- reading-progress state, persisted ---- */
function useChapter(){
  const [chapter, setChapter] = useState(()=>{
    const raw = parseInt(localStorage.getItem('lotm.chapter'), 10);
    const start = Number.isFinite(raw) ? raw : CAP;
    return Math.min(CAP, Math.max(1, start));
  });
  useEffect(()=>{ localStorage.setItem('lotm.chapter', String(chapter)); }, [chapter]);
  const set = (n)=> setChapter(Math.min(CAP, Math.max(1, n|0)));
  return [chapter, set];
}

/* ---- the spoiler slider ---- */
function ChapterSlider({ chapter, setChapter }){
  const vol = (LOTM.meta.volumes||[]).find(v=> chapter>=v.start_chapter && chapter<=v.end_chapter);
  return (
    <div className="glass rounded-lg px-4 py-2.5 flex items-center gap-3">
      <span className="eyebrow text-[9px]" style={{ color:'var(--brass)' }}>أقصى فصل قرأته</span>
      <input type="range" min="1" max={CAP} value={chapter}
             onChange={e=>setChapter(parseInt(e.target.value,10))}
             aria-label="أقصى فصل قرأته"
             className="w-44 accent-[color:var(--crimson-glow)]" />
      <span className="font-display text-[15px]" style={{ color:'var(--parchment)' }}>
        {chapter} / {CAP}
      </span>
      {vol && <span className="eyebrow text-[8.5px]" style={{ color:'var(--parchment-dim)' }}>{vol.name_ar}</span>}
    </div>
  );
}

function App(){
  const [chapter, setChapter] = useChapter();
  return (
    <div className="h-full w-full flex flex-col">
      <header className="glass flex items-center justify-between px-4 md:px-6 h-16 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Crest size={34}/>
          <div className="leading-tight">
            <div className="eyebrow text-[9px]" style={{ color:'var(--brass)' }}>سيد الألغاز</div>
            <h1 className="font-deco text-[20px]" style={{ color:'var(--parchment)' }}>الموسوعة الحية</h1>
          </div>
        </div>
        <ChapterSlider chapter={chapter} setChapter={setChapter}/>
      </header>
      <main className="flex-1 relative min-h-0 overflow-hidden">
        <div className="bloodmoon"></div>
        {/* Task 4 injects the Characters section here, receiving `chapter` */}
        <CharactersSection chapter={chapter}/>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script>
<script>
  (function(){
    var src = document.getElementById('appsrc').textContent;
    var out = Babel.transform(src, { presets: [['react', { runtime: 'classic' }]] }).code;
    (0, eval)(out);
  })();
</script>
```

Also copy the `Crest` component from `lotm-world-atlas.html` (lines ~237–249) into the `appsrc`
block. `CharactersSection` is defined in Task 4 — add a temporary stub
`function CharactersSection(){ return null; }` now so the shell renders standalone.

- [ ] **Step 2: Verify the shell loads with no console errors**

Open `index.html` by double-click (or via the project preview). Using browser tools, confirm:
- Page is RTL (header brand on the right, slider on the left).
- The red moon is visible and pulsing over the stage.
- The slider reads `250 / 250` on first load; moving it updates the number and the volume label.
- Console shows **no errors**.

Run (preview console check): expect `[]` (no errors).

- [ ] **Step 3: Verify persistence**

Set the slider to 100, reload the page. Expected: it reopens at `100 / 250` (read from `localStorage`).

- [ ] **Step 4: Update PROJECT.md run/status lines**

In `PROJECT.md`, change the TL;DR **File** line to: `index.html` (app) + `lotm-engine.js` + `lotm-data.js` (content); legacy `lotm-world-atlas.html` retained for reference. Change **Run** to: open `index.html` directly, or serve the folder. Add a line: "Data lives in `lotm-data.js`; tests run with `node --test`."

- [ ] **Step 5: Commit**

```bash
git add index.html PROJECT.md
git commit -m "feat: RTL Arabic app shell with red-moon theme and chapter slider"
```

---

## Task 4: Characters section — list + detail, driven by the resolver

**Files:**
- Modify: `index.html` (replace the `CharactersSection` stub inside `appsrc`)

**Interfaces:**
- Consumes: `chapter` prop (from App), `window.LOTM.characters`, `Eng.visibleCharacters`,
  `Eng.resolveCharacter`, `accentHex`, icon components, `Crest`.
- Produces: full Characters browse + detail UI. No new globals.

- [ ] **Step 1: Add `accentHex` + the Characters list/detail components**

Insert into `appsrc` (above `App`). This renders only characters visible at `chapter`, with a
search box, and a detail panel showing the as-of state + the per-character timeline.

```jsx
const accentHex = (a)=> a==='crimson' ? 'var(--crimson-glow)' : 'var(--brass)';

function statusBadge(status){
  const map = { alive:'حيّ', dead:'متوفّى', unknown:'غير معروف' };
  const col = status==='dead' ? 'var(--crimson-glow)' : status==='alive' ? 'var(--brass)' : 'var(--parchment-dim)';
  return <span className="eyebrow text-[9px]" style={{ color:col }}>{map[status]||status}</span>;
}

function CharacterCard({ r, onOpen }){
  return (
    <button onClick={()=>onOpen(r.id)}
      className="listrow w-full text-right px-3 py-3 rounded-md flex items-center gap-3 mb-1.5 focus-ring"
      style={{ border:'1px solid var(--line)', background:'rgba(255,255,255,.015)' }}>
      <span className="grid place-items-center w-10 h-10 rounded-full shrink-0"
            style={{ background:'rgba(0,0,0,.45)', color:'var(--brass)', border:'1px solid var(--brass)' }}>
        <Users size={18}/>
      </span>
      <span className="min-w-0 flex-1">
        <span className="font-display block text-[15px] truncate" style={{ color:'var(--parchment)' }}>{r.name_ar}</span>
        <span className="block text-[11px] truncate" style={{ color:'var(--brass)' }}>
          {r.aliases[0] || (r.pathway && r.pathway.name_ar) || ''}
        </span>
      </span>
      {statusBadge(r.status)}
    </button>
  );
}

function CharacterDetail({ r, onClose }){
  if(!r) return null;
  const s = r.state;
  return (
    <div className="backdrop fixed inset-0 z-40 grid place-items-center p-4"
         style={{ background:'rgba(4,5,8,.74)', backdropFilter:'blur(4px)' }}
         onClick={onClose} role="dialog" aria-modal="true" aria-label={r.name_ar}>
      <div className="sheet glass w-full max-w-[600px] rounded-xl overflow-hidden relative"
           onClick={e=>e.stopPropagation()}>
        <div style={{ height:3, background:'linear-gradient(90deg,transparent,var(--crimson-glow),transparent)' }}/>
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="font-deco text-[26px]" style={{ color:'var(--parchment)' }}>{r.name_ar}</h2>
            <button onClick={onClose} aria-label="إغلاق"
              className="w-9 h-9 grid place-items-center rounded-md focus-ring"
              style={{ background:'rgba(0,0,0,.4)', border:'1px solid var(--line)', color:'var(--parchment-dim)' }}>
              <X size={17}/>
            </button>
          </div>
          <p className="text-[13px] mt-1" style={{ color:'var(--parchment-dim)' }}>{r.name_en}</p>
          {r.aliases.length>0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {r.aliases.map(a=>(
                <span key={a} className="eyebrow text-[10px] px-2 py-1 rounded"
                  style={{ border:'1px solid var(--brass)', color:'var(--brass)' }}>{a}</span>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 pb-6">
          {s && (
            <div className="hairline pt-4 grid sm:grid-cols-2 gap-3">
              {[['التسلسل', s.sequence], ['المسار', r.pathway && r.pathway.name_ar],
                ['الموقع الحالي', s.location], ['الانتماء', s.faction]].map(([k,v])=> v && (
                <div key={k} className="rounded-lg px-3 py-2" style={{ background:'rgba(0,0,0,.3)', border:'1px solid var(--line)' }}>
                  <div className="eyebrow text-[9px] mb-1" style={{ color:'var(--brass-dim)' }}>{k}</div>
                  <div className="font-display text-[14px]" style={{ color:'var(--parchment)' }}>{v}</div>
                </div>
              ))}
            </div>
          )}
          {s && s.notes && (
            <p className="text-[13.5px] leading-relaxed mt-4" style={{ color:'#c2c9d1' }}>{s.notes}</p>
          )}
          {r.events.length>0 && (
            <div className="mt-5">
              <div className="eyebrow text-[9.5px] mb-2.5" style={{ color:'var(--brass-dim)' }}>الجدول الزمني (حتى فصلك)</div>
              <ol className="relative" style={{ borderRight:'1px solid var(--line)' }}>
                {r.events.map((e,i)=>(
                  <li key={i} className="relative pr-5 pb-3">
                    <span className="absolute right-[-5px] top-1.5 w-2.5 h-2.5 rounded-full"
                          style={{ background:'var(--crimson-glow)' }}/>
                    <span className="eyebrow text-[9px]" style={{ color:'var(--brass)' }}>فصل {e.chapter}</span>
                    <p className="text-[13px] mt-0.5" style={{ color:'var(--parchment)' }}>{e.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CharactersSection({ chapter }){
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(null);
  const list = useMemo(()=> Eng.visibleCharacters(LOTM.characters, chapter), [chapter]);
  const filtered = useMemo(()=>{
    const t = q.trim();
    if(!t) return list;
    return list.filter(r => (r.name_ar+r.name_en+r.aliases.join(' ')+(r.pathway?r.pathway.name_ar:'')).includes(t));
  }, [list, q]);
  const open = openId ? Eng.resolveCharacter(LOTM.characters.find(c=>c.id===openId), chapter) : null;

  return (
    <div className="h-full flex flex-col max-w-[760px] mx-auto px-4 pt-6">
      <div className="flex items-center gap-2 px-3 h-11 rounded-md mb-3"
           style={{ background:'rgba(0,0,0,.35)', border:'1px solid var(--line)' }}>
        <Search size={16} style={{ color:'var(--brass)' }}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحث عن شخصية…"
               aria-label="ابحث عن شخصية"
               className="bg-transparent outline-none w-full text-[14px] focus-ring" style={{ color:'#dfe4ea' }}/>
      </div>
      <div className="eyebrow text-[9px] mb-2" style={{ color:'var(--brass-dim)' }}>
        الشخصيات المعروفة حتى الفصل {chapter} — {filtered.length}
      </div>
      <div className="scroller overflow-y-auto flex-1 pb-6">
        {filtered.length===0
          ? <p className="font-old italic text-center mt-10" style={{ color:'var(--parchment-dim)' }}>لا شخصيات مطابقة بعد.</p>
          : filtered.map(r => <CharacterCard key={r.id} r={r} onOpen={setOpenId}/>)}
      </div>
      {open && <CharacterDetail r={open} onClose={()=>setOpenId(null)}/>}
    </div>
  );
}
```

Remove the temporary `CharactersSection` stub from Task 3.

- [ ] **Step 2: Verify the section renders and is spoiler-correct in the browser**

Open `index.html`. With browser tools confirm at slider = **250**:
- Four characters listed (كلاين, أودري, ألجير, ديريك), count reads "4".
- Open كلاين → detail shows التسلسل 8: مهرج, location باكلوند, aliases include شيرلوك موريارتي, and a timeline with chapters 1/21/30 ascending.

- [ ] **Step 3: Verify the spoiler slider hides/rewinds correctly**

Move slider to **15**. Expected: only كلاين visible (count "1"); أودري (16), ألجير (21), ديريك (121) gone. Open كلاين → shows التسلسل 9: متمرس, location تينغن, **no** شيرلوك موريارتي alias, timeline shows only chapter 1. Move to **120**: three characters, ديريك still hidden. This is the core spoiler proof.

- [ ] **Step 4: Verify search + console**

Type "عدالة" → only أودري matches. Clear. Confirm preview console has no errors (expect `[]`).

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: spoiler-aware Characters section with as-of detail and timeline"
```

---

## Self-Review

**Spec coverage (Phase 1 portions):**
- §1 living wiki / incremental → data split + `encodedThroughChapter` (T2) ✔
- §2 spoiler boundary 250, file mapping → Global Constraints + T2 spoiler test ✔
- §3 identity+states+events model + resolution rule → T1 engine + tests ✔
- §4 spoiler slider (volume-aware, localStorage, capped) → T3 ✔
- §5 Characters section (others deferred to Phase 2 — noted) ✔ (partial by design)
- §6 RTL Arabic + red-moon theme + reduced-motion → T3 ✔
- §8 Babel workaround, file:// run model, no-deps → Global Constraints + T3 ✔
- §7 update workflow, §9 deferred sections, full ingestion → **Phase 2/3 plans** (out of Phase-1 scope) ✔

**Placeholder scan:** no TBD/TODO; the Task-3 `CharactersSection` stub is explicitly created then explicitly removed in Task 4. Seed data is labeled provisional with a rationale, not a placeholder.

**Type consistency:** `currentState/isVisible/visibleAliases/visibleEvents/resolveCharacter/visibleCharacters/encodedThrough` names match across T1 definition and T2–T4 consumers. `resolveCharacter` returns `{state, aliases, events, pathway, status,…}` exactly as consumed by `CharacterDetail`. `meta.encodedThroughChapter` consistent T2↔T3↔engine.

---

## Phase 2 / Phase 3 (separate plans, not executed here)

- **Phase 2 — remaining sections:** Pathways & 22 Sequences, Locations + integrate the existing SVG map (filtered by chapter), Organizations, global Timeline, cross-entity linking + global search.
- **Phase 3 — full ingestion:** read `chapter0.html`…`chapter249.html` in batches via sub-agents, extract chapter-cited structured data into `lotm-data.js`, produce a change report, raise the cap. Replaces the Phase-1 seed.
