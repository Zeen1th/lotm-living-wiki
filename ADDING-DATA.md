# How to Add Data — the practical, don't-get-confused guide

This is the **step-by-step recipe** for adding/extending wiki content. If you (or an AI) follow this
exactly, the data stays correct, spoiler-safe, and grounded. Companion to `HANDOFF.md` (architecture)
and `docs/INJECTION.md` (philosophy). **When in doubt, this file wins.**

---

## 0. The 5 golden rules (never break these)

1. **Every atomic fact needs a real `quote`.** A short verbatim Arabic span copied from the cited
   chapter that *actually supports the claim*. No quote → don't add the fact.
2. **Read only within the cutoff.** Current cutoff is in `data/meta.js` → `encodedThroughChapter`.
   You may read `_epub_extract/OEBPS/chapter0.html` … `chapter{cutoff-1}.html` ONLY.
   **`chapterN.html` = novel chapter N+1.** Never open a file at/after the cutoff.
3. **Milestones only, be selective.** Timelines = origin, joins/leaves, تسلسل/rank changes, deaths,
   major reveals/turns. NOT routine beats. Only add a character/org if it's **recurring & significant**;
   a one-scene victim's death is an event on the principal, not a new entity.
4. **Ground beats memory.** Use the EPUB's exact Arabic names/terms. Never use outside knowledge of
   LotM. If the text doesn't say it, it doesn't go in.
5. **Defer when unsure.** The grounding test proves a quote is *real*, NOT that it supports the claim.
   If a pathway-rung attribution, an owner, or a name is ambiguous — leave it out and note it.

---

## 1. Before you touch data
```bash
cd "S:\!Dev\Lord of mysteries"
node --test                       # must be green before you start
node -e "console.log(require('./data/index.js').meta.encodedThroughChapter)"   # the cutoff
```
Confirm the cutoff with the user if extending the reading range. To RAISE it, only do so **after**
ingesting those chapters, then set `data/meta.js` → `encodedThroughChapter`.

---

## 2. Find what's MISSING in range (the gap-check)
Grep the allowed files for an entity's Arabic name; get its first-appearance chapter + how often it
appears (frequency ≈ importance). Example (adjust the `seq 0 N` to `cutoff-1`):
```bash
cd _epub_extract/OEBPS
allowed=$(for i in $(seq 0 278); do echo "chapter$i.html"; done)
gap(){ f=$(grep -l "$1" $allowed | sed 's/chapter//;s/.html//' | sort -n | head -1); c=$(grep -l "$1" $allowed | wc -l); echo "«$1» -> first ch$((f+1)), $c files"; }
gap "أزيك"; gap "كنيسة إله البخار"
```
A name in many files = important, probably belongs in the wiki. Cross-check against what already
exists: `node -e "const L=require('./data/index.js'); console.log(L.characters.map(c=>c.id), L.organizations.map(o=>o.id))"`.

---

## 3. Extract facts (for each new/updated entity)
For each fact, open the cited chapter file, find a distinctive verbatim span (≈3–10 words) that
supports the claim, and **verify it before writing**:
```bash
node -e "const G=require('./tools/grounding.js'); console.log(G.quoteInChapter('YOUR QUOTE', CHAPTER))"
# must print { ok: true }.  CHAPTER = novel number (file index + 1).
```
Copy the quote EXACTLY (including any EPUB typos). If it won't verify or doesn't truly support the
claim → pick another span or drop the fact.

---

## 4. Write it into the RIGHT `data/*.js` file (templates)

**Field-name rule:** `states/aliases/relationships/members` use `since_chapter`; `events/facts/entries`
use `chapter`; `sequences` use `known_chapter`; intro uses `first_appeared_chapter` + `first_appeared_quote`.
Blurbs use `sources:[chapters]` (no quote). Add to the array in the matching file; keep it valid JS.

**Character** → `data/characters.js`
```js
{ id:'azik', name_ar:'أزيك', name_en:'Azik', first_appeared_chapter:9, status:'alive',
  first_appeared_quote:'<verbatim>', pathway:null|{id,name_ar}, aliases:[{name,since_chapter,quote}],
  states:[{ since_chapter, sequence:'التسلسل N: الاسم'|'غير متجاوِز', location, faction, notes, quote }],
  events:[{ chapter, type?, text, quote, doc_ref? }],   // milestones only
  relationships:[{id, type, since_chapter, quote?}], abilities:[], tags:[],
  blurb_ar:'<summary>', sources:[...], death_chapter?:N }   // death_chapter NOT status:'dead'
```
**Organization** → `data/organizations.js`
```js
{ id:'church_steam', name_ar:'كنيسة إله البخار والآلات', name_en:'Church of the God of Steam',
  kind:'church'|'sect'|'club'|'order'|'state', first_appeared_chapter:N, first_appeared_quote:'...',
  states:[{ since_chapter, blurb_ar, leader_id?, hq_location_id? }],
  member_ids:[<char ids>], events:[{chapter,text,quote}], sources:[...], blurb_ar:'...' }
```
**Pathway rung** (only for an EXISTING pathway seer/spectator/sailor/sun/giant, correct attribution!)
→ push into that pathway's `sequences[]` in `data/pathways.js`:
```js
{ n:6, name_ar:'اسم التسلسل', name_en:'', known_chapter:N, quote:'<span naming this seq for THIS path>' }
```
**Artifact** → `data/artifacts.js` · **Location** → `data/locations.js` · **Era fact** → `data/eras.js`
(`facts[]`) · **Roselle diary entry** → `data/documents.js` (`entries[]{chapter,topic_ar,text,quote}`)
· **Glossary term** → `data/glossary.js` (`{id,term_ar,def_ar,ref?,sources}`) · **Deity family** →
`data/families.js`. Follow the same universal-field pattern; copy an existing sibling entry's shape.

**Referential integrity:** any `pathway.id`, `family_id`, `member_ids`, `leader_id`, `hq_location_id`,
`parent_id`, `contains_ids`, `glossary.ref.id`, `artifact.owner_id` you reference MUST already exist as
an entity, or the tests fail.

---

## 5. Verify → commit → deploy
```bash
node --test          # ALL green (grounding re-checks every quote incl. new ones)
git add data ; git commit -m "feat(data): <what you added>" ; git push origin master
```
Push auto-deploys to https://zeen1th.github.io/lotm-living-wiki/ (~1 min). Hard-refresh (Ctrl+F5).

---

## 6. Common mistakes (all seen before — avoid)
- **Premature rank states.** A character is `غير متجاوِز` until they actually drink the potion in-text.
  Don't stamp Seq-9 at their first appearance.
- **Mis-attributed pathway rungs.** A sequence name in a diary "list of pathways" may belong to a
  DIFFERENT pathway. Only add a rung if the quote ties that name to THAT pathway. Else defer.
- **Adding one-scene characters.** Selectivity — record their death/role as an event on a main entity.
- **`status:'dead'`** — never; use `death_chapter:N` (keeps the death from leaking before the slider).
- **Duplicate facts / re-adding fixed data.** Check the entity's existing `events`/`states` first.
- **A retrospective mention ≠ the real chapter.** "advanced the day before" is not the advance chapter;
  find the actual scene (Klein Clown = ch168 not the ch172 mention; Audrey Seq8 = ch221 not ch235).
- **Translation term variance.** Same concept, different Arabic word across chapters (e.g. Spectator
  Seq-8 as المتخاطر/الوسيط/شريف). Pick one, note the variants; don't create conflicting facts.

---

## 7. For a large batch (whole chapter range)
Do it in ~30-chapter sub-batches: extract → **manually vet semantically** (quote supports claim? right
pathway? significant enough?) → merge into `data/*.js` → `node --test` → short change report → next.
Sub-agents help extract/merge, but a human/controller must vet — the grounding gate can't catch
mis-attribution. Commit per batch; push when a batch is green.
