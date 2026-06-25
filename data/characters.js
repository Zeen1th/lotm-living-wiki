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
        // NOTE: alias الأحمق chosen at ch6 (verified); used since_chapter:6 per JSON.
        { name: 'الأحمق', since_chapter: 6,
          quote: 'الأحمق' },
        // NOTE: The EPUB spells this name as شارلوك موريارتي (not شيرلوك); corrected here.
        { name: 'شارلوك موريارتي', since_chapter: 215,
          quote: 'شارلوك موريارتي. يمكنك دعوتب شارلوك' },
      ],
      states: [
        // NOTE: Fixed — Klein is an ordinary person at ch1, not yet a Beyonder.
        { since_chapter: 1, sequence: 'غير متجاوِز (إنسان عادي)', location: 'تينغن', faction: 'لا أحد',
          notes: 'منتقل بروحٍ من عالم آخر إلى جسد كلاين.',
          quote: 'كلاين موريتي ، مواطن من مملكة لوين' },
        // batch-2: Klein takes Seer potion at ch32 and becomes a Beyonder (Seq9 المتنبئ).
        { since_chapter: 32, sequence: 'التسلسل 9: المتنبئ', location: 'تينغن', faction: 'صقور الليل',
          notes: 'تناوَل جرعة المتنبئ وأصبح متجاوزًا.',
          quote: 'أنا الآن متجاوز' },
        // NOTE: Klein advances to Seq8 Clown prior to ch172; confirmed verbatim ch172 (chapter171.html).
        { since_chapter: 172, sequence: 'التسلسل 8: المهرج', location: 'تينغن', faction: 'نادي التاروت',
          notes: 'ارتقاء كلاين إلى التسلسل 8 المهرج.',
          quote: 'لقد تقدم إلى التسلسل 8 في اليوم السابق فقط' },
      ],
      events: [
        // Milestones only (batch-1 noise trimmed per user directive).
        { chapter: 1, type: 'intro', text: 'الاستيقاظ في جسد كلاين مورتي — انتقال تشو مينغ روي من الأرض.',
          quote: 'كلاين موريتي ، مواطن من مملكة لوين' },
        { chapter: 7, text: 'تبنّى هوية كلاين موريتي بالكامل وتخلّى عن تشو مينغ روي',
          quote: 'من هذه اللحظة ، أنا كلاين' },
        { chapter: 15, text: 'وافق على الانضمام كموظف مدني لصقور الليل',
          quote: 'موظفيكم المدنيين' },
        { chapter: 21, text: 'عثر على يوميات الإمبراطور روزيل وتعلّم جوهر نظام الجرعات',
          quote: 'جوهر الجرعات' },
        // batch-2: became a Beyonder by drinking the Seer potion.
        { chapter: 32, type: 'advance', text: 'تناوَل جرعة المتنبئ وأصبح متجاوزًا من التسلسل 9',
          quote: 'أنا الآن متجاوز' },
        // batch-2: officially joined the Tingen Divination Club.
        { chapter: 48, text: 'انضمّ إلى نادي العرافة في تينغن',
          quote: 'أخطط للانضمام إلى النادي' },
        { chapter: 172, type: 'advance', text: 'الارتقاء إلى التسلسل 8 المهرج.',
          quote: 'لقد تقدم إلى التسلسل 8 في اليوم السابق فقط' },
        { chapter: 215, type: 'identity', text: 'ظهور هوية "شارلوك موريارتي".',
          quote: 'شارلوك موريارتي. يمكنك دعوتب شارلوك' },
      ],
      abilities: ['العرافة الدقيقة', 'خفة حركة خارقة', 'قراءة حركات الخصم', 'التحكم بتعابير الوجه'],
      relationships: [
        { id: 'audrey', type: 'زميل في النادي', since_chapter: 7 },
        { id: 'benson_moretti', type: 'أخ أكبر', since_chapter: 1,
          quote: 'كان لديه أيضا أخ أكبر وأخت صغرى' },
        { id: 'melissa_moretti', type: 'أخت صغرى', since_chapter: 1,
          quote: 'كان لديه أيضا أخ أكبر وأخت صغرى' },
        { id: 'don_smith', type: 'قائد عمله', since_chapter: 17,
          quote: 'بدعوة من دون سميث' },
      ],
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
        // NOTE: alias العدالة first used at ch7 (chapter6.html); fixed from since_chapter:21.
        { name: 'العدالة', since_chapter: 7,
          quote: 'لقد قررت. تسميتي ستكون' },
      ],
      states: [
        // FIX: Audrey is not yet a Beyonder at ch5/ch7; she is a noble with no sequence.
        { since_chapter: 5, sequence: 'غير متجاوِزة (نبيلة)', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نبلاء لوين', notes: 'سيدة نبيلة بعقلٍ حادّ خلف آداب المجتمع الراقي.',
          quote: 'جلست أودري هال أمام خزانة ملابس' },
        { since_chapter: 7, sequence: 'غير متجاوِزة (نبيلة)', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'عضو نادي التاروت باسم "العدالة" — لم تتناول الجرعة بعد.',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        // batch-2: Audrey drinks the Spectator potion at ch41 and becomes a Beyonder.
        { since_chapter: 41, sequence: 'التسلسل 9: المتفرّج', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'تناولت جرعة المتفرّج وأصبحت متجاوِزة.',
          quote: 'شربت بسرعة جرعة المتفرج' },
        // Seq 8 Intermediary (الوسيط) advancement — ch235 (chapter234.html).
        { since_chapter: 235, sequence: 'التسلسل 8: الوسيط', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'ارتقاء أودري إلى التسلسل 8 الوسيط.',
          quote: 'تقدمت بنجاح إلى التسلسل 8' },
      ],
      events: [
        { chapter: 5, type: 'intro', text: 'الظهور الأول في الضباب الرمادي.',
          quote: 'جلست أودري هال أمام خزانة ملابس' },
        { chapter: 5, text: 'ظهرت أول مرة وسُحبت إلى الضباب الرمادي',
          quote: 'في الضباب الرمادي ، استعادت أودري هال' },
        { chapter: 7, type: 'join', text: 'الانضمام إلى نادي التاروت كـ"العدالة".',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        { chapter: 7, text: 'اختارت لقب العدالة واقترحت تسمية نادي التاروت',
          quote: 'لقد قررت. تسميتي ستكون' },
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
        // NOTE: alias الرجل المعلق chosen at ch7 (verified); fixed from since_chapter:5.
        { name: 'الرجل المعلق', since_chapter: 7,
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
        { chapter: 5, text: 'ظهر أول مرة على سفينة في بحر سونيا',
          quote: 'مركب شراعي ذاي ثلاث رؤوس' },
        { chapter: 7, text: 'اختار لقب الرجل المعلق',
          quote: 'الرجل المعلق' },
        // batch-2: Alger reveals he drowned a Psychoanalysts member to cut the info chain.
        { chapter: 60, text: 'قتل أحد أعضاء علماء النفس وكشف للنادي معلومات عن التسلسلات',
          quote: 'لقد أغرقته بيدي' },
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
    {
      id: 'benson_moretti', name_ar: 'بينسون موريتي', name_en: 'Benson Moretti',
      first_appeared_chapter: 4, status: 'alive',
      first_appeared_quote: 'شقيق كلاين ، بينسون',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 4, location: 'تينغن', faction: 'مدني',
          quote: 'شقيق كلاين ، بينسون' },
      ],
      events: [],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'أخو كلاين الأكبر.',
      sources: [4],
    },
    {
      id: 'melissa_moretti', name_ar: 'ميليسا موريتي', name_en: 'Melissa Moretti',
      first_appeared_chapter: 3, status: 'alive',
      first_appeared_quote: 'ميليسا إستيقظت',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 3, location: 'تينغن', faction: 'مدني',
          quote: 'ميليسا إستيقظت' },
      ],
      events: [],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'أخت كلاين الصغرى، طالبة في تينغن.',
      sources: [3],
    },
    {
      id: 'don_smith', name_ar: 'دون سميث', name_en: 'Don Smith',
      first_appeared_chapter: 12, status: 'alive',
      first_appeared_quote: 'دون سميث',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 12, location: 'تينغن', faction: 'صقور الليل',
          quote: 'دون سميث' },
      ],
      events: [],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'قائد فريق صقور الليل في تينغن، يتحكم في الأحلام.',
      sources: [12],
    },
    {
      id: 'emperor_roselle', name_ar: 'الإمبراطور روزيل', name_en: 'Emperor Roselle',
      first_appeared_chapter: 21, status: 'alive',
      first_appeared_quote: 'الإمبراطور روزيل',
      pathway: { id: 'spectator', name_ar: 'مسار المتفرّج' },
      aliases: [],
      states: [
        { since_chapter: 21, location: null, faction: 'إمبراطورية سابقة',
          quote: 'الإمبراطور روزيل' },
      ],
      events: [
        // batch-2: from his diary — born in Intis, offered Spectator pathway by the Church of the Crafts God.
        { chapter: 59, text: 'من مذكراته: وُلد في مملكة إنتيس؛ أعطته كنيسة إله الحرفيين خيار مسار العبقري (المتفرّج) أو باحث الغموض',
          quote: 'أعطتني كنيسة إله الحرفيين خيارين', doc_ref: 'roselle_diary' },
        { chapter: 59, text: 'من مذكراته: اختار مسار العبقري (المتفرّج لاحقاً) لكونه مساراً كاملاً',
          quote: 'لقد كان خياري سهلاً: العبقري', doc_ref: 'roselle_diary' },
      ],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'إمبراطور سابق من أصل أرضي، وُلد في إنتيس؛ اختار مسار المتفرّج/العبقري من كنيسة إله الصُنّاع. يومياته مصدر نادر عن نظام الجرعات.',
      sources: [21, 59],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.characters;
})(typeof window !== 'undefined' ? window : globalThis);
