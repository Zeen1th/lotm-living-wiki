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
    // batch-X: ch265 — عائلة ساورون المذكورة في سياق بطاقات الكفر
    {
      id: 'sauron',
      name_ar: 'عائلة ساورون',
      name_en: 'Sauron Family',
      color: '#4a1a1a',
      first_appeared_chapter: 265,
      first_appeared_quote: 'عائلة ساورون',
      blurb_ar: 'عائلة أرستقراطية عريقة تتجاوز أصولها ألفي عام — أقدم من كنيسة إله الحرف. نجت من الحقبة الرابعة حتى اليوم.',
      sources: [265],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.families;
})(typeof window !== 'undefined' ? window : globalThis);
