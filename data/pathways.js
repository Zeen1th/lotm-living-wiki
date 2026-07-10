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
        // ch251 reveals the alternative/updated name: لاعب الخفة (Juggler)
        { n: 7, name_ar: 'لاعب الخفة', name_en: 'Juggler/Magician', known_chapter: 251,
          quote: 'التسلسل 7، لاعب الخفة' },
        // batch-X: ch251 — Seer Seq-6 = عديم الوجه (Bane/Faceless)
        { n: 6, name_ar: 'عديم الوجه', name_en: 'Bane', known_chapter: 251,
          quote: 'عديم الوجه' },
        // batch-X: ch251 — Seer Seq-5 = المتحكم في الدمى (Puppeteer)
        { n: 5, name_ar: 'المتحكم في الدمى', name_en: 'Puppeteer', known_chapter: 251,
          quote: 'التسلسل 5، المتحكم في الدمى' },
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
      // batch-5 R2: ch140 verified rungs for Sun pathway (T9/T8/T7/T4).
      sequences: [
        { n: 9, name_ar: 'الشاعر الملحمي', known_chapter: 140,
          quote: 'تركيبة جرعة الشاعر الملحمي' },
        { n: 8, name_ar: 'متوسل الضوء', known_chapter: 140,
          quote: 'تركيبة جرعة متوسل الضوء' },
        { n: 7, name_ar: 'كاهن النور', known_chapter: 140,
          quote: 'تركيبة جرعة كاهن النور' },
        { n: 4, name_ar: 'اللامظلّل', known_chapter: 140,
          quote: 'تركيبة جرعة اللامظلل' },
      ],
      blurb_ar: 'مسار الشمس — مسار ديريك بيرغ؛ يمنح ضوءاً مقدّساً وإشعاعاً في الأرض المهجورة.',
      sources: [140],
    },
    {
      // batch-5 R2: Giant pathway introduced ch138 in Silver City / Church of the War God (Northern Continent).
      id: 'giant',
      name_ar: 'مسار العملاق',
      name_en: 'Giant Pathway',
      family_id: null,
      color: '#8a5a2a',
      first_appeared_chapter: 138,
      first_appeared_quote: 'مسار تسلسل العملاق هي التسلسل 9 المحارب المتجاوز',
      // batch-5 R2: All 6 rungs (T9–T4) verified at ch138.
      sequences: [
        { n: 9, name_ar: 'المحارب المتجاوز', known_chapter: 138,
          quote: 'التسلسل 9 المحارب المتجاوز' },
        { n: 8, name_ar: 'المصارع', known_chapter: 138,
          quote: 'التسلسل 8 المصارع' },
        { n: 7, name_ar: 'سيد الأسلحة', known_chapter: 138,
          quote: 'التسلسل 7 سيد الأسلحة' },
        { n: 6, name_ar: 'بلادين الفجر', known_chapter: 138,
          quote: 'التسلسل 6 بلادين الفجر' },
        { n: 5, name_ar: 'الحارس', known_chapter: 138,
          quote: 'التسلسل 5 الحارس' },
        { n: 4, name_ar: 'صائد الشياطين', known_chapter: 138,
          quote: 'التسلسل 4 صائد الشياطين' },
      ],
      blurb_ar: 'مسار العملاق — مسار مرتبط بكنيسة إله القتال في القارة الشمالية، وهو المسار السائد في مدينة الفضة. يمنح قوةً جسدية هائلة وبراعةً في القتال.',
      sources: [138],
    },
    {
      // gap-pathway-sleepless: Church of the Eternal Night Goddess path. Two name variants
      // across chapters ('مسار اللانائم' / 'مسار الليل الدائم'); Seq5/Seq4 also labeled
      // 'مسار الموت' (ch210). Seq6 unnamed by ch279 → omitted. All 5 rung quotes re-verified {ok:true}.
      id: 'sleepless',
      name_ar: 'مسار الليل الدائم',
      name_en: 'Eternal Night / Sleepless',
      family_id: 'eternal_night',
      color: '#1a0a2e',
      first_appeared_chapter: 1,
      first_appeared_quote: 'كانت والدته من محبي إلهة الليل الدائم. لقد ماتت في السنة التي إجتاز فيها كلاين امتحان القبول لجامعة خوي …',
      sequences: [
        { n: 9, name_ar: 'اللانائم', known_chapter: 22,
          quote: 'تسلسل البداية لتسلسل كنيستنا الكامل هو اللانائم: التسلسل 9، اللانائم!' },
        { n: 8, name_ar: 'شاعر منتصف الليل', known_chapter: 21,
          quote: 'ليونارد ميتشل. ذو التسلسل 8 شاعر منتصف الليل' },
        { n: 7, name_ar: 'الكابوس', known_chapter: 22,
          quote: 'بعد ذلك ، هناك شاعر منتصف الليل في التسلسل 8، وأعلى من دلك بمستوى هو كابوس التسلسل 7.' },
        { n: 5, name_ar: 'حارس البوابة', known_chapter: 210,
          quote: 'وضع إنس زانغويل طقسً مع النصف المتبقي من خاصية سليل الموت. لقد استهلك رماد القديسة سيلينا وتقدم بنجاح من التسلسل 5 من مسار تسلسل الموت، حارس البوابة، إلى التسلسل 4 من مسار الليل الدائم تسلسل، مراقب الليل. على هذا النحو، حصل على خصائص الألوهية وأصبح نصف إله.' },
        { n: 4, name_ar: 'مراقب الليل', known_chapter: 210,
          quote: 'وضع إنس زانغويل طقسً مع النصف المتبقي من خاصية سليل الموت. لقد استهلك رماد القديسة سيلينا وتقدم بنجاح من التسلسل 5 من مسار تسلسل الموت، حارس البوابة، إلى التسلسل 4 من مسار الليل الدائم تسلسل، مراقب الليل. على هذا النحو، حصل على خصائص الألوهية وأصبح نصف إله.' },
      ],
      blurb_ar: 'مسار تسيطر عليه كنيسة إلهة الليل الدائم؛ تسلسلاته تشمل اللانائم وشاعر منتصف الليل وحارس البوابة ومراقب الليل.',
      sources: [1, 21, 22, 210],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.pathways;
})(typeof window !== 'undefined' ? window : globalThis);
