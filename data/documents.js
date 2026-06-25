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
      entries: [
        // batch-3: ch65 — genuine diary fragment; Klein reads pages about Roselle's path choice.
        // Zaratool reminded Roselle of something that shaped his Seer-path decision.
        { chapter: 65, topic_ar: 'زاراتول وتأثيره على مسار روزيل',
          text: 'مقتطف من المذكرات: يُشير روزيل إلى شخصية غامضة تُدعى زاراتول أثّرت في تمثيله وقراره باتخاذ مسار الرائي.',
          quote: 'جاء تمثيل روزيل من تذكير من الشخصية الغامضة المعروف باسم زاراتول' },
      ],
      sources: [4, 20],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.documents;
})(typeof window !== 'undefined' ? window : globalThis);
