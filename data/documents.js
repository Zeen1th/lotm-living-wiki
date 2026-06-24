// data/documents.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.documents = [
    {
      // NOTE: first_appeared_chapter corrected from 9 → 20; ch9 'مذكرات' refers to Klein's own note-taking.
      // ch20 (chapter19.html) has the first explicit reference to Roselle's diary, verbatim verified.
      id: 'roselle_diary',
      name_ar: 'مذكرات روزيل',
      name_en: "Roselle's Diary",
      kind: 'diary',
      first_appeared_chapter: 20,
      first_appeared_quote: 'مذكرات روزيل غوستاف المفقودة قبل وفاته',
      blurb_ar: 'مذكرات روزيل غوستا، قنصل جمهورية إنتيس السابق ومخترع المحرك البخاري. تحتوي على معارف خفيّة عن الحقب الماضية.',
      entries: [],
      sources: [4, 20],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.documents;
})(typeof window !== 'undefined' ? window : globalThis);
