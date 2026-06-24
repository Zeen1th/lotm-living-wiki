// lotm-data.js — content store. Phase 2 seed (grounded ≤ch250).
(function (global) {
  'use strict';

  const LOTM = {
    meta: {
      title_ar: 'سيد الألغاز — موسوعة حية',
      encodedThroughChapter: 250,
      volumes: [
        { id: 'v1', name_ar: 'المجلد الأول: المتنبئ القرمزي', start_chapter: 1,   end_chapter: 206 },
        { id: 'v2', name_ar: 'المجلد الثاني', start_chapter: 207, end_chapter: 250 },
      ],
    },

    characters: [
      {
        id: 'klein', name_ar: 'كلاين مورتي', name_en: 'Klein Moretti',
        first_appeared_chapter: 1, status: 'alive',
        pathway: { id: 'fool', name_ar: 'مسار الأحمق' },
        aliases: [
          { name: 'شيرلوك موريارتي', since_chapter: 215 },
        ],
        states: [
          { since_chapter: 1,  sequence: 'التسلسل 9: متمرس', location: 'تينغن', faction: 'لا أحد',
            notes: 'منتقل بروحٍ من عالم آخر إلى جسد كلاين.' },
          { since_chapter: 21, sequence: 'التسلسل 8: مهرج',  location: 'باكلوند', faction: 'نادي التاروت',
            notes: 'مؤسس نادي التاروت؛ "الأحمق" الصامت فوق الضباب الرمادي.' },
        ],
        events: [
          { chapter: 1,   type: 'intro',   text: 'الاستيقاظ في جسد كلاين مورتي.' },
          { chapter: 21,  type: 'advance', text: 'الترقّي إلى التسلسل 8 (مهرج).' },
          { chapter: 215, type: 'identity',text: 'ظهور هوية "شيرلوك موريارتي".' },
        ],
        abilities: ['العرافة الدقيقة', 'خفة حركة خارقة', 'قراءة حركات الخصم', 'التحكم بتعابير الوجه'],
        relationships: [{ id: 'audrey', type: 'زميل في النادي', since_chapter: 21 }],
        tags: ['نادي التاروت', 'الأحمق', 'بطل'],
      },
      {
        id: 'audrey', name_ar: 'أودري هول', name_en: 'Audrey Hall',
        first_appeared_chapter: 16, status: 'alive',
        pathway: { id: 'spectator', name_ar: 'مسار المتفرّج' },
        aliases: [{ name: 'العدالة', since_chapter: 21 }],
        states: [
          { since_chapter: 16, sequence: 'التسلسل 9: متفرّج', location: 'باكلوند - حي الإمبراطورة',
            faction: 'نبلاء لوين', notes: 'سيدة نبيلة بعقلٍ حادّ خلف آداب المجتمع الراقي.' },
          { since_chapter: 21, sequence: 'التسلسل 9: متفرّج', location: 'باكلوند - حي الإمبراطورة',
            faction: 'نادي التاروت', notes: 'عضو نادي التاروت باسم "العدالة".' },
        ],
        events: [
          { chapter: 16, type: 'intro',  text: 'الظهور الأول في باكلوند.' },
          { chapter: 21, type: 'join',   text: 'الانضمام إلى نادي التاروت كـ"العدالة".' },
        ],
        abilities: ['قراءة لغة الجسد', 'استشعار الأفكار السطحية', 'التواصل الذهني'],
        relationships: [{ id: 'klein', type: 'مؤسس النادي', since_chapter: 21 }],
        tags: ['نادي التاروت', 'العدالة', 'نبيلة'],
      },
      {
        id: 'alger', name_ar: 'ألجير ويلسون', name_en: 'Alger Wilson',
        first_appeared_chapter: 21, status: 'alive',
        pathway: { id: 'sailor', name_ar: 'مسار البحّار' },
        aliases: [{ name: 'الرجل المشنوق', since_chapter: 21 }],
        states: [
          { since_chapter: 21, sequence: 'التسلسل 7: مبارك الرياح', location: 'بحر سونيا - أرخبيل رورستيد',
            faction: 'كنيسة العواصف (سرّاً) / نادي التاروت',
            notes: 'بحّار-كاهن حذِر يبحر في سياسات بحر سونيا.' },
        ],
        events: [
          { chapter: 21, type: 'intro', text: 'الانضمام إلى نادي التاروت كـ"الرجل المشنوق".' },
        ],
        abilities: ['القتال المائي الخارق', 'التحكم بطاقة البرق الطفيفة', 'التلاعب بالرياح والملاحة'],
        relationships: [],
        tags: ['نادي التاروت', 'الرجل المشنوق', 'بحّار'],
      },
      {
        id: 'derrick', name_ar: 'ديريك بيرغ', name_en: 'Derrick Berg',
        first_appeared_chapter: 121, status: 'alive',
        pathway: { id: 'sun', name_ar: 'مسار الشمس' },
        aliases: [{ name: 'الشمس', since_chapter: 121 }],
        states: [
          { since_chapter: 121, sequence: 'التسلسل ?: الشمس', location: 'مدينة الفضة - أرض الآلهة المهجورة',
            faction: 'مدينة الفضة', notes: 'جندي يشعّ أمله ضوءاً جديداً في الأرض المهجورة.' },
        ],
        events: [
          { chapter: 121, type: 'intro', text: 'الظهور في مدينة الفضة.' },
        ],
        abilities: ['ضوء مقدّس', 'أمل لا يُكسر'],
        relationships: [],
        tags: ['مدينة الفضة', 'الشمس'],
      },
    ],

    // ── FAMILIES ────────────────────────────────────────────────────────────
    // "above"/deity groupings. Only seeded if name (or clear equivalent) appears ≤ch250.
    families: [
      {
        id: 'eternal_night',
        name_ar: 'إلهة الليل الدائم',
        name_en: 'Eternal Night Goddess',
        color: '#1a0a2e',
        first_appeared_chapter: 1,  // grep: ch1 كنيسة إلهة الليل الدائم
        blurb_ar: 'إلهة ذات ارتباط بالليل الدائم؛ تعمل كنيستها في مملكة لوين.',
        sources: [1, 3],
      },
      {
        id: 'god_almighty',
        name_ar: 'الإله القدير',
        name_en: 'God Almighty',
        color: '#c8a44a',
        first_appeared_chapter: 8,  // grep: ch8 القدير
        blurb_ar: 'إله تبجّله الكنيسة الكبرى؛ كيان علوي مركزي في اللاهوت المعروف.',
        sources: [8, 35],
      },
    ],

    // ── PATHWAYS ────────────────────────────────────────────────────────────
    // Only seeded if pathway name appears ≤ch250. sequences left empty (Track B).
    pathways: [
      {
        id: 'fool',
        name_ar: 'مسار الأحمق',
        name_en: 'Fool Pathway',
        family_id: null,   // The "Fool" family (سيد الألغاز) not confirmed ≤ch250 in Arabic text
        color: '#5b3a8c',
        first_appeared_chapter: 5,   // grep: ch5 الأحمق (Tarot card reading scene)
        sequences: [],
        blurb_ar: 'مسار الأحمق — مسار كلاين مورتي؛ يرتبط ببطاقة التاروت "الأحمق" وبالأسرار فوق الضباب الرمادي.',
        sources: [5, 7],
      },
      {
        id: 'seer',
        name_ar: 'مسار الرائي',
        name_en: 'Seer Pathway',
        family_id: null,
        color: '#2e6b8c',
        first_appeared_chapter: 4,   // grep: ch4 رائي (context: pathway term)
        sequences: [],
        blurb_ar: 'مسار الرائي — مسار كلاين الأصلي قبل التحوّل؛ يمنح قدرات العرافة والرؤية الخارقة.',
        sources: [4],
      },
      {
        id: 'spectator',
        name_ar: 'مسار المتفرّج',
        name_en: 'Spectator Pathway',
        family_id: null,
        color: '#7a4a9c',
        first_appeared_chapter: 6,   // grep: ch6 المتفرّج
        sequences: [],
        blurb_ar: 'مسار المتفرّج — مسار أودري هول؛ يمنح الحدة العقلية وقدرات الإدراك النفسي.',
        sources: [6, 16],
      },
      {
        id: 'sailor',
        name_ar: 'مسار البحّار',
        name_en: 'Sailor Pathway',
        family_id: null,
        color: '#1a4a7a',
        first_appeared_chapter: 4,   // grep: ch4 بحار
        sequences: [],
        blurb_ar: 'مسار البحّار — مسار ألجير ويلسون؛ يمنح السيطرة على البحار والعواصف.',
        sources: [4, 21],
      },
      {
        id: 'sun',
        name_ar: 'مسار الشمس',
        name_en: 'Sun Pathway',
        family_id: null,
        color: '#c8940a',
        first_appeared_chapter: 140, // grep: ch140 مسار الشمس
        sequences: [],
        blurb_ar: 'مسار الشمس — مسار ديريك بيرغ؛ يمنح ضوءاً مقدّساً وإشعاعاً إلهياً في الأرض المهجورة.',
        sources: [140],
      },
    ],

    // ── ORGANIZATIONS ────────────────────────────────────────────────────────
    organizations: [
      {
        id: 'tarot_club',
        name_ar: 'نادي التاروت',
        name_en: 'Tarot Club',
        kind: 'club',
        first_appeared_chapter: 7,  // grep: ch7 نادي التاروت
        states: [
          {
            since_chapter: 7,
            blurb_ar: 'تجمّع سري للمتعالين يلتقون فوق الضباب الرمادي بقيادة "الأحمق".',
            leader_id: 'klein',
            hq_location_id: null,
          },
        ],
        member_ids: ['klein', 'audrey', 'alger'],
        events: [
          { chapter: 7, text: 'تأسيس نادي التاروت رسمياً.' },
        ],
        sources: [7, 21],
      },
      {
        id: 'secret_order',
        name_ar: 'النظام السري',
        name_en: 'Secret Order',
        kind: 'sect',
        first_appeared_chapter: 28, // grep: ch28 النظام السري
        states: [
          {
            since_chapter: 28,
            blurb_ar: 'تنظيم سري يعمل في الخفاء داخل مملكة لوين.',
            leader_id: null,
            hq_location_id: 'backlund',
          },
        ],
        member_ids: [],
        events: [],
        sources: [28],
      },
      {
        id: 'church_eternal_night',
        name_ar: 'كنيسة إلهة الليل الدائم',
        name_en: 'Church of the Eternal Night Goddess',
        kind: 'church',
        first_appeared_chapter: 1,  // grep: ch1 كنيسة إلهة الليل الدائم
        states: [
          {
            since_chapter: 1,
            blurb_ar: 'كنيسة راسخة في مملكة لوين تعمل في مجال التعليم والرعاية.',
            leader_id: null,
            hq_location_id: 'loen',
          },
        ],
        member_ids: [],
        events: [],
        sources: [1, 3],
      },
      {
        id: 'church_storms',
        name_ar: 'كنيسة العواصف',
        name_en: 'Church of the Storms',
        kind: 'church',
        first_appeared_chapter: 3,  // grep: ch3 كنيسة (storm church context)
        states: [
          {
            since_chapter: 3,
            blurb_ar: 'كنيسة إله العواصف؛ نفوذها يمتدّ على بحر سونيا وتتبعها فصائل بحرية.',
            leader_id: null,
            hq_location_id: 'soniasea',
          },
        ],
        member_ids: ['alger'],
        events: [],
        sources: [3, 6, 21],
      },
      {
        id: 'church_almighty',
        name_ar: 'كنيسة الإله القدير',
        name_en: 'Church of the Almighty',
        kind: 'church',
        first_appeared_chapter: 35, // grep: ch35 كنيسة الإله
        states: [
          {
            since_chapter: 35,
            blurb_ar: 'الكنيسة الكبرى في القارة الشمالية، تعبد الإله القدير وتمتلك نفوذاً واسعاً.',
            leader_id: null,
            hq_location_id: null,
          },
        ],
        member_ids: [],
        events: [],
        sources: [35],
      },
    ],

    // ── ERAS ─────────────────────────────────────────────────────────────────
    // Five epochs. first_appeared_chapter from grep. facts via Track B.
    eras: [
      {
        id: 'era_1',
        order: 1,
        name_ar: 'الحقبة الأولى',
        name_en: 'First Epoch',
        first_appeared_chapter: 18, // grep: ch18 الحقبة الأولى
        blurb_ar: 'الحقبة الأولى — أقدم العصور المعروفة؛ تفاصيلها شحيحة في النصوص المتاحة.',
        facts: [],
        sources: [18],
      },
      {
        id: 'era_2',
        order: 2,
        name_ar: 'الحقبة الثانية',
        name_en: 'Second Epoch',
        first_appeared_chapter: 18, // grep: ch18 الحقبة الثانية
        blurb_ar: 'الحقبة الثانية — حقبة الآلهة القديمة والنزاعات الكبرى.',
        facts: [],
        sources: [18],
      },
      {
        id: 'era_3',
        order: 3,
        name_ar: 'الحقبة الثالثة',
        name_en: 'Third Epoch',
        first_appeared_chapter: 18, // grep: ch18 الحقبة الثالثة
        blurb_ar: 'الحقبة الثالثة — صعود الإمبراطوريات وانتشار عبادة الآلهة الجديدة.',
        facts: [],
        sources: [18],
      },
      {
        id: 'era_4',
        order: 4,
        name_ar: 'الحقبة الرابعة',
        name_en: 'Fourth Epoch',
        first_appeared_chapter: 9, // grep: ch9 الحقبة الرابعة
        blurb_ar: 'الحقبة الرابعة — عصر روزيل غوستا والمحرك البخاري والثورة الصناعية.',
        facts: [],
        sources: [4, 9],
      },
      {
        id: 'era_5',
        order: 5,
        name_ar: 'الحقبة الخامسة',
        name_en: 'Fifth Epoch',
        first_appeared_chapter: 4, // grep: ch4 الحقبة الخامسة
        blurb_ar: 'الحقبة الخامسة — العصر الحاضر في أحداث الرواية؛ عصر البخار والتنوير والمتعالين.',
        facts: [],
        sources: [4],
      },
    ],

    // ── DOCUMENTS ────────────────────────────────────────────────────────────
    documents: [
      {
        id: 'roselle_diary',
        name_ar: 'مذكرات روزيل',
        name_en: "Roselle's Diary",
        kind: 'diary',
        first_appeared_chapter: 9,  // grep: ch9 مذكرات
        blurb_ar: 'مذكرات روزيل غوستا، قنصل جمهورية إنتيس السابق ومخترع المحرك البخاري. تحتوي على معارف خفيّة عن الحقب الماضية.',
        entries: [],
        sources: [4, 9],
      },
    ],

    // ── LOCATIONS ────────────────────────────────────────────────────────────
    // Converted from lotm-world-atlas.html REGIONS + CITIES arrays.
    locations: [
      // ── Regions ──
      {
        id: 'feynapotter',
        name_ar: 'فيناپوتر',
        name_en: 'Feynapotter',
        kind: 'region',
        parent_id: null,
        map: { cx: 480, cy: 84, poly: '390,70 560,55 576,100 400,110' },
        first_appeared_chapter: 9,  // conservative; ch9 has historical context
        states: [
          { since_chapter: 9, blurb_ar: 'شريط جليدي يتوّج القارة الشمالية، حدوده محلّ تنازع دائم.' },
        ],
        contains_ids: [],
        sources: [9],
      },
      {
        id: 'intis',
        name_ar: 'جمهورية إنتيس',
        name_en: 'Intis Republic',
        kind: 'region',
        parent_id: null,
        map: { cx: 248, cy: 212, poly: '150,150 250,120 342,142 362,212 322,300 222,312 162,262 140,200' },
        first_appeared_chapter: 4,  // grep: ch4 إنتيس (Intis republic context)
        states: [
          { since_chapter: 4, blurb_ar: 'جمهورية نشأت من ثورة دموية، تتبنّى فنون البيوندر بصورة أكثر انفتاحاً من منافسيها.' },
        ],
        contains_ids: [],
        sources: [4],
      },
      {
        id: 'loen',
        name_ar: 'مملكة لوين',
        name_en: 'Loen Kingdom',
        kind: 'region',
        parent_id: null,
        map: { cx: 462, cy: 205, poly: '400,112 472,96 532,122 526,192 470,228 410,206 388,160' },
        first_appeared_chapter: 1,  // grep: ch1 لوين
        states: [
          { since_chapter: 1, blurb_ar: 'مملكة جزيرية تعصف بها الضبابة والبخار، قلبها مدينة باكلوند.' },
        ],
        contains_ids: ['backlund'],
        sources: [1, 3],
      },
      {
        id: 'feysac',
        name_ar: 'إمبراطورية فيساك',
        name_en: 'Feysac Empire',
        kind: 'region',
        parent_id: null,
        map: { cx: 696, cy: 206, poly: '580,110 700,94 812,130 822,232 742,302 620,302 576,222' },
        first_appeared_chapter: 18, // conservative; feysac name not directly confirmed ≤ch9; use ch18
        states: [
          { since_chapter: 18, blurb_ar: 'إمبراطورية حربية في الشرق، مكرّسة لإله القتال.' },
        ],
        contains_ids: [],
        sources: [18],
      },
      {
        id: 'southern',
        name_ar: 'القارة الجنوبية',
        name_en: 'Southern Continent',
        kind: 'region',
        parent_id: null,
        map: { cx: 505, cy: 505, poly: '232,442 420,420 600,425 782,452 760,562 560,592 360,586 242,540' },
        first_appeared_chapter: 4,  // ch4: sea route to southern continent mentioned
        states: [
          { since_chapter: 4, blurb_ar: 'قارة مفصولة عن الشمال ببحر العواصف؛ أراضٍ مجهولة وآلهة مختلفة.' },
        ],
        contains_ids: [],
        sources: [4],
      },
      {
        id: 'forsaken',
        name_ar: 'أرض الآلهة المهجورة',
        name_en: 'Forsaken Land of the Gods',
        kind: 'region',
        parent_id: null,
        map: { cx: 914, cy: 400, poly: '862,140 962,128 978,300 950,502 876,512 852,332' },
        first_appeared_chapter: 135, // grep: ch135 أرض الآلهة المهجورة
        states: [
          { since_chapter: 135, blurb_ar: 'أرض مظلمة غارقة في الصواعق حيث سقطت الآلهة القديمة.' },
        ],
        contains_ids: ['silver'],
        sources: [135],
      },
      // ── Seas ──
      {
        id: 'fogsea',
        name_ar: 'بحر الضباب',
        name_en: 'Fog Sea',
        kind: 'sea',
        parent_id: null,
        map: { cx: 92, cy: 214 },
        first_appeared_chapter: 59, // grep: ch59 بحر الضباب
        states: [
          { since_chapter: 59, blurb_ar: 'بحر دائم الضباب غرب إنتيس، يبتلع السفن والاتجاهات.' },
        ],
        contains_ids: [],
        sources: [59],
      },
      {
        id: 'soniasea',
        name_ar: 'بحر سونيا',
        name_en: 'Sonia Sea',
        kind: 'sea',
        parent_id: null,
        map: { cx: 582, cy: 268 },
        first_appeared_chapter: 5,  // grep: ch5 بحر سونيا
        states: [
          { since_chapter: 5, blurb_ar: 'مياه دافئة شرقي لوين تعجّ بالقراصنة والمهرّبين وكنيسة العاصفة.' },
        ],
        contains_ids: ['rorsted'],
        sources: [5, 21],
      },
      {
        id: 'berserksea',
        name_ar: 'بحر العواصف',
        name_en: 'Berserk Sea',
        kind: 'sea',
        parent_id: null,
        map: { cx: 500, cy: 376 },
        first_appeared_chapter: 4,  // ch4: sea route to southern continent mentioned
        states: [
          { since_chapter: 4, blurb_ar: 'حزام من العواصف الدائمة يفصل القارتين الشمالية والجنوبية.' },
        ],
        contains_ids: [],
        sources: [4],
      },
      // ── Cities ──
      {
        id: 'backlund',
        name_ar: 'باكلوند',
        name_en: 'Backlund',
        kind: 'city',
        parent_id: 'loen',
        map: { cx: 455, cy: 158 },
        first_appeared_chapter: 3,  // grep: ch3 باكلوند
        states: [
          { since_chapter: 3, blurb_ar: 'عاصمة مملكة لوين، مقسومة بين المدينة العليا الراقية وحي الشرق المكتظ.' },
        ],
        contains_ids: [],
        sources: [3, 7, 21],
      },
      {
        id: 'tingen',
        name_ar: 'تينغن',
        name_en: 'Tingen',
        kind: 'city',
        parent_id: 'loen',
        map: { cx: 435, cy: 185 },
        first_appeared_chapter: 1,  // grep: ch1 تينغن
        states: [
          { since_chapter: 1, blurb_ar: 'مدينة في مملكة لوين حيث بدأت أحداث الرواية.' },
        ],
        contains_ids: [],
        sources: [1],
      },
      {
        id: 'rorsted',
        name_ar: 'أرخبيل رورستيد',
        name_en: 'Rorsted Archipelago',
        kind: 'city',
        parent_id: 'soniasea',
        map: { cx: 580, cy: 264 },
        first_appeared_chapter: 92, // grep: ch92 رورستيد
        states: [
          { since_chapter: 92, blurb_ar: 'جزر متناثرة في بحر سونيا، ملتقى الأساطيل الاستعمارية والقراصنة.' },
        ],
        contains_ids: [],
        sources: [92],
      },
      {
        id: 'silver',
        name_ar: 'مدينة الفضة',
        name_en: 'City of Silver',
        kind: 'city',
        parent_id: 'forsaken',
        map: { cx: 912, cy: 300 },
        first_appeared_chapter: 137, // grep: ch137 مدينة الفضة
        states: [
          { since_chapter: 137, blurb_ar: 'معقل منفرد محاط بالصواعق والوحوش في أرض الآلهة المهجورة.' },
        ],
        contains_ids: [],
        sources: [137],
      },
    ],

    // ── GLOSSARY ─────────────────────────────────────────────────────────────
    glossary: [
      {
        id: 'gloss_pathway',
        term_ar: 'مسار',
        def_ar: 'سلسلة من تسعة تسلسلات تحديد قدرات المتعالي، كلٌّ منها يمنح قدرات وشخصية مختلفة.',
        ref: { kind: 'collection', id: 'pathways' },
      },
      {
        id: 'gloss_sequence',
        term_ar: 'تسلسل',
        def_ar: 'مستوى التطوّر ضمن المسار؛ يتراوح من التسلسل 9 (الأدنى) إلى التسلسل 0 (الأعلى).',
        ref: null,
      },
      {
        id: 'gloss_beyonder',
        term_ar: 'المتعالي / الخارق',
        def_ar: 'إنسان اكتسب قدرات تتجاوز الحدود البشرية العادية عبر تناول معجون التسلسل.',
        ref: null,
      },
      {
        id: 'gloss_gray_fog',
        term_ar: 'الضباب الرمادي',
        def_ar: 'بُعد غامض فوق الواقع يتخذه كلاين مكاناً للتجمّع والتشاور والاستفسار.',
        ref: null,
      },
      {
        id: 'gloss_tarot',
        term_ar: 'بطاقة التاروت',
        def_ar: 'بطاقات تكهّن ذات رمزية مرتبطة بالمسارات؛ يعتمد عليها نادي التاروت كرموز هوية لأعضائه.',
        ref: { kind: 'organization', id: 'tarot_club' },
      },
    ],

    // legacy stub (Phase-1 top-level events not used by new model)
    events: [],
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = LOTM;
  else global.LOTM = LOTM;
})(typeof window !== 'undefined' ? window : globalThis);
