// data/families.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.families = [
    {
      id: 'eternal_night',
      name_ar: 'إلهة الليل الدائم',
      name_en: 'Eternal Night Goddess',
      color: '#1a0a2e',
      first_appeared_chapter: 1,
      first_appeared_quote: 'إلهة الليل الدائم',
      blurb_ar: 'إلهة ذات ارتباط بالليل الدائم؛ تعمل كنيستها في مملكة لوين.',
      sources: [1, 3],
    },
    // NOTE: 'god_almighty' family DELETED — 'الإله القدير' has ZERO occurrences in
    // chapter0.html–chapter249.html. It was fabricated data; removed per grounding rule.
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.families;
})(typeof window !== 'undefined' ? window : globalThis);
