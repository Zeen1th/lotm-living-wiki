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
