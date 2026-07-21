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
      blurb_ar: 'كيان ذو ارتباط بالليل الدائم؛ تعمل كنيسته في مملكة لوين.',
      sources: [1, 3],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.families;
})(typeof window !== 'undefined' ? window : globalThis);
