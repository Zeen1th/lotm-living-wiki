// data/characters.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.characters = [
    {
      id: 'klein', name_ar: 'كلاين مورتي', name_en: 'Klein Moretti',
      first_appeared_chapter: 1, status: 'alive',
      pathway: { id: 'seer', name_ar: 'مسار الرائي' },
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
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.characters;
})(typeof window !== 'undefined' ? window : globalThis);
