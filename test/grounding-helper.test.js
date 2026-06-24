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
  assert.ok(G.chapterFileFor(1).replace(/\\/g,'/').endsWith('_epub_extract/OEBPS/chapter0.html'));
  assert.ok(G.chapterFileFor(250).replace(/\\/g,'/').endsWith('_epub_extract/OEBPS/chapter249.html'));
});

test('quoteInChapter finds a real quote and rejects a fabricated one', (t) => {
  if (!G.extractPresent()) { t.skip('EPUB extract not present'); return; }
  // ch.1 (chapter0.html) opens with "قرمزي"
  assert.equal(G.quoteInChapter('قرمزي', 1).ok, true);
  // the fabricated deity never appears in ch.1
  assert.equal(G.quoteInChapter('الإله القدير', 1).ok, false);
});
