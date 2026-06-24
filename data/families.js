// data/families.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.families = [
    {
      id: 'eternal_night',
      name_ar: 'إلهة الليل الدائم',
      name_en: 'Eternal Night Goddess',
      color: '#1a0a2e',
      first_appeared_chapter: 1,  // grep: ch1 كنيسة إلهة الليل الدائم
      blurb_ar: 'إلهة ذات ارتباط بالليل الدائم؛ تعمل كنيستها في مملكة لوين.',
      sources: [1, 3],
    },
    {
      id: 'god_almighty',
      name_ar: 'الإله القدير',
      name_en: 'God Almighty',
      color: '#c8a44a',
      first_appeared_chapter: 8,  // grep: ch8 القدير
      blurb_ar: 'إله تبجّله الكنيسة الكبرى؛ كيان علوي مركزي في اللاهوت المعروف.',
      sources: [8, 35],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.families;
})(typeof window !== 'undefined' ? window : globalThis);
