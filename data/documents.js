// data/documents.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.documents = [
    {
      id: 'roselle_diary',
      name_ar: 'مذكرات روزيل',
      name_en: "Roselle's Diary",
      kind: 'diary',
      first_appeared_chapter: 9,
      first_appeared_quote: 'مذكرات',
      blurb_ar: 'مذكرات روزيل غوستا، قنصل جمهورية إنتيس السابق ومخترع المحرك البخاري. تحتوي على معارف خفيّة عن الحقب الماضية.',
      entries: [],
      sources: [4, 9],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.documents;
})(typeof window !== 'undefined' ? window : globalThis);
