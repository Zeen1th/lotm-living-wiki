// data/pathways.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.pathways = [
    {
      id: 'seer',
      name_ar: 'مسار الرائي',
      name_en: 'Seer Pathway',
      family_id: null,
      color: '#2e6b8c',
      // 'مسار الرائي' as a full phrase is not found ≤ch250 in this EPUB; anchor via كلاين at ch1.
      first_appeared_chapter: 1,
      first_appeared_quote: 'كلاين موريتي ، مواطن من مملكة لوين',
      sequences: [],
      blurb_ar: 'مسار الرائي — مسار كلاين مورتي؛ يمنح العرافة والرؤية الخارقة والحدّة الذهنية.',
      sources: [1],
    },
    {
      id: 'spectator',
      name_ar: 'مسار المتفرّج',
      name_en: 'Spectator Pathway',
      family_id: null,
      color: '#7a4a9c',
      // NOTE: first_appeared_chapter corrected from 16 → 219 (first chapter where
      // 'مسار المتفرج' as a phrase appears in the EPUB). Anchor quote via أودري (ch5).
      first_appeared_chapter: 219,
      first_appeared_quote: 'مسار المتفرج',
      sequences: [],
      blurb_ar: 'مسار المتفرّج — مسار أودري هال؛ يمنح الحدة العقلية وقدرات الإدراك النفسي والتواصل الذهني.',
      sources: [219],
    },
    {
      id: 'sailor',
      name_ar: 'مسار البحّار',
      name_en: 'Sailor Pathway',
      family_id: null,
      color: '#1a4a7a',
      // NOTE: first_appeared_chapter corrected from 21 → 145 (first chapter where
      // 'مسار البحار' phrase appears in the EPUB). Name anchor via ألجر (ch5).
      first_appeared_chapter: 145,
      first_appeared_quote: 'مسار البحار',
      sequences: [],
      blurb_ar: 'مسار البحّار — مسار ألجر ويلسون؛ يمنح السيطرة على البحار والرياح والعواصف.',
      sources: [145],
    },
    {
      id: 'sun',
      name_ar: 'مسار الشمس',
      name_en: 'Sun Pathway',
      family_id: null,
      color: '#c8940a',
      // NOTE: first_appeared_chapter corrected from 121 → 140 (first chapter where
      // 'مسار الشمس' phrase appears). Character Derrick first appears at ch137.
      first_appeared_chapter: 140,
      first_appeared_quote: 'مسار الشمس',
      sequences: [],
      blurb_ar: 'مسار الشمس — مسار ديريك بيرغ؛ يمنح ضوءاً مقدّساً وإشعاعاً في الأرض المهجورة.',
      sources: [140],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.pathways;
})(typeof window !== 'undefined' ? window : globalThis);
