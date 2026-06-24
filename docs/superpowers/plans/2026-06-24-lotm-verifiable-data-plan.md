# Verifiable Data Architecture — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use `- [ ]`. Spec: `docs/superpowers/specs/2026-06-24-lotm-verifiable-data-architecture-design.md`.

**Goal:** Replace the monolithic seed with a type-split data store where every atomic fact carries a verbatim quote + chapter, gated by an automated quote-verification test, and migrate the seed (fixing Audrey→Seq 8, deleting the fabricated «الإله القدير» church/family).

**Architecture:** A pure grounding helper (`tools/grounding.js`) normalizes Arabic and checks a quote exists in its cited EPUB chapter file. Content moves to `data/*.js` (one file per entity type, each assigning to `window.LOTM`; a `data/index.js` aggregates for Node tests). A `test/grounding.test.js` verifies every quote. The resolver/engine is UNCHANGED (it reads chapter stamps; `quote` is additive metadata).

**Tech Stack:** Node ≥18 (`node:test`, `node:fs`, `node:path`), browser React app unchanged.

## Global Constraints
- Spoiler boundary ch.250; `chapterN.html` = novel ch `N+1`; allowed `_epub_extract/OEBPS/chapter0.html`…`chapter249.html`. No stamp > 250.
- **Every atomic fact carries `quote` (verbatim Arabic copied from its cited chapter) + its chapter stamp.** Blurbs carry `sources:[chapters]` (no quote). No quote ⇒ drop the fact.
- `file://` double-click run model; no build step; no `fetch`; zero npm deps; Babel `text/plain#appsrc` classic runtime preserved; Arabic RTL.
- Field-name convention (ADD `quote`, do not rename): `states[]`/`aliases[]`/`relationships[]`/`member`(s) use `since_chapter`; `events[]`/`facts[]`/`entries[]` use `chapter`; `sequences[]` use `known_chapter`; entity intro uses `first_appeared_chapter` + new `first_appeared_quote`. Engine reads these unchanged.
- The grounding test SKIPS (not fails) with a clear message if `_epub_extract/` is absent, so the repo builds without the EPUB; it RUNS in our workflow.

---

## Task 1 — Arabic grounding helper + unit tests

**Files:** Create `tools/grounding.js`; Create `test/grounding-helper.test.js`.

**Interfaces — Produces:**
- `normalizeArabic(s) -> string` — strip HTML tags, tashkeel/tatweel, normalize alef/ya/ta-marbuta variants, drop zero-width/bidi marks + punctuation, collapse whitespace, trim.
- `chapterFileFor(chapter) -> string` — absolute path to `_epub_extract/OEBPS/chapter{chapter-1}.html`.
- `extractPresent() -> boolean` — whether the OEBPS dir exists.
- `quoteInChapter(quote, chapter) -> { ok:boolean, reason?:string }` — `{ok:true}` if normalized quote is a substring of the normalized chapter text; `{ok:false, reason:'no-extract'|'no-file'|'not-found'}`.

- [ ] **Step 1: Write failing tests**
```js
// test/grounding-helper.test.js
const test = require('node:test');
const assert = require('node:assert');
const G = require('../tools/grounding.js');

test('normalizeArabic strips tashkeel and unifies alef/ya/ta-marbuta', () => {
  assert.equal(G.normalizeArabic('الإِلٰه'), G.normalizeArabic('الاله'));
  assert.equal(G.normalizeArabic('مدينةٌ'), G.normalizeArabic('مدينه'));
  assert.equal(G.normalizeArabic('  قرمزي،  '), 'قرمزي');
});

test('normalizeArabic strips html tags', () => {
  assert.equal(G.normalizeArabic('<p>قرمزي</p>'), 'قرمزي');
});

test('chapterFileFor maps novel chapter N to chapterN-1.html', () => {
  assert.ok(G.chapterFileFor(1).replace(/\\\\/g,'/').endsWith('_epub_extract/OEBPS/chapter0.html'));
  assert.ok(G.chapterFileFor(250).replace(/\\\\/g,'/').endsWith('_epub_extract/OEBPS/chapter249.html'));
});

test('quoteInChapter finds a real quote and rejects a fabricated one', (t) => {
  if (!G.extractPresent()) { t.skip('EPUB extract not present'); return; }
  // ch.1 (chapter0.html) opens with "قرمزي"
  assert.equal(G.quoteInChapter('قرمزي', 1).ok, true);
  // the fabricated deity never appears in ch.1
  assert.equal(G.quoteInChapter('الإله القدير', 1).ok, false);
});
```

- [ ] **Step 2: Run to verify fail**
Run: `node --test test/grounding-helper.test.js`
Expected: FAIL — `Cannot find module '../tools/grounding.js'`.

- [ ] **Step 3: Implement `tools/grounding.js`**
```js
// tools/grounding.js — pure Node helper; verifies a quote exists in its cited chapter file.
const fs = require('node:fs');
const path = require('node:path');

const OEBPS = path.join(__dirname, '..', '_epub_extract', 'OEBPS');

function stripHtml(s){ return String(s).replace(/<[^>]*>/g, ' '); }

function normalizeArabic(s){
  return stripHtml(s)
    .replace(/[ً-ْٰـ]/g, '')              // tashkeel, superscript alef, tatweel
    .replace(/[آأإٱ]/g, 'ا')          // أ إ آ ٱ -> ا
    .replace(/ى/g, 'ي')                              // ى -> ي
    .replace(/ة/g, 'ه')                              // ة -> ه
    .replace(/[​-‏‪-‮ ]/g, ' ')       // zero-width / bidi / nbsp
    .replace(/[«»"“”'’.,،؛:!؟؟()\[\]{}\-—–_/\\]/g, ' ')        // punctuation -> space
    .replace(/\s+/g, ' ')
    .trim();
}

function chapterFileFor(chapter){
  return path.join(OEBPS, 'chapter' + (chapter - 1) + '.html');
}

function extractPresent(){
  try { return fs.statSync(OEBPS).isDirectory(); } catch { return false; }
}

const _cache = new Map();
function chapterText(chapter){
  if(_cache.has(chapter)) return _cache.get(chapter);
  const f = chapterFileFor(chapter);
  let norm = null;
  try { norm = normalizeArabic(fs.readFileSync(f, 'utf8')); } catch { norm = null; }
  _cache.set(chapter, norm);
  return norm;
}

function quoteInChapter(quote, chapter){
  if(!extractPresent()) return { ok:false, reason:'no-extract' };
  const text = chapterText(chapter);
  if(text == null) return { ok:false, reason:'no-file' };
  const q = normalizeArabic(quote);
  if(!q) return { ok:false, reason:'empty-quote' };
  return text.includes(q) ? { ok:true } : { ok:false, reason:'not-found' };
}

module.exports = { normalizeArabic, stripHtml, chapterFileFor, extractPresent, quoteInChapter };
```

- [ ] **Step 4: Run to verify pass**
Run: `node --test test/grounding-helper.test.js`
Expected: PASS (the `quoteInChapter` test confirms «قرمزي» present and «الإله القدير» absent in ch.1).

- [ ] **Step 5: Commit**
```bash
git add tools/grounding.js test/grounding-helper.test.js
git commit -m "feat(grounding): Arabic-normalizing quote-in-chapter verifier"
```

---

## Task 2 — Type-split storage refactor (mechanical, no content change)

**Files:** Create `data/meta.js`, `data/characters.js`, `data/families.js`, `data/pathways.js`, `data/organizations.js`, `data/locations.js`, `data/eras.js`, `data/documents.js`, `data/glossary.js`, `data/index.js`; Modify `index.html`; Modify `test/data.test.js`; Delete `lotm-data.js`.

**Interfaces:**
- Consumes: the current `lotm-data.js` content (move it verbatim — DO NOT change values this task).
- Produces: `window.LOTM` assembled from `data/*.js` in the browser; `require('../data/index.js')` returns the same assembled object in Node.

- [ ] **Step 1: Create the per-type files** — each wraps one collection. Pattern (shown for characters; repeat per type, `meta` is an object not an array):
```js
// data/characters.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.characters = [
    /* paste the CURRENT characters array from lotm-data.js, unchanged */
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.characters;
})(typeof window !== 'undefined' ? window : globalThis);
```
Do this for: `meta` (`L.meta = {…}`), `characters`, `families`, `pathways`, `organizations`, `locations`, `eras`, `documents`, `glossary` — moving each existing collection verbatim out of `lotm-data.js`.

- [ ] **Step 2: Create `data/index.js`** (Node aggregator — requiring each file runs its IIFE, populating `globalThis.LOTM`):
```js
// data/index.js — Node-side assembler for tests.
require('./meta.js'); require('./characters.js'); require('./families.js');
require('./pathways.js'); require('./organizations.js'); require('./locations.js');
require('./eras.js'); require('./documents.js'); require('./glossary.js');
module.exports = globalThis.LOTM;
```

- [ ] **Step 3: Update `index.html`** — replace `<script src="lotm-data.js"></script>` with, in order (after `lotm-engine.js`):
```html
<script src="data/meta.js"></script>
<script src="data/characters.js"></script>
<script src="data/families.js"></script>
<script src="data/pathways.js"></script>
<script src="data/organizations.js"></script>
<script src="data/locations.js"></script>
<script src="data/eras.js"></script>
<script src="data/documents.js"></script>
<script src="data/glossary.js"></script>
```

- [ ] **Step 4: Update `test/data.test.js`** — change `const LOTM = require('../lotm-data.js');` to `const LOTM = require('../data/index.js');`. No other test changes.

- [ ] **Step 5: Delete `lotm-data.js`**, run tests + smoke-check the app
Run: `node --test`
Expected: PASS (same count as before, now sourced from `data/*.js`).
Then `git rm lotm-data.js`; start the `lotm-wiki` preview, open the app, confirm Characters/Map/Pathways still render and the slider works (no console errors). If preview tools unavailable, state so and rely on `node --test` + that `window.LOTM` shape is identical.

- [ ] **Step 6: Commit**
```bash
git add data index.html test/data.test.js
git rm lotm-data.js
git commit -m "refactor(data): split monolithic store into data/*.js type files"
```

---

## Task 3 — Cited+quoted migration + grounding gate

**Files:** Modify all `data/*.js` (add quotes / fix errors); Create `test/grounding.test.js`.

**Interfaces:**
- Consumes: `tools/grounding.js` (`quoteInChapter`, `extractPresent`), `data/index.js`.
- Produces: every atomic fact in the data carries a `quote` verified present in its chapter; blurbs carry `sources`.

**Quote-finding procedure (for EACH fact):** open the cited allowed file `_epub_extract/OEBPS/chapter{chapter-1}.html`, find a short distinctive **verbatim** Arabic span (≈3–10 words) that supports the fact, and copy it EXACTLY into `quote`. If no supporting span exists in that chapter, the fact is unfounded → DELETE it (and note it in the report). Never invent a quote.

- [ ] **Step 1: Write the grounding test (`test/grounding.test.js`)**
```js
const test = require('node:test');
const assert = require('node:assert');
const G = require('../tools/grounding.js');
const LOTM = require('../data/index.js');

// collect every {chapter, quote, where} atomic fact across all collections
function collectFacts(LOTM){
  const out = [];
  const push = (chapter, quote, where) => { if(quote != null) out.push({ chapter, quote, where }); };
  const arrFacts = (arr, key, where) => (arr||[]).forEach((it,i)=>{
    const ch = it.since_chapter ?? it.chapter ?? it.known_chapter;
    if(it.quote != null) push(ch, it.quote, `${where}[${i}]`);
  });
  const each = (coll, name) => (LOTM[coll]||[]).forEach(e=>{
    const id = e.id || '?';
    if(e.first_appeared_quote != null) push(e.first_appeared_chapter, e.first_appeared_quote, `${name}/${id}.first_appeared`);
    arrFacts(e.states, 'since_chapter', `${name}/${id}.states`);
    arrFacts(e.events, 'chapter', `${name}/${id}.events`);
    arrFacts(e.aliases, 'since_chapter', `${name}/${id}.aliases`);
    arrFacts(e.sequences, 'known_chapter', `${name}/${id}.sequences`);
    arrFacts(e.facts, 'chapter', `${name}/${id}.facts`);
    arrFacts(e.entries, 'chapter', `${name}/${id}.entries`);
    arrFacts(e.members, 'since_chapter', `${name}/${id}.members`);
  });
  ['characters','families','pathways','organizations','locations','eras','documents','glossary'].forEach(c=>each(c,c));
  return out;
}

test('every atomic fact quote is present in its cited chapter', (t) => {
  if(!G.extractPresent()){ t.skip('EPUB extract not present — grounding skipped'); return; }
  const facts = collectFacts(LOTM);
  const bad = [];
  for(const f of facts){
    const r = G.quoteInChapter(f.quote, f.chapter);
    if(!r.ok) bad.push(`${f.where} (ch.${f.chapter}): ${r.reason} :: "${f.quote}"`);
  }
  assert.equal(bad.length, 0, `Ungrounded quotes:\n${bad.join('\n')}`);
});

test('the verifier actually rejects a wrong quote (guard against a no-op test)', (t) => {
  if(!G.extractPresent()){ t.skip('EPUB extract not present'); return; }
  assert.equal(G.quoteInChapter('هذا النص المختلق لا يوجد في أي فصل', 1).ok, false);
});
```

- [ ] **Step 2: Run — expect FAIL (current data has no quotes / has the fake church)**
Run: `node --test test/grounding.test.js`
Expected: FAIL — facts lacking quotes won't be collected, but the FIRST run guides migration; more importantly after Step 3 it must pass. (If zero facts have quotes yet, the first test trivially passes with 0 facts — that's fine; Step 3 adds quotes and the test then guards them.)

- [ ] **Step 3: Migrate the data (read the EPUB; add real quotes; fix the known errors)**
Working only in allowed files (`chapter0.html`…`chapter249.html`):
  1. **Characters (all 4):** for each `state`, `event`, `alias`, add a verbatim `quote` from its chapter, and `first_appeared_quote` for the intro. **Fix Audrey:** add a `state { since_chapter:<the chapter where she reaches Seq 8>, sequence:'التسلسل 8: الوسيط', quote:'<verbatim span naming her advancement>', … }` — grep `_epub_extract` (allowed files) for «الوسيط»/«التسلسل الثامن» near أودري/العدالة to find the chapter and quote; if no supporting span exists ≤250, keep her at the highest sequence that IS quotable and note it. Drop any character fact you cannot quote.
  2. **families:** DELETE `god_almighty` (and `eternal_night` unless you can quote it). Keep only families whose name has a verbatim quote ≤250; add `first_appeared_quote`.
  3. **organizations:** DELETE any church/org lacking a real quote (e.g. the «الإله القدير» church). For survivors (نادي التاروت, النظام السري — both grep-confirmed), add `first_appeared_quote` and a quote on each state/member/event; drop unquotable members/events.
  4. **pathways / eras / documents / locations / glossary:** these are mostly blurb-only stubs. Give each `blurb_ar` a `sources:[chapters]` it can support; add `first_appeared_quote` where the entity name is quotable; DELETE any entity whose existence by ch.250 you cannot quote (re-check the pathway anchors). Leave empty `sequences`/`facts`/`entries` empty (Track B fills with quotes later).
  5. Re-run referential integrity mentally: deleting families/orgs must not leave dangling `family_id`/`member_ids` — null them or remove.

- [ ] **Step 4: Run the full suite until green**
Run: `node --test`
Expected: PASS — `grounding.test.js` (every remaining quote verified), `data.test.js` (structure/refs/≤250), `engine` + `grounding-helper`. Fix data until all pass. Paste the final summary.

- [ ] **Step 5: Smoke-check the app + commit**
Start `lotm-wiki` preview; confirm Audrey now shows التسلسل 8 and the «الإله القدير» church no longer appears in Organizations; no console errors. (If no preview, verify via `node -e` that `require('./data/index.js')` has the corrected Audrey state and no god_almighty.)
```bash
git add data test/grounding.test.js
git commit -m "feat(data): cited+quoted facts; fix Audrey Seq 8; remove fabricated church/family"
```

---

## Task 4 — Injection playbook (repeatable Track-B process)

**Files:** Create `docs/INJECTION.md`; Modify `PROJECT.md` (link it + note new data layout/tests).

- [ ] **Step 1: Write `docs/INJECTION.md`** documenting the per-batch loop: (a) confirm cutoff; (b) sub-agents read only `chapter0..chapter{cutoff-1}` and emit candidate facts each with `{value, chapter, quote}`; (c) `node --test` (grounding) gates them — drop any whose quote isn't found; (d) append verified facts to the right `data/*.js`; (e) bump `meta.encodedThroughChapter` only when the batch is done; (f) deliver a change report (added facts with quotes + dropped candidates). Include the field-name convention and the "blurbs use `sources`, atomic facts use `quote`" rule.

- [ ] **Step 2: Update `PROJECT.md`** — point "data" at `data/*.js`, note `node --test` runs engine + data + grounding suites, and link `docs/INJECTION.md`.

- [ ] **Step 3: Commit**
```bash
git add docs/INJECTION.md PROJECT.md
git commit -m "docs: injection playbook + project data-layer update"
```

---

## Self-Review
- Spec §3 fact model → Task 3 (quotes added; field-name convention in Global Constraints) ✔
- Spec §4 validator → Task 1 (helper) + Task 3 (`grounding.test.js`, incl. the "rejects wrong quote" guard) ✔
- Spec §5 type-split storage → Task 2 ✔
- Spec §6 injection pipeline → Task 4 ✔
- Spec §7 migration (Audrey Seq 8, delete church/family, drop unquotable) → Task 3 ✔
- Spec §8 boundaries (engine unchanged, grounding reads EPUB, skip-if-absent) → Global Constraints + Task 1 `extractPresent` ✔
- Placeholder scan: grounding helper + both test files are complete code; migration content is inherently a read-the-EPUB step with an exact procedure + the test that gates it — not a placeholder.
- Type consistency: `quoteInChapter`, `extractPresent`, `normalizeArabic`, `chapterFileFor` names match across Tasks 1/3; field-name convention (`since_chapter`/`chapter`/`known_chapter`/`first_appeared_quote`) consistent in Global Constraints and the Task-3 collector.

## Follow-on (separate plan): Track B — full ch.1–250 extraction
With this gate in place, the focused extraction fills `data/*.js` with verified content (pathway ladders, era facts, Roselle entries, org members, more characters/locations), each fact carrying its quote, gated by `grounding.test.js`.
