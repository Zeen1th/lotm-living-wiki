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
