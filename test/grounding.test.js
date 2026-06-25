// test/grounding.test.js
const test = require('node:test');
const assert = require('node:assert');
const G = require('../tools/grounding.js');
const LOTM = require('../data/index.js');

// collect every {chapter, quote, where} atomic fact across all collections
function collectFacts(LOTM) {
  const out = [];
  const push = (chapter, quote, where) => { if (quote != null) out.push({ chapter, quote, where }); };
  const arrFacts = (arr, where) => (arr || []).forEach((it, i) => {
    const ch = it.since_chapter ?? it.chapter ?? it.known_chapter;
    if (it.quote != null) push(ch, it.quote, `${where}[${i}]`);
  });
  const each = (coll, name) => (LOTM[coll] || []).forEach(e => {
    const id = e.id || '?';
    if (e.first_appeared_quote != null) push(e.first_appeared_chapter, e.first_appeared_quote, `${name}/${id}.first_appeared`);
    arrFacts(e.states,    `${name}/${id}.states`);
    arrFacts(e.events,    `${name}/${id}.events`);
    arrFacts(e.aliases,   `${name}/${id}.aliases`);
    arrFacts(e.sequences, `${name}/${id}.sequences`);
    arrFacts(e.facts,     `${name}/${id}.facts`);
    arrFacts(e.entries,   `${name}/${id}.entries`);
    (e.members || []).forEach((m, i) => {
      if (m.quote != null) {
        const ch = m.since_chapter ?? m.chapter ?? m.known_chapter;
        push(ch, m.quote, `${name}/${id}.members[${i}]`);
      }
    });
  });
  ['characters', 'families', 'pathways', 'organizations', 'locations', 'eras', 'documents', 'glossary', 'artifacts'].forEach(c => each(c, c));
  return out;
}

test('every atomic fact quote is present in its cited chapter', (t) => {
  if (!G.extractPresent()) { t.skip('EPUB extract not present — grounding skipped'); return; }
  const facts = collectFacts(LOTM);
  const bad = [];
  for (const f of facts) {
    const r = G.quoteInChapter(f.quote, f.chapter);
    if (!r.ok) bad.push(`${f.where} (ch.${f.chapter}): ${r.reason} :: "${f.quote}"`);
  }
  assert.equal(bad.length, 0, `Ungrounded quotes:\n${bad.join('\n')}`);
});

test('the verifier actually rejects a wrong quote (guard against a no-op test)', (t) => {
  if (!G.extractPresent()) { t.skip('EPUB extract not present'); return; }
  assert.equal(G.quoteInChapter('هذا النص المختلق لا يوجد في أي فصل', 1).ok, false);
});
