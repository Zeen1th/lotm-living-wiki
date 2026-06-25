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
      sequences: [
        { n: 9, name_ar: 'المتنبئ', name_en: 'Seer', known_chapter: 30, quote: 'المتنبئ' },
        // batch-3: Seer Seq-8 = المهرج confirmed by Secret Order agent at ch75 (r1) and ch81 (r2 clearer).
        { n: 8, name_ar: 'المهرج', name_en: 'Clown', known_chapter: 75,
          quote: 'التسلسل المقابل للمتنبئ هي المهرج' },
        // batch-3: Seer Seq-7 = المشعوذ. Klein reads internal Night Owl docs ch65; Seq-8 name was blank at that point.
        { n: 7, name_ar: 'المشعوذ', name_en: 'Magician', known_chapter: 65,
          quote: 'كان هناك اسم للتسلسل 7 من هذا المسار: المشعوذ' },
      ],
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
      // batch-2: Seq-9 rung المتفرّج known from ch41 (Audrey drinks it).
      first_appeared_chapter: 219,
      first_appeared_quote: 'مسار المتفرج',
      sequences: [
        { n: 9, name_ar: 'المتفرّج', name_en: 'Spectator', known_chapter: 41,
          quote: 'شربت بسرعة جرعة المتفرج' },
        // batch-3: Spectator Seq-8 = المتخاطر. Klein reads Night Owl docs ch65.
        // NOTE: translation variant — المتخاطر (Telepathist) is the clearest-quoted name.
        { n: 8, name_ar: 'المتخاطر', name_en: 'Telepathist', known_chapter: 65,
          quote: 'تسلسل 8 المتخاطر كانوا تقدم المتفرج' },
      ],
      blurb_ar: 'مسار المتفرّج — مسار أودري هال؛ يمنح الحدة العقلية وقدرات الإدراك النفسي والتواصل الذهني.',
      sources: [41, 219],
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
      sequences: [
        // batch-3: Sailor Seq-8 = قوم الغضب. Klein reads Night Owl docs ch65.
        { n: 8, name_ar: 'قوم الغضب', name_en: 'Fury', known_chapter: 65,
          quote: 'التسلسل 8: قوم الغضب' },
      ],
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
