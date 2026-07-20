// data/entities.js
// الكيانات غير الطبيعية: الآلهة الأرثوذكسية والشريرة، والأباطرة القدامى، وكائفات أخرى.
// «الحكام / الكيانات» — أي ما هو فوق الطبيعة. كل الاقتباسات مأخوذة من مصادر موثّقة
// في organizations.js / eras.js (نفس الفصول، نفس النص المُتحقّق منه في الـ EPUB).
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.entities = [

    // ── الآلهة الأرثوذكسية السبع (القارة الشمالية) ──────────────────────────
    {
      id: 'eternal_night_goddess',
      name_ar: 'إلهة الليل الدائم', name_en: 'Eternal Night Goddess',
      kind: 'god',
      first_appeared_chapter: 14, status: 'unknown',
      first_appeared_quote: 'إلهة الليل الدائم',
      pathway: { id: 'sleepless', name_ar: 'مسار اللانائم' },
      aliases: [],
      states: [
        { since_chapter: 14, role: 'إلهة أرثوذكسية', domain: 'القارة الشمالية',
          notes: 'إحدى الآلهة الأرثوذكسية السبع؛ ترتبط بها كنيسة إلهة الليل الدائم ومسار اللانائم.' },
      ],
      events: [
        { chapter: 14, type: 'mention', text: 'إحدى الآلهة الأرثوذكسية المعروفة في القارة الشمالية.',
          quote: 'إلهة الليل الدائم' },
      ],
      blurb_ar: 'إحدى الآلهة الأرثوذكسية السبع في القارة الشمالية؛ ترتبط بها كنيسة إلهة الليل الدائم ومسار اللانائم.',
      sources: [14],
    },
    {
      id: 'lord_of_storms',
      name_ar: 'سيد العواصف', name_en: 'Lord of Storms',
      kind: 'god',
      first_appeared_chapter: 94, status: 'unknown',
      first_appeared_quote: 'كنيسة لورد العواصف',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 94, role: 'إله أرثوذكسي', domain: 'القارة الشمالية',
          notes: 'أحد الآلهة الأرثوذكسية السبع؛ تتبعه كنيسة لورد العواصف.' },
      ],
      events: [
        { chapter: 265, type: 'lore', text: 'أحد الآلهة الأرثوذكسية السبعة النشطة في الحقبة الرابعة (عصر الآلهة).',
          quote: 'الآلهة الأرثوذكسية السبعة' },
      ],
      blurb_ar: 'أحد الآلهة الأرثوذكسية السبع في القارة الشمالية؛ تتبعه كنيسة لورد العواصف (سيد العواصف).',
      sources: [94, 265],
    },
    {
      id: 'god_of_steam',
      name_ar: 'إله البخار والآلات', name_en: 'God of Steam and Machinery',
      kind: 'god',
      first_appeared_chapter: 134, status: 'unknown',
      first_appeared_quote: 'قامت كنيسة الشمس المشتعلة الأبدية بقمع كنيسة إله الحرف اليدوية التي أصبحت تعرف فيما بعد باسم كنيسة إله البخار والآلات',
      pathway: null,
      aliases: [{ name: 'إله الحرف اليدوية', since_chapter: 134 }],
      states: [
        { since_chapter: 134, role: 'إله أرثوذكسي', domain: 'القارة الشمالية',
          notes: 'أحد الآلهة الأرثوذكسية السبع؛ نشأت عبادته كـ«إله الحرف اليدوية» المقموعة قبل أن يعاد اسمه.' },
      ],
      events: [
        { chapter: 134, type: 'history', text: 'كنيسة الشمس المشتعلة الأبدية قمعت قديمًا كنيسة إله الحرف اليدوية التي صارت لاحقًا إله البخار والآلات.',
          quote: 'قامت كنيسة الشمس المشتعلة الأبدية بقمع كنيسة إله الحرف اليدوية التي أصبحت تعرف فيما بعد باسم كنيسة إله البخار والآلات' },
      ],
      blurb_ar: 'أحد الآلهة الأرثوذكسية السبع؛ عُرف قديمًا بـ«إله الحرف اليدوية» قبل أن يُعاد تأسيس عبادته بوصفه إله البخار والآلات.',
      sources: [134],
    },
    {
      id: 'god_of_knowledge',
      name_ar: 'إله المعرفة والحكمة', name_en: 'God of Knowledge and Wisdom',
      kind: 'god',
      first_appeared_chapter: 94, status: 'unknown',
      first_appeared_quote: 'كنيسة إله المعرفة والحكمة',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 94, role: 'إله أرثوذكسي', domain: 'القارة الشمالية',
          notes: 'أحد الآلهة الأرثوذكسية السبع؛ من أقدم المنظمات الخفية بحسب بعض الروايات.' },
      ],
      events: [
        { chapter: 265, type: 'lore', text: 'أحد الآلهة الأرثوذكسية السبعة النشطة في الحقبة الرابعة.',
          quote: 'الآلهة الأرثوذكسية السبعة' },
      ],
      blurb_ar: 'أحد الآلهة الأرثوذكسية السبع في القارة الشمالية؛ تتبعه كنيسة إله المعرفة والحكمة، وتُعدّ من أقدم المنظمات الخفية.',
      sources: [94, 265],
    },
    {
      id: 'god_of_combat',
      name_ar: 'إله القتال', name_en: 'God of Combat',
      kind: 'god',
      first_appeared_chapter: 265, status: 'unknown',
      first_appeared_quote: 'الآلهة الأرثوذكسية السبعة',
      pathway: { id: 'giant', name_ar: 'مسار العملاق' },
      aliases: [],
      states: [
        { since_chapter: 265, role: 'إله أرثوذكسي', domain: 'القارة الشمالية',
          notes: 'أحد الآلهة الأرثوذكسية السبع؛ يرتبط بمسار العملاق.' },
      ],
      events: [
        { chapter: 265, type: 'lore', text: 'أحد الآلهة الأرثوذكسية السبعة النشطة في عصر الآلهة (الحقبة الرابعة).',
          quote: 'الآلهة الأرثوذكسية السبعة' },
      ],
      blurb_ar: 'أحد الآلهة الأرثوذكسية السبع؛ يرتبط بمسار العملاق (العمالقة أحاديي العين في الحقبة الثانية).',
      sources: [265],
    },
    {
      id: 'mother_earth',
      name_ar: 'الأرض الأم', name_en: 'Mother Earth',
      kind: 'god',
      first_appeared_chapter: 94, status: 'unknown',
      first_appeared_quote: 'الأرض الأم',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 94, role: 'إلهة أرثوذكسية', domain: 'القارة الشمالية',
          notes: 'إحدى الآلهة الأرثوذكسية السبع.' },
      ],
      events: [
        { chapter: 265, type: 'lore', text: 'إحدى الآلهة الأرثوذكسية السبعة النشطة في عصر الآلهة.',
          quote: 'الآلهة الأرثوذكسية السبعة' },
      ],
      blurb_ar: 'إحدى الآلهة الأرثوذكسية السبع في القارة الشمالية؛ إلهة الأرض والخِصب.',
      sources: [94, 265],
    },
    {
      id: 'eternal_blazing_sun',
      name_ar: 'الشمس المشتعلة الأبدية', name_en: 'Eternal Blazing Sun',
      kind: 'god',
      first_appeared_chapter: 134, status: 'unknown',
      first_appeared_quote: 'قامت كنيسة الشمس المشتعلة الأبدية بقمع كنيسة إله الحرف اليدوية',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 134, role: 'إله أرثوذكسي', domain: 'القارة الشمالية',
          notes: 'أحد الآلهة الأرثوذكسية السبع؛ الأقوى نفوذًا بين الكنائس.' },
      ],
      events: [
        { chapter: 134, type: 'history', text: 'كنيسة الشمس المشتعلة الأبدية قمعت قديمًا كنيسة إله الحرف اليدوية.',
          quote: 'قامت كنيسة الشمس المشتعلة الأبدية بقمع كنيسة إله الحرف اليدوية' },
      ],
      blurb_ar: 'أحد الآلهة الأرثوذكسية السبع؛ كنيسته الأقوى نفوذًا في القارة الشمالية، وعرفت بقمعها لكنيسة إله الحرف اليدوية قديمًا.',
      sources: [134],
    },

    // ── الآلهة الشريرة ────────────────────────────────────────────────────
    {
      id: 'death',
      name_ar: 'الموت', name_en: 'Death',
      kind: 'evil_god',
      first_appeared_chapter: 161, status: 'unknown',
      first_appeared_quote: 'صفقة مع الموت',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 161, role: 'إله شرير', domain: 'غير معروف',
          notes: 'إله شرير تسبب في كارثة نهاية الحقبة الرابعة (الحقبة الشاحبة).' },
      ],
      events: [
        { chapter: 161, type: 'cataclysm', text: 'الإله الشرير «الموت» مذكور في سجلات صقور الليل وكتاب وحي الليل الدائم في سياق كارثة نهاية الحقبة الرابعة (الحقبة الشاحبة).',
          quote: 'صفقة مع الموت' },
        { chapter: 265, type: 'lore', text: 'أحد الآلهة الشريرة النشطة في عصر الآلهة.',
          quote: 'الموت، الشيطانة البدائية' },
      ],
      blurb_ar: 'إله شرير؛ تسبب في كارثة أنهت الحقبة الرابعة (عصر الآلهة) فعُرفت نهايتها بالحقبة الشاحبة. تعبده منظمتا النظام الثيوصوفي والأسقفية المقدسة.',
      sources: [161, 265],
    },
    {
      id: 'primordial_demoness',
      name_ar: 'الشيطانة البدائية', name_en: 'Primordial Demoness',
      kind: 'evil_god',
      first_appeared_chapter: 265, status: 'unknown',
      first_appeared_quote: 'الموت، الشيطانة البدائية',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 265, role: 'إلهة شريرة', domain: 'غير معروف',
          notes: 'إلهة شريرة نشطة في الحقبة الرابعة؛ تعبدها طائفة الشيطانة وتسيطر على مسار القاتل.' },
      ],
      events: [
        { chapter: 265, type: 'lore', text: 'أحد الآلهة الشريرة النشطة في عصر الآلهة.',
          quote: 'الموت، الشيطانة البدائية' },
      ],
      blurb_ar: 'إلهة شريرة نشطة في الحقبة الرابعة؛ تعبدها طائفة الشيطانة («عائلة الشيطانة» قديمًا) وتسيطر على مسار القاتل، وجميع كبار أتباعها من النساء.',
      sources: [265],
    },
    {
      id: 'true_creator',
      name_ar: 'الخالق الحقيقي', name_en: 'True Creator',
      kind: 'evil_god',
      first_appeared_chapter: 88, status: 'unknown',
      first_appeared_quote: 'المنظمات الخفية القليلة التي آمنت بـ الخالق الحقيقي',
      pathway: null,
      aliases: [{ name: 'الرب', since_chapter: 156 }],
      states: [
        { since_chapter: 88, role: 'إله شرير', domain: 'غير معروف',
          notes: 'كائنة يؤمن بها بعض النظم السرية الحديثة (نظام الشفق، صليب الحديد والدم).' },
      ],
      events: [
        { chapter: 88, type: 'mention', text: 'منظومات سرية قليلة تؤمن بـ«الخالق الحقيقي» ظهرت في القرنين أو الثلاثة الأخيرة.',
          quote: 'المنظمات الخفية القليلة التي آمنت بـ الخالق الحقيقي' },
        // batch-ch285: Laneves becomes a vessel of the True Creator — the manhunt target in Backlund.
        { chapter: 285, type: 'manifestation', text: 'لانيفوس يصبح وعاءً للخالق الحقيقي في باكلوند — ما يُطلق قوس انتقام كلاين ضده.',
          quote: 'الخالق الحقيقي' },
      ],
      blurb_ar: 'إله شرير تؤمن به بعض النظم السرية الحديثة (نظام الشفق، صليب الحديد والدم) التي ظهرت في القرون الأخيرة. في قوس باكلوند يصير لانيفوس وعاءً لقداسته.',
      sources: [88, 285],
    },

    // ── أباطرة الحقبة الرابعة (الثلاثة) ─────────────────────────────────────
    {
      id: 'dark_emperor',
      name_ar: 'إمبراطور الظلام', name_en: 'Dark Emperor (Solomon)',
      kind: 'emperor',
      first_appeared_chapter: 66, status: 'dead',
      first_appeared_quote: 'إمبراطور الظلام لإمبراطورية سليمان',
      pathway: { id: 'black_emperor', name_ar: 'مسار الإمبراطور الأسود' },
      aliases: [{ name: 'سليمان', since_chapter: 66 }],
      states: [
        { since_chapter: 66, role: 'إمبراطور', domain: 'إمبراطورية سليمان',
          notes: 'حاكم إمبراطورية سليمان في الحقبة الرابعة؛ أمسك مسار الإمبراطور الأسود.' },
      ],
      events: [
        { chapter: 66, type: 'mention', text: 'إمبراطور الظلام لإمبراطورية سليمان مذكور بين قوى الحقبة الرابعة العظمى.',
          quote: 'إمبراطور الظلام لإمبراطورية سليمان' },
      ],
      blurb_ar: 'حاكم إمبراطورية سليمان، إحدى الإمبراطوريات الثلاث الكبرى في الحقبة الرابعة؛ أمسك مسار الإمبراطور الأسود.',
      sources: [66],
    },
    {
      id: 'blood_emperor',
      name_ar: 'إمبراطور الدم', name_en: 'Blood Emperor (Tudor)',
      kind: 'emperor',
      first_appeared_chapter: 66, status: 'dead',
      first_appeared_quote: 'إمبراطور الظلام لإمبراطورية سليمان',
      pathway: { id: 'black_emperor', name_ar: 'مسار الإمبراطور الأسود' },
      aliases: [{ name: 'تيودور', since_chapter: 217 }],
      states: [
        { since_chapter: 66, role: 'إمبراطور', domain: 'أسرة تيودور',
          notes: 'حاكم أسرة تيودور في الحقبة الرابعة؛ أسس بدعم من عائلة أنتيغونوس، غدا نصف مجنون.' },
      ],
      events: [
        { chapter: 217, type: 'mention', text: 'إمبراطور الدم نصف المجنون لأسرة تيودور مذكور بين الأباطرة الثلاثة الباقين.',
          quote: 'إمبراطور الدم نصف المجنون لأسرة ثيودور' },
      ],
      blurb_ar: 'حاكم أسرة تيودور، إحدى الإمبراطوريات الثلاث الكبرى في الحقبة الرابعة؛ أسس بدعم من عائلة أنتيغونوس، وغدا لاحقًا نصف مجنون، وأمسك مسار الإمبراطور الأسود.',
      sources: [66, 217],
    },
    {
      id: 'night_emperor',
      name_ar: 'إمبراطور الليل', name_en: 'Night Emperor (Trancewurst)',
      kind: 'emperor',
      first_appeared_chapter: 66, status: 'dead',
      first_appeared_quote: 'إمبراطور الظلام لإمبراطورية سليمان',
      pathway: { id: 'black_emperor', name_ar: 'مسار الإمبراطور الأسود' },
      aliases: [{ name: 'ترونسوست', since_chapter: 217 }],
      states: [
        { since_chapter: 66, role: 'إمبراطور', domain: 'إمبراطورية ترونسوست',
          notes: 'حاكم إمبراطورية ترونسوست في الحقبة الرابعة؛ أمسك مسار الإمبراطور الأسود.' },
      ],
      events: [
        { chapter: 217, type: 'mention', text: 'إمبراطور الليل لإمبراطورية ترونسوست مذكور بين الأباطرة الثلاثة الباقين.',
          quote: 'إمبراطور الليل لإمبراطورية ترونسوست' },
      ],
      blurb_ar: 'حاكم إمبراطورية ترونسوست، إحدى الإمبراطوريات الثلاث الكبرى في الحقبة الرابعة؛ أمسك (مع تيودور) مسار الإمبراطور الأسود.',
      sources: [66, 217],
    },

    // ── batch-ch216-312: السيد باب (Mr. Door) — mysterious pathway-bound being ──
    {
      id: 'mr_door',
      name_ar: 'السيد باب', name_en: 'Mr. Door',
      kind: 'mystery',          // not a god/evil-god/emperor; an enigmatic pathway-bound entity
      first_appeared_chapter: 216, status: 'unknown',
      first_appeared_quote: 'السيد باب',
      pathway: null,            // linked symbolically to مسار المبتدئ (the Apprentice pathway) via the Door motif; pathway not in data/pathways.js
      aliases: [],
      states: [
        { since_chapter: 216, role: 'كيان غامض مرتبط بمسار المبتدئ', domain: 'غير معروف',
          notes: 'يُذكر في مذكرات روزيل؛ يهذي تحت القمر الكامل؛ شهد العصر الرابع، وقد يكون أكبر سنًا من السيد أزيك؛ يُشتبه أنه تسلسل 2 أو 1.' },
      ],
      events: [
        { chapter: 216, type: 'mention', text: 'أول ذكر في مذكرات روزيل — كائن يحوّطه العاصفة والظلام ويُدعى "السيد باب".',
          quote: 'السيد باب' },
        { chapter: 298, type: 'lore', text: 'كلاين يربط رمز "الباب" بالسيد باب؛ يقدّر أنه شهد العصر الرابع وقد يكون تسلسل 1 أو 2 (أكبر من أزيك).',
          quote: 'السيد باب' },
        { chapter: 312, type: 'lore', text: 'الارتباط الرمزي: منزعجو القمر المكتمل من متجاوزي مسار المبتدئ (مثل فورس) يُرجَّح أنه من صلتهم بالسيد باب الذي يهذي تحت اكتمال القمر.',
          quote: 'السيد باب' },
      ],
      blurb_ar: 'كيان غامض مرتبط رمزياً بمسار المبتدئ (الذي يحمل دلالة الباب)؛ يُذكر لأول مرة في مذكرات روزيل بوصفه محاطًا بالعاصفة والظلام. يهذي تحت اكتمال القمر، وشهد العصر الرابع — يقدّر كلاين أنه تسلسل 2 أو ربما 1 (أكبر من السيد أزيك). يُرجَّح أن قلق متجاوزي مسار المبتدئ من القمر المكتمل مرتبط به.',
      sources: [216, 297, 298, 312],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.entities;
})(typeof window !== 'undefined' ? window : globalThis);
