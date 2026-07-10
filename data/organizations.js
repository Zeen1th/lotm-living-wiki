// data/organizations.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.organizations = [
    {
      id: 'tarot_club',
      name_ar: 'نادي التاروت',
      name_en: 'Tarot Club',
      kind: 'club',
      first_appeared_chapter: 7,
      first_appeared_quote: 'الأعضاء المؤسسين لنادي التاروت',
      states: [
        {
          since_chapter: 7,
          blurb_ar: 'تجمّع سري للمتعالين يلتقون فوق الضباب الرمادي بقيادة "الأحمق".',
          leader_id: 'klein',
          hq_location_id: null,
          quote: 'الأعضاء المؤسسين لنادي التاروت',
        },
      ],
      member_ids: ['klein', 'audrey', 'alger'],
      members: [
        { id: 'klein', since_chapter: 7, quote: 'الأعضاء المؤسسين لنادي التاروت' },
        { id: 'audrey', since_chapter: 7, quote: 'الأعضاء المؤسسين لنادي التاروت' },
        { id: 'alger', since_chapter: 7, quote: 'الأعضاء المؤسسين لنادي التاروت' },
      ],
      events: [
        { chapter: 7, text: 'تأسيس نادي التاروت رسمياً.',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        { chapter: 7, text: 'تأسيس نادي التاروت في أول اجتماع بالضباب الرمادي',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        { chapter: 192, text: 'أول عملية جماعية لنادي التاروت: قتل نائب الأدميرال كيلانغوس (أحد أدميرالات القراصنة السبعة) عبر مبارَك الأحمق',
          quote: 'يجب أن تكون هذه هي المهمة الأولى لنادي التاروت خاصتنا، أليس كذلك' },
        // batch-8: ch249 — Tarot Club first op under full Fool leadership: Buckland assassination.
        { chapter: 249, text: 'أول مهمة رسمية لنادي التاروت بقيادة "الأحمق": اغتيال السفير باكلاند (رئيس استخبارات إنتيس في لوين) على يد السيد A',
          quote: 'اختفت العزلة التي خلقها مع موته' },
        // batch-X: ch254 — Buckland op confirmed successful
        { chapter: 254, text: 'تأكيد نجاح اغتيال باكلاند — يعلن نظام الشفق مسؤوليته; تدفع أودري 8000 جنيه متبقية.',
          quote: 'نجح السيد A' },
        // batch-X: ch264 — Klein creates "العالم" (The World) Tarot Club persona as intermediary
        { chapter: 264, text: 'كلاين يبتكر هوية "العالم" لينوب عنه ويتواصل عبر البطاقات مع أعضاء النادي دون كشف شخصيته.',
          quote: 'العالم' },
      ],
      sources: [7, 192, 249, 254, 264],
    },
    {
      id: 'secret_order',
      name_ar: 'النظام السري',
      name_en: 'Secret Order',
      kind: 'sect',
      first_appeared_chapter: 28,
      first_appeared_quote: 'منظمة قديمة معروفة باسم النظام السري',
      states: [
        {
          since_chapter: 28,
          blurb_ar: 'تنظيم سري يعمل في الخفاء داخل مملكة لوين.',
          leader_id: null,
          hq_location_id: 'backlund',
          quote: 'منظمة قديمة معروفة باسم النظام السري',
        },
      ],
      member_ids: [],
      events: [
        { chapter: 28, text: 'تأسّس في الحقبة الرابعة',
          quote: 'تم تأسيسها في الحقبة الرابعة' },
        { chapter: 28, text: 'يرتبط بإمبراطورية سليمان',
          quote: 'ترتبط بإمبراطورية سليمان' },
        { chapter: 28, text: 'أرسل عميلاً للبحث عن دفتر عائلة أنتيغونوس',
          quote: 'أنتيغونوس' },
        // batch-3: A Secret Order agent (disguised Clown) claims the Order controls the Seer
        // pathway beyond Seq-9 and offers Klein the Seer Seq-8 (Clown) formula as a bribe (ch79).
        { chapter: 79, text: 'ادّعى عميل النظام السري (المهرج ذو البدلة) أن النظام يسيطر على مسار تسلسل المتنبئ.',
          quote: 'ادعى ذلك المهرج ذو البدلة أن النظام السري يسيطر على مسار التسلسل المقابل للمتنبئ' },
        // batch-4 R1: ch93 diary reveals Zaratool is leader; ch104 diary reveals Order pursues Antigonos relics.
        { chapter: 93, text: 'مذكرات روزيل تكشف أن السيد زاراتول الغامض هو زعيم النظام السري القديم.',
          quote: 'رأيت ذلك السيد الغامض زاراتول مرة أخرى. لم أتوقع منه أن يكون زعيم منظمة قديمة، النظام السري!',
          doc_ref: 'roselle_diary' },
        { chapter: 104, text: 'النظام السري (بقيادة عائلة زاراتول) يلاحق متعلقات عائلة أنتيغونوس بسبب امتلاكها مسار المتنبئ وكنوزه.',
          quote: 'النظام السري الذي تسيطر عليه عائلة زاراتول يلاحق ويبحث عن المتعلقات التي خلفتها عائلة أنتيغونوس' },
      ],
      sources: [28, 93, 104],
    },
    {
      id: 'church_eternal_night',
      name_ar: 'كنيسة إلهة الليل الدائم',
      name_en: 'Church of the Eternal Night Goddess',
      kind: 'church',
      first_appeared_chapter: 1,
      first_appeared_quote: 'إلهة الليل الدائم',
      states: [
        {
          since_chapter: 1,
          blurb_ar: 'كنيسة راسخة في مملكة لوين تعمل في مجال التعليم والرعاية.',
          leader_id: null,
          hq_location_id: 'loen',
          quote: 'إلهة الليل الدائم',
        },
      ],
      member_ids: ['don_smith', 'klein'],
      members: [
        { id: 'don_smith', since_chapter: 13, quote: 'من صقور الليل، دون سميث' },
        // batch-3: Klein formally confirmed as Nighthawk member by the Holy Cathedral (ch83).
        { id: 'klein', since_chapter: 83, quote: 'الكاتدرائية المقدسة وافقت على الأمر. أنت الآن عضو رسمي' },
      ],
      events: [
        { chapter: 13, text: 'كُشف أن صقور الليل ذراعها الخارقة في تينغن',
          quote: 'من صقور الليل، دون سميث' },
        { chapter: 15, text: 'انضمّ كلاين كموظف مدني',
          quote: 'صقور الليل المحليين' },
        // batch-3: Klein formally confirmed as full Nighthawk member (ch83).
        { chapter: 83, text: 'وافقت الكاتدرائية المقدسة على انضمام كلاين رسمياً لصقور الليل.',
          quote: 'الكاتدرائية المقدسة وافقت على الأمر. أنت الآن عضو رسمي' },
        // batch-6: Old Neil (Nighthawk) loses control under the Hidden Sage and is killed (ch164).
        { chapter: 164, text: 'قُتل صقر الليل العجوز نيل بعد أن سيطر عليه "الحكيم المخفي"',
          quote: 'بانغ! بانغ! طارت رصاصتا اصيد شياطين فضيتان واخترقتا رأس العجوز نيل الواحدة تلو الآخرى' },
      ],
      sources: [1, 3],
    },
    {
      // NOTE: 'كنيسة العواصف' full name first appears at ch179, not ch3.
      // The org's first_appeared_chapter updated to 179 for consistency with quotability.
      // Alger is a member secretly (first confirmed with church+alger context at ch41).
      id: 'church_storms',
      name_ar: 'كنيسة العواصف',
      name_en: 'Church of the Storms',
      kind: 'church',
      first_appeared_chapter: 179,
      first_appeared_quote: 'كنيسة العواصف',
      states: [
        {
          since_chapter: 179,
          blurb_ar: 'كنيسة إله العواصف؛ نفوذها يمتدّ على بحر سونيا وتتبعها فصائل بحرية.',
          leader_id: null,
          hq_location_id: null,
          quote: 'كنيسة العواصف',
        },
      ],
      member_ids: ['alger'],
      events: [],
      sources: [179],
    },
    // NOTE: 'church_almighty' (كنيسة الإله القدير) DELETED — 'الإله القدير' has ZERO
    // occurrences in chapter0.html–chapter249.html. Fabricated data; removed per grounding rule.

    // ── نظام الشفق (Twilight Order) ── ظهر أولاً في ch249 (اغتيال باكلاند) لكن تأكيد العضوية في ch254
    {
      id: 'twilight_order',
      name_ar: 'نظام الشفق',
      name_en: 'Twilight Order',
      kind: 'sect',
      first_appeared_chapter: 249,
      first_appeared_quote: 'نظام الشفق',
      states: [
        {
          since_chapter: 249,
          blurb_ar: 'منظمة إرهابية من المتجاوزين تخطط لإحداث فوضى في القارة الشمالية استعداداً لعودة "الرب".',
          leader_id: null,
          hq_location_id: null,
          quote: 'نظام الشفق',
        },
      ],
      member_ids: ['mr_a'],
      members: [
        { id: 'mr_a', since_chapter: 254, quote: 'السيد A' },
      ],
      events: [
        { chapter: 249, text: 'اغتيال السفير باكلاند (رئيس استخبارات إنتيس في لوين) — أول ظهور علني.', quote: 'نظام الشفق' },
        { chapter: 254, text: 'السيد A يكشف خطتهم: إشعال فوضى في القارة لتمهيد عودة "الرب".', quote: 'سنسبب الفوضى في جميع أنحاء القارة' },
      ],
      sources: [249, 254],
    },

    // ── الكنائس السبع الكبرى (Seven Orthodox Churches) — batch: church_steam / church_knowledge / church_combat + order_iron_cross ──
    {
      id: 'church_steam',
      name_ar: 'كنيسة إله البخار والآلات',
      name_en: 'Church of the God of Steam and Machinery',
      kind: 'church',
      first_appeared_chapter: 17,
      first_appeared_quote: 'كنيسة إله البخار والآلات في الضواحي',
      states: [
        {
          since_chapter: 17,
          blurb_ar: 'إحدى الكنائس السبع الكبرى في القارة الشمالية، تعبد إله البخار والآلات؛ نشأت كـ"كنيسة إله الحرف اليدوية" المقموعة قبل تأسيس إنتيس ثم أُعيدت تسميتها؛ مقرها "كاتدرائية الأرقام المقدسة" في ضواحي تينغن ولاحقاً مقر رئيسي في حي سانت جورج ببكلاند؛ مرتبطة بصعود الإمبراطور روزيل والثورة الصناعية.',
          leader_id: null,
          hq_location_id: null,
          quote: 'كنيسة إله البخار والآلات في الضواحي',
        },
      ],
      member_ids: [],
      events: [
        { chapter: 134, text: 'الأصل التاريخي: كنيسة الشمس المشتعلة الأبدية قمعت كنيسة إله الحرف اليدوية التي عُرفت لاحقاً باسم كنيسة إله البخار والآلات.',
          quote: 'قامت كنيسة الشمس المشتعلة الأبدية بقمع كنيسة إله الحرف اليدوية التي أصبحت تعرف فيما بعد باسم كنيسة إله البخار والآلات' },
        { chapter: 261, text: 'موقف الكنيسة كان ضعيفاً قبل ظهور الإمبراطور روزيل، ما يوحي بتقوّي رابطتها به لاحقاً.',
          quote: 'بالنظر إلى الموقف الضعيف لكنيسة إله البخار والآلات قبل ظهور روزيل' },
        { chapter: 229, text: 'يدّعي كلاين (كغطاء تنكّري أثناء عملية سرية) أنه من أتباع إله البخار والآلات.',
          quote: 'رد كلاين بلا تردد “إله البخار والآلات”' },
      ],
      sources: [17, 134, 261, 265, 229],
    },
    {
      id: 'church_knowledge',
      name_ar: 'كنيسة إله المعرفة والحكمة',
      name_en: 'Church of the God of Knowledge and Wisdom',
      kind: 'church',
      first_appeared_chapter: 94,
      first_appeared_quote: 'يجب أن يكون هؤلاء الناس من كنيسة لورد العواصف، أو كنيسة الشمس المشتعلة الأبدية، أو كنيسة إله المعرفة والحكمة',
      states: [
        {
          since_chapter: 94,
          blurb_ar: 'إحدى الكنائس السبع الكبرى، تعبد إله المعرفة والحكمة، وتُعدّ من أقدم المنظمات الخفية بحسب البعض؛ يُنسب إليها الحصول على التحفة المختومة 2.081 (الجهاز الذي استُخدم لتحريف/محو قدر إينس)؛ يتبعها التسلسل 7 المُلقّب بـ"المحقق" (خبير أسلحة وجامع معلومات).',
          leader_id: null,
          hq_location_id: null,
          quote: 'يجب أن يكون هؤلاء الناس من كنيسة لورد العواصف، أو كنيسة الشمس المشتعلة الأبدية، أو كنيسة إله المعرفة والحكمة',
        },
      ],
      member_ids: [],
      events: [
        { chapter: 257, text: 'تم الحصول على التحفة المختومة 2.081 (جهاز تحريف/محو قدر إينس) من كنيسة إله المعرفة والحكمة.',
          quote: 'تم الحصول على 2.081 من كنيسة إله المعرفة والحكمة' },
        { chapter: 279, text: 'التسلسل 7 الملقب بـ"المحقق" (خبير أسلحة وجامع معلومات) جزء من كنيسة إله المعرفة والحكمة.',
          quote: 'التسلسل 7 خبير الأسلحة وجامع المعلومات . هيه، الأخير لديه لقب، المحقق. إنه جزء من كنيسة إله المعرفة والحكمة' },
      ],
      sources: [94, 257, 279],
    },
    {
      id: 'church_combat',
      name_ar: 'كنيسة إله القتال',
      name_en: 'Church of the God of Combat',
      kind: 'church',
      first_appeared_chapter: 94,
      first_appeared_quote: 'كنيسة إلهة الليل الدائم، الكنيسة الأرض الأم وكنيسة إله القتال',
      states: [
        {
          since_chapter: 94,
          blurb_ar: 'إحدى الكنائس السبع الكبرى، تعبد إله القتال، وتُعدّ من أقدم المنظمات الخفية؛ تسيطر على كامل مسار "المحارب" الذي كان ينتمي أصلاً إلى العمالقة أحاديي العين؛ عدو لدود لكنيسة الليل الدائم بحسب مذكرات الإمبراطور روزيل.',
          leader_id: null,
          hq_location_id: null,
          quote: 'كنيسة إلهة الليل الدائم، الكنيسة الأرض الأم وكنيسة إله القتال',
        },
      ],
      member_ids: [],
      events: [
        { chapter: 180, text: 'كنيسة إله القتال تسيطر على المسار الكامل للمحارب، الذي كان ينتمي إلى العمالقة أحاديي العين.',
          quote: 'كنيسة إله القتال تسيطر على المسار الكامل للمحارب، الذي كان ينتمي إلى العمالقة' },
        { chapter: 203, text: 'مذكرات الإمبراطور روزيل تصف كنيسة الليل الدائم وكنيسة إله القتال بأنهما عدوّان شرسان.',
          quote: 'وصفت مذكرات الإمبراطور روزيل كنيسة الليل الدائم وكنيسة إله القتال بأنها أعداء شرسون' },
      ],
      sources: [94, 180, 203, 240, 274],
    },
    {
      id: 'order_iron_cross',
      name_ar: 'نظام صليب الحديد والدم',
      name_en: 'Order of the Iron and Blood Cross',
      kind: 'sect',
      first_appeared_chapter: 66,
      first_appeared_quote: 'نظام الشفق، نظام صليب الحديد والدم، وفجر العنصر، وعلماء التفس الكيميائيون',
      states: [
        {
          since_chapter: 66,
          blurb_ar: 'منظمة سرية "جديدة" (ظهرت خلال آخر 200-300 عام تقريباً بحسب تصنيف كلاين للمنظمات الخفية عبر الحقب) تؤمن بـ"الخالق الحقيقي"، إلى جانب نظام الشفق؛ يرى كلاين احتمالاً قوياً لارتباطها بمجموعة صقور الليل الغامضة قيد التتبع.',
          leader_id: null,
          hq_location_id: null,
          quote: 'نظام الشفق، نظام صليب الحديد والدم، وفجر العنصر، وعلماء التفس الكيميائيون',
        },
      ],
      member_ids: [],
      events: [
        { chapter: 88, text: 'من بين المنظمات الخفية القليلة التي آمنت بـ"الخالق الحقيقي" والتي لم تظهر إلا في القرنين أو الثلاثة الأخيرة، إلى جانب نظام الشفق.',
          quote: 'المنظمات الخفية القليلة التي آمنت بـ الخالق الحقيقي لم تظهر إلا في القرنين أو الثلاثة قرون الماضية، مثل نظام الشفق و نظام صليب الحديد والدم' },
        { chapter: 200, text: 'يرى كلاين احتمالاً قوياً لارتباط نظام صليب الحديد والدم (الذي ظهر خلال آخر 200-300 عام فقط) بمجموعة صقور الليل الغامضة قيد التتبع.',
          quote: 'المنظمة السرية التي ظهرت فقط في المائتي إلى ثلاثمائة سنة الأخيرة، نظام صليب الحديد والدم. اعتقد كلاين أنه ممكن جدا' },
      ],
      sources: [66, 88, 200],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.organizations;
})(typeof window !== 'undefined' ? window : globalThis);
