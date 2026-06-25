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

// ── Phase-2 tests ─────────────────────────────────────────────────────────────

// visibleSub
test('visibleSub: boundary-inclusive (key === chapter is included)', () => {
  const arr = [{ since_chapter: 10, v: 'a' }, { since_chapter: 20, v: 'b' }];
  const result = E.visibleSub(arr, 10);
  assert.equal(result.length, 1);
  assert.equal(result[0].v, 'a');
});

test('visibleSub: future items are hidden', () => {
  const arr = [{ since_chapter: 5, v: 'x' }, { since_chapter: 100, v: 'y' }];
  const result = E.visibleSub(arr, 50);
  assert.equal(result.length, 1);
  assert.equal(result[0].v, 'x');
});

test('visibleSub: result is sorted ascending by key', () => {
  const arr = [{ since_chapter: 30, v: 'late' }, { since_chapter: 5, v: 'early' }];
  const result = E.visibleSub(arr, 100);
  assert.deepEqual(result.map(i => i.v), ['early', 'late']);
});

test('visibleSub: supports custom key (known_chapter)', () => {
  const arr = [{ known_chapter: 5, seq: 'S9' }, { known_chapter: 300, seq: 'S8' }];
  const result = E.visibleSub(arr, 100, 'known_chapter');
  assert.equal(result.length, 1);
  assert.equal(result[0].seq, 'S9');
});

// byId
test('byId: returns matching entity', () => {
  const list = [{ id: 'a', name: 'Alpha' }, { id: 'b', name: 'Beta' }];
  assert.equal(E.byId(list, 'b').name, 'Beta');
});

test('byId: returns null when not found', () => {
  const list = [{ id: 'a' }];
  assert.equal(E.byId(list, 'missing'), null);
});

// resolvePathway
const pathway1 = {
  id: 'fool', name_ar: 'مسار المهرج', first_appeared_chapter: 1,
  sequences: [
    { known_chapter: 5,   sequence: 9, name_ar: 'متمرس' },
    { known_chapter: 300, sequence: 8, name_ar: 'مهرج' },
  ],
};

test('resolvePathway: returns null before first_appeared_chapter', () => {
  assert.equal(E.resolvePathway(pathway1, 0), null);
});

test('resolvePathway: at mid chapter shows only known sequences', () => {
  const r = E.resolvePathway(pathway1, 100);
  assert.equal(r.id, 'fool');
  assert.equal(r.sequences.length, 1);
  assert.equal(r.sequences[0].sequence, 9);
});

// resolveOrganization
const org1 = {
  id: 'tarot', name_ar: 'نادي التاروت', first_appeared_chapter: 7,
  member_ids: ['klein', 'audrey'],
  states: [{ since_chapter: 7, label: 'active' }],
  events: [
    { chapter: 7,   type: 'founding', text: 'تأسيس النادي' },
    { chapter: 200, type: 'event',    text: 'حدث لاحق' },
  ],
};

test('resolveOrganization: returns null before first_appeared_chapter', () => {
  assert.equal(E.resolveOrganization(org1, 5), null);
});

test('resolveOrganization: at mid chapter composes state + visible events', () => {
  const r = E.resolveOrganization(org1, 50);
  assert.equal(r.state.label, 'active');
  assert.equal(r.events.length, 1);
  assert.equal(r.events[0].chapter, 7);
  assert.deepEqual(r.member_ids, ['klein', 'audrey']);
});

// resolveEra
const era1 = {
  id: 'ancient', name_ar: 'العصر القديم', first_appeared_chapter: 10,
  facts: [
    { chapter: 10, text: 'حقيقة مبكرة' },
    { chapter: 220, text: 'حقيقة متأخرة' },
  ],
};

test('resolveEra: returns null before first_appeared_chapter', () => {
  assert.equal(E.resolveEra(era1, 5), null);
});

test('resolveEra: shows only facts up to chapter', () => {
  const r = E.resolveEra(era1, 100);
  assert.equal(r.facts.length, 1);
  assert.equal(r.facts[0].chapter, 10);
});

// resolveDocument
const doc1 = {
  id: 'roselle-diary', name_ar: 'مذكرات روزيل', first_appeared_chapter: 4,
  entries: [
    { chapter: 4,   text: 'المدخل الأول' },
    { chapter: 180, text: 'مدخل متأخر' },
  ],
};

test('resolveDocument: returns null before first_appeared_chapter', () => {
  assert.equal(E.resolveDocument(doc1, 3), null);
});

test('resolveDocument: shows only entries up to chapter', () => {
  const r = E.resolveDocument(doc1, 50);
  assert.equal(r.entries.length, 1);
  assert.equal(r.entries[0].chapter, 4);
});

// resolveLocation
const loc1 = {
  id: 'backlund', name_ar: 'باكلوند', first_appeared_chapter: 10,
  contains_ids: ['district-east', 'district-west'],
  states: [{ since_chapter: 10, desc: 'عاصمة' }],
};

test('resolveLocation: returns null before first_appeared_chapter', () => {
  assert.equal(E.resolveLocation(loc1, 5), null);
});

test('resolveLocation: returns state and contains_ids', () => {
  const r = E.resolveLocation(loc1, 50);
  assert.equal(r.state.desc, 'عاصمة');
  assert.deepEqual(r.contains_ids, ['district-east', 'district-west']);
});

// visibleCharacters regression — must still work via visibleOf internally
test('visibleCharacters regression: output identical for small fixture', () => {
  const later = { id: 'z', first_appeared_chapter: 300, states: [] };
  const out = E.visibleCharacters([klein, later], 50);
  assert.equal(out.length, 1);
  assert.equal(out[0].id, 'klein');
  assert.equal(out[0].state.sequence, 'التسلسل 8: مهرج');
  assert.deepEqual(out[0].aliases, ['جيرمان سبارو']);
});

test('resolveCharacter status is chapter-aware via death_chapter', () => {
  const ch = { id:'x', name_ar:'x', name_en:'x', first_appeared_chapter:1, status:'alive', death_chapter:209, states:[], aliases:[], events:[] };
  assert.equal(E.resolveCharacter(ch, 100).status, 'alive');   // before death
  assert.equal(E.resolveCharacter(ch, 208).status, 'alive');   // boundary-1
  assert.equal(E.resolveCharacter(ch, 209).status, 'dead');    // at death chapter (inclusive)
  assert.equal(E.resolveCharacter(ch, 250).status, 'dead');    // after death
  const noDeath = { id:'y', name_ar:'y', name_en:'y', first_appeared_chapter:1, status:'alive', states:[], aliases:[], events:[] };
  assert.equal(E.resolveCharacter(noDeath, 250).status, 'alive');
});
