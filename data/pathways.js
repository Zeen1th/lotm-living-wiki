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
      first_appeared_chapter: 1,   // anchor: كلاين (Seer/Clown) from ch1
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
      first_appeared_chapter: 16,  // anchor: أودري هول من ch16
      sequences: [],
      blurb_ar: 'مسار المتفرّج — مسار أودري هول؛ يمنح الحدة العقلية وقدرات الإدراك النفسي والتواصل الذهني.',
      sources: [16],
    },
    {
      id: 'sailor',
      name_ar: 'مسار البحّار',
      name_en: 'Sailor Pathway',
      family_id: null,
      color: '#1a4a7a',
      first_appeared_chapter: 21,  // anchor: ألجير ويلسون من ch21
      sequences: [],
      blurb_ar: 'مسار البحّار — مسار ألجير ويلسون؛ يمنح السيطرة على البحار والرياح والعواصف.',
      sources: [21],
    },
    {
      id: 'sun',
      name_ar: 'مسار الشمس',
      name_en: 'Sun Pathway',
      family_id: null,
      color: '#c8940a',
      first_appeared_chapter: 121, // anchor: ديريك بيرغ من ch121
      sequences: [],
      blurb_ar: 'مسار الشمس — مسار ديريك بيرغ؛ يمنح ضوءاً مقدّساً وإشعاعاً في الأرض المهجورة.',
      sources: [121, 140],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.pathways;
})(typeof window !== 'undefined' ? window : globalThis);
