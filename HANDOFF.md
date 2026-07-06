# Lord of the Mysteries — Living Wiki · HANDOFF

**Read this first in a new session.** It's the complete map of the project: what it is, how it's
built, how to run/deploy it, the data rules, how to add more chapters, and what's left to do.

---

## 1. What this is

An interactive, **spoiler-aware, Arabic (RTL)** wiki for the novel *Lord of the Mysteries*
(سيد الألغاز), themed dark-Victorian + red-moon. It's filled **incrementally as the reader reads** —
you give me the EPUB + a chapter cutoff, I extract chapter-cited data. The defining feature: a
**reading-progress slider** — pick any chapter you've reached and the whole wiki shows the world
**exactly as it was known at that point** (nothing past your chapter leaks).

- **Live site:** https://zeen1th.github.io/lotm-living-wiki/
- **Repo (public):** https://github.com/Zeen1th/lotm-living-wiki (`origin`, branch `master`)
- **Local path:** `S:\!Dev\Lord of mysteries`
- **Current cutoff:** chapter **250** (in `data/meta.js` → `encodedThroughChapter`). Everything up
  to ch.250 is ingested.

---

## 2. Run & deploy

**The app is SERVER-ONLY now** (it loads `app/*.js` via XHR — `file://` double-click will NOT work).

```bash
cd "S:\!Dev\Lord of mysteries"
npx serve -l 3737          # or: python -m http.server 8000
# open http://localhost:3737/index.html
```
After editing `data/*.js` or `app/*.js`, **hard-refresh (Ctrl+F5)** — files are cached.

**Deploy to the live site:** `git push` to `master`. GitHub Pages auto-rebuilds (~1 min). Then
hard-refresh the live URL. (Pages source = `master` root; `.nojekyll` disables Jekyll.)

**Tests:** `node --test` → currently **57 pass**. Runs engine + data-integrity + **grounding**
(quote verification) + helper suites. The grounding suite needs `_epub_extract/` present locally;
it **skips** gracefully if absent.

---

## 3. Architecture / file map

Stack: React 18 UMD + Tailwind Play + Babel Standalone (all CDN), no build step, no npm deps.
Icons are hand-inlined SVGs. JSX is compiled in-browser.

```
index.html            — shell: <head> CDN + styles + data <script src> tags, then an XHR loader
                         that fetches each app/*.js, Babel.transform(classic runtime), evals in order
lotm-engine.js        — PURE resolver (no DOM/React). Dual export (window.LOTMEngine + module.exports).
tools/grounding.js    — PURE Node quote-verifier (Arabic normalize + "quote exists in chapter file").
data/*.js             — the CONTENT (one file per entity type). Each assigns to window.LOTM.<type>.
  meta, characters, families, pathways, organizations, locations, eras, documents, events, glossary, artifacts
  data/index.js       — Node aggregator (require()s all, exports window.LOTM) — used by tests.
app/*.js              — the UI, one file per "page". Loaded in this order by index.html's APP_FILES:
  base.js  (icons, LinkChip, Term, Crest, helpers, NAV_VIEWS, KIND_TO_VIEW, HUB_CARDS, EmptyNote,
            SectionList — all EXPORTED TO window because the XHR+eval loader does NOT share top-level
            const/let across files; top-level `function` decls ARE global via indirect eval)
  characters.js, pathways.js, map.js, organizations.js, roselle.js, epochs.js, artifacts.js,
  chrome.js (useChapter, ChapterSlider, NavBar, WelcomeOverlay, GeneralHub), main.js (App + render)
test/*.js             — engine.test, data.test, grounding.test, grounding-helper.test
docs/                 — superpowers specs/plans (design history) + INJECTION.md (the add-chapters playbook)
lotm-world-atlas.html — legacy Phase-0 single-file map (kept for reference; not used)
_epub_extract/, *.epub — GITIGNORED (not published). The EPUB source, extracted for grounding.
```

**UI views (nav):** الرئيسية (hub) · الشخصيات (characters) · المسارات (pathways) · الخريطة (map) ·
المنظمات (orgs) · مذكرات روزيل (Roselle diary) · الحقب (epochs) · التحف (artifacts).
Cross-links: `navigate(kind, id)` → `KIND_TO_VIEW` switches view + opens the entity (via a `focus`
prop each view consumes). Hover tooltips via `Term`. Diary-sourced facts show a «↪ من المذكرات» chip.

---

## 4. Data model & conventions (THE IMPORTANT PART)

Every entity type shares universal fields so one resolver handles all:
`id`, `first_appeared_chapter` (+ `first_appeared_quote`), optional `states[]`, `events[]`,
`sources[]`, and a `blurb_ar`.

**Chapter-stamp field names (do not rename; the engine reads these):**
- `states[]`, `aliases[]`, `relationships[]`, `members[]` → `since_chapter`
- `events[]`, `facts[]`, `entries[]` → `chapter`
- `sequences[]` (pathways) → `known_chapter`
- entity intro → `first_appeared_chapter`

**The anti-fabrication rule (non-negotiable):** every ATOMIC fact carries a `quote` — a short
verbatim Arabic span **copied from its cited chapter** that genuinely SUPPORTS the claim.
`test/grounding.test.js` verifies each quote actually exists in `_epub_extract/OEBPS/chapter{N-1}.html`
(`chapterN.html` = novel chapter N+1). **No quote → the fact does not ship.** Proven: corrupting a
quote makes the test fail.
- **Blurbs are summaries**, not single quotes → they carry `sources:[chapters]` (no `quote`),
  understood as synthesis of already-cited facts.
- ⚠️ The test proves a quote is *real and in its chapter*, NOT that it *supports the claim* —
  that semantic judgment is manual. Pick on-topic spans; when unsure, DROP.

**Spoiler-safe deaths:** a death uses a top-level `death_chapter: N` (NOT `status:'dead'`, which
would leak early). The engine derives `status:'dead'` only when `chapter >= death_chapter`. Keep
`status:'alive'` + add `death_chapter` + a chapter-stamped death `event` with a quote.
(Currently only: `don_smith@209`.)

**Document links:** a fact learned from Roselle's diary carries `doc_ref:'roselle_diary'` → the UI
renders a clickable «↪ من المذكرات» chip that navigates to the diary. (Generalizable to any document.)

**Entity-specific shapes:**
- character: `pathway:{id,name_ar}`, `aliases[]`, `states[]{since_chapter,sequence,location,faction,notes,quote}`,
  `events[]`, `relationships[]`, `abilities[]`, `tags[]`, optional `death_chapter`.
- pathway: `family_id`, `color`, `sequences[]{n,name_ar,name_en?,known_chapter,quote}` (n = 9..0).
- organization: `kind`, `states[]{since_chapter,blurb_ar,leader_id?,hq_location_id?}`, `member_ids[]`, `events[]`.
- location: `kind`, `parent_id`, `map:{cx,cy,poly?}`, `states[]`, `contains_ids[]`.
- era: `order`, `facts[]`. document: `entries[]{chapter,topic_ar,text,quote}`. glossary: `{term_ar,def_ar,ref?}`.
- artifact: `type:'sealed'|'relic'|'item'`, `grade?`, `code?`, `owner_id?` (→ character/org), `events[]`.

**Referential integrity** (enforced by `test/data.test.js`): `family_id`, `character.pathway.id`,
`member_ids`, `leader_id`, `hq_location_id`, `parent_id`, `contains_ids`, `glossary.ref.id`,
`artifact.owner_id` must all resolve. Also: nothing stamped > cutoff; ids unique; temporal-invariant
on org HQ.

**The spoiler engine** (`lotm-engine.js`): `resolveCharacter/Pathway/Organization/Era/Document/Location/Artifact(entity, chapter)`
return the entity with sub-arrays filtered to `≤ chapter` (or `null` if `first_appeared_chapter > chapter`).
`visibleOf(list, chapter, resolveFn)` filters+maps a whole collection. The chapter slider drives it all.

---

## 5. EPUB & spoiler cutoff

- Source: `Lord of mysteries.epub` (the reader's **Arabic** translation), extracted to
  `_epub_extract/OEBPS/chapterN.html` (1432 files). **`chapterN.html` = novel chapter N+1.**
  (Verified: `chapter0.html`=ch1 «قرمزي», `chapter249.html`=ch250, `chapter250.html`=ch251.)
- **Hard rule when extracting: read ONLY `chapter0.html`…`chapter{cutoff-1}.html`.** Never open a
  file at/after the cutoff. Use the EPUB's own Arabic names/terms; never outside knowledge.

---

## 6. How to add more chapters (the injection workflow)

Full playbook: **`docs/INJECTION.md`**. Summary of the per-batch loop that ingested ch.1–250:
1. Confirm the new cutoff with the user.
2. **Extract** in ~30-chapter batches: dispatch 1–2 sub-agents per batch, each reads only allowed
   chapter files and emits candidate facts as `{value, chapter, quote}` (verbatim quotes it
   verifies with `tools/grounding.js`), writing JSON to `.superpowers/sdd/…`.
3. **Vet semantically** (controller): the grounding gate proves quotes are real, but YOU must check
   each quote actually supports its claim, assign rungs to the RIGHT pathway, and be **selective**
   about entities. Milestones only — origin, joins, تسلسل/rank, deaths, major turns; prune trivia.
4. **Merge** verified/vetted facts into the right `data/*.js` (a merge sub-agent, given explicit
   accept/fix/drop rules, re-verifying every quote).
5. `node --test` must stay green; deliver a SHORT change report; then bump `meta.encodedThroughChapter`.
6. Commit + push (auto-deploys).

**Lessons learned (repeat these habits):**
- Merge sub-agents sometimes die mid-task on long prompts → commit the verified partial work, finish
  the remainder with a second focused agent.
- The grounding test can't catch **mis-attribution** (right quote, wrong claim/pathway). Several were
  caught by manual vetting — defer anything ambiguous rather than guess.
- Keep timelines to milestones; the user explicitly wants low noise + short reports.
- Character sequence states were often "premature" in seeds — a character is `غير متجاوِز` until they
  actually drink the potion (Klein Seq9 @ch32, Seq8 @ch168; Audrey Seq9 @ch41, Seq8 @ch221).

---

## 7. Current state (ingested ch.1–250)

- **Characters: 10** (45 events). Klein, Audrey, Alger, Derrick, + Benson/Melissa Moretti,
  Don Smith (dead@209), Emperor Roselle, Ince Zangwill (`ence_zangwill`), Mr. A (`mr_a`).
- **Pathways (rungs):** seer 3 · spectator 2 · sailor 1 · sun 4 · giant 6.
- **Organizations 4** (Tarot Club, Secret Order, Church of Eternal Night, Church of Storms) ·
  **Locations 13** · **Eras 5** · **Families 1** · **Glossary 6** · **Artifacts 7**.
- **Roselle's diary: 16 entries.** **Deaths: Don Smith @209.**
- **Artifacts** include `sealed_0_08` — the feather Grade-0 sealed artifact **Ince Zangwill** used to
  engineer the entire Volume-1 (Tingen) plot; Ince is tagged/blurbed as **«العقل المدبّر الحقيقي للمجلد الأول»**.
- ~52 commits; 57 tests pass.

**Key accuracy corrections already baked in:** Klein walks the **Seer** pathway (not Fool);
names re-spelled to the EPUB (أودري هال، ألجر ويلسون، شارلوك موريارتي، الرجل المعلق، فيزاك);
removed fabricated «كنيسة الإله القدير»/family; Klein Clown advance = ch168 (not 172); Audrey Seq8 =
ch221 (not 235). Note: «الحكيم المخفي» (Hidden Sage) is a separate cosmic deity, NOT Ince.

---

## 8. Known follow-ups / deferred (pick up here)

1. **Reconcile Spectator Seq-8 term** — the EPUB uses three variants (المتخاطر / الوسيط / شريف) for
   the same rung; pick the canonical one and standardize.
2. **Deferred pathways** — rung names exist but attribution was ambiguous (sentence-boundary), so they
   were NOT added: **Beast** (مسار الوحش), Hunter, Secrets, Death/Eternal-Night, **Scholar** (Roselle's
   Steam-God path). Needs a careful read of the relevant chapters to map rungs → correct pathway.
3. **Deferred minor entities** recorded as events rather than full entities (Twilight Order/نظام الشفق,
   Psychoanalysts/علماء النفس, Old Neil, Kilangus, etc.) — promote any that prove recurring.
4. **Optional polish:** red-moon size/position tuning; the deferred Artifacts count could grow.
5. **Extend the cutoff past 250** — only after ingesting, per `docs/INJECTION.md`; raise
   `data/meta.js` → `encodedThroughChapter` once a batch lands.

---

## 9. Docs & history pointers
- `docs/INJECTION.md` — the add-chapters playbook (deaths, doc_ref, field conventions).
- `docs/superpowers/specs/` — design specs (world-atlas, phase-2 interactive wiki, verifiable-data).
- `docs/superpowers/plans/` — the implementation plans that built each phase.
- `PROJECT.md` — original short project readme (partially superseded by this HANDOFF).
- Auto-memory (persists across sessions) lives under the Claude memory dir; `lotm-living-wiki-project.md`
  + `epub-chapter-mapping.md` mirror much of this.

---

## 10. Quick "continue" recipe for a new session
1. `cd "S:\!Dev\Lord of mysteries"`; `npx serve -l 3737` → open the app (or use the live URL).
2. `node --test` to confirm 57 green.
3. To add chapters: confirm cutoff → follow `docs/INJECTION.md` (extract → vet → merge → test → push).
4. To fix data: edit `data/*.js`, keep every fact's `quote` grounded (`node --test`), commit + push.
5. Push to `master` → live site updates in ~1 min → hard-refresh.
