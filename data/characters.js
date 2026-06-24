// data/characters.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.characters = [
    {
      id: 'klein', name_ar: 'كلاين مورتي', name_en: 'Klein Moretti',
      first_appeared_chapter: 1, status: 'alive',
      first_appeared_quote: 'كلاين موريتي ، مواطن من مملكة لوين',
      pathway: { id: 'seer', name_ar: 'مسار الرائي' },
      aliases: [
        // NOTE: The EPUB spells this name as شارلوك موريارتي (not شيرلوك); corrected here.
        { name: 'شارلوك موريارتي', since_chapter: 215,
          quote: 'شارلوك موريارتي. يمكنك دعوتب شارلوك' },
      ],
      states: [
        { since_chapter: 1, sequence: 'التسلسل 9: متمرس', location: 'تينغن', faction: 'لا أحد',
          notes: 'منتقل بروحٍ من عالم آخر إلى جسد كلاين.',
          quote: 'كلاين موريتي ، مواطن من مملكة لوين' },
        // NOTE: Klein advances to Seq8 Clown prior to ch172; confirmed verbatim ch172 (chapter171.html).
        { since_chapter: 172, sequence: 'التسلسل 8: المهرج', location: 'تينغن', faction: 'نادي التاروت',
          notes: 'ارتقاء كلاين إلى التسلسل 8 المهرج.',
          quote: 'لقد تقدم إلى التسلسل 8 في اليوم السابق فقط' },
      ],
      events: [
        { chapter: 1, type: 'intro', text: 'الاستيقاظ في جسد كلاين مورتي.',
          quote: 'كلاين موريتي ، مواطن من مملكة لوين' },
        { chapter: 172, type: 'advance', text: 'الارتقاء إلى التسلسل 8 المهرج.',
          quote: 'لقد تقدم إلى التسلسل 8 في اليوم السابق فقط' },
        { chapter: 215, type: 'identity', text: 'ظهور هوية "شارلوك موريارتي".',
          quote: 'شارلوك موريارتي. يمكنك دعوتب شارلوك' },
      ],
      abilities: ['العرافة الدقيقة', 'خفة حركة خارقة', 'قراءة حركات الخصم', 'التحكم بتعابير الوجه'],
      relationships: [{ id: 'audrey', type: 'زميل في النادي', since_chapter: 7 }],
      tags: ['نادي التاروت', 'الأحمق', 'بطل'],
    },
    {
      // NOTE: name_ar corrected from 'أودري هول' to 'أودري هال' (verbatim EPUB spelling).
      // first_appeared_chapter corrected from 16 → 5 (EPUB ch5/chapter4.html).
      id: 'audrey', name_ar: 'أودري هال', name_en: 'Audrey Hall',
      first_appeared_chapter: 5, status: 'alive',
      first_appeared_quote: 'جلست أودري هال أمام خزانة ملابس',
      pathway: { id: 'spectator', name_ar: 'مسار المتفرّج' },
      aliases: [
        // NOTE: alias first used at ch7 (chapter6.html), not ch21.
        // The raw EPUB has curly-quote around the alias; use the short verbatim span.
        { name: 'عدالة', since_chapter: 7,
          quote: 'عدالة' },
      ],
      states: [
        { since_chapter: 5, sequence: 'التسلسل 9: متفرّج', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نبلاء لوين', notes: 'سيدة نبيلة بعقلٍ حادّ خلف آداب المجتمع الراقي.',
          quote: 'جلست أودري هال أمام خزانة ملابس' },
        { since_chapter: 7, sequence: 'التسلسل 9: متفرّج', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'عضو نادي التاروت باسم "عدالة".',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        // Seq 8 Intermediary (الوسيط) advancement — ch235 (chapter234.html).
        { since_chapter: 235, sequence: 'التسلسل 8: الوسيط', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'ارتقاء أودري إلى التسلسل 8 الوسيط.',
          quote: 'تقدمت بنجاح إلى التسلسل 8' },
      ],
      events: [
        { chapter: 5, type: 'intro', text: 'الظهور الأول في الضباب الرمادي.',
          quote: 'جلست أودري هال أمام خزانة ملابس' },
        { chapter: 7, type: 'join', text: 'الانضمام إلى نادي التاروت كـ"عدالة".',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        { chapter: 235, type: 'advance', text: 'الارتقاء إلى التسلسل 8 الوسيط.',
          quote: 'تقدمت بنجاح إلى التسلسل 8' },
      ],
      abilities: ['قراءة لغة الجسد', 'استشعار الأفكار السطحية', 'التواصل الذهني'],
      relationships: [{ id: 'klein', type: 'مؤسس النادي', since_chapter: 7 }],
      tags: ['نادي التاروت', 'عدالة', 'نبيلة'],
    },
    {
      // NOTE: name_ar corrected from 'ألجير ويلسون' to 'ألجر ويلسون' (EPUB spelling).
      // first_appeared_chapter corrected from 21 → 5 (chapter4.html).
      // alias 'الرجل المشنوق' corrected to 'الرجل المعلق' (EPUB spelling).
      id: 'alger', name_ar: 'ألجر ويلسون', name_en: 'Alger Wilson',
      first_appeared_chapter: 5, status: 'alive',
      first_appeared_quote: 'ألجر ويلسون على سطح السفينة',
      pathway: { id: 'sailor', name_ar: 'مسار البحّار' },
      aliases: [
        { name: 'الرجل المعلق', since_chapter: 5,
          quote: 'الرجل المعلق' },
      ],
      states: [
        { since_chapter: 5, sequence: 'التسلسل 7: مبارك الرياح', location: 'بحر سونيا - أرخبيل رورستيد',
          faction: 'كنيسة العواصف (سرّاً) / نادي التاروت',
          notes: 'بحّار-كاهن حذِر يبحر في سياسات بحر سونيا.',
          quote: 'ألجر ويلسون على سطح السفينة' },
      ],
      events: [
        { chapter: 5, type: 'intro', text: 'الظهور الأول في الضباب الرمادي مع أودري.',
          quote: 'ألجر ويلسون على سطح السفينة' },
      ],
      abilities: ['القتال المائي الخارق', 'التحكم بطاقة البرق الطفيفة', 'التلاعب بالرياح والملاحة'],
      relationships: [],
      tags: ['نادي التاروت', 'الرجل المعلق', 'بحّار'],
    },
    {
      // NOTE: first_appeared_chapter corrected from 121 → 137 (chapter136.html verified).
      id: 'derrick', name_ar: 'ديريك بيرغ', name_en: 'Derrick Berg',
      first_appeared_chapter: 137, status: 'alive',
      first_appeared_quote: 'وقف ديريك أمام مجموعة من السلالم',
      pathway: { id: 'sun', name_ar: 'مسار الشمس' },
      aliases: [
        // NOTE: alias 'الشمس' re-anchored to ch137 quote that ties Derrick to Sun pathway
        { name: 'الشمس', since_chapter: 137,
          quote: 'أريد أن أصبح الشمس' },
      ],
      states: [
        { since_chapter: 137, sequence: 'التسلسل ?: الشمس', location: 'مدينة الفضة - أرض الآلهة المهجورة',
          faction: 'مدينة الفضة', notes: 'جندي يشعّ أمله ضوءاً جديداً في الأرض المهجورة.',
          quote: 'أريد أن أصبح الشمس' },
      ],
      events: [
        { chapter: 137, type: 'intro', text: 'الظهور الأول في مدينة الفضة.',
          quote: 'وقف ديريك أمام مجموعة من السلالم' },
      ],
      abilities: ['ضوء مقدّس', 'أمل لا يُكسر'],
      relationships: [],
      tags: ['مدينة الفضة', 'الشمس'],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.characters;
})(typeof window !== 'undefined' ? window : globalThis);
