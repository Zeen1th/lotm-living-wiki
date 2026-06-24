// data/locations.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.locations = [
    // ── Regions ──
    {
      // NOTE: EPUB spells this name as 'فينابوتر' (ب not پ); name_ar corrected.
      // first_appeared_chapter corrected from 9 → 4 (chapter3.html verified).
      id: 'feynapotter',
      name_ar: 'فينابوتر',
      name_en: 'Feynapotter',
      kind: 'region',
      parent_id: null,
      map: { cx: 480, cy: 84, poly: '390,70 560,55 576,100 400,110' },
      first_appeared_chapter: 4,
      first_appeared_quote: 'فينابوتر',
      states: [
        { since_chapter: 4, blurb_ar: 'شريط جليدي يتوّج القارة الشمالية، حدوده محلّ تنازع دائم.' },
      ],
      contains_ids: [],
      sources: [4],
    },
    {
      id: 'intis',
      name_ar: 'جمهورية إنتيس',
      name_en: 'Intis Republic',
      kind: 'region',
      parent_id: null,
      map: { cx: 248, cy: 212, poly: '150,150 250,120 342,142 362,212 322,300 222,312 162,262 140,200' },
      first_appeared_chapter: 4,
      first_appeared_quote: 'إنتيس',
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
      first_appeared_chapter: 1,
      first_appeared_quote: 'مملكة لوين',
      states: [
        { since_chapter: 1, blurb_ar: 'مملكة جزيرية تعصف بها الضبابة والبخار، قلبها مدينة باكلوند.' },
      ],
      contains_ids: ['backlund'],
      sources: [1, 3],
    },
    {
      // NOTE: 'فيساك' (Feysac) not found in EPUB ≤ch250; the EPUB uses 'فيزاك'.
      // name_ar updated to إمبراطورية فيزاك; first_appeared_chapter updated to 4.
      id: 'feysac',
      name_ar: 'إمبراطورية فيزاك',
      name_en: 'Feysac Empire',
      kind: 'region',
      parent_id: null,
      map: { cx: 696, cy: 206, poly: '580,110 700,94 812,130 822,232 742,302 620,302 576,222' },
      first_appeared_chapter: 4,
      first_appeared_quote: 'إمبراطورية فيزاك',
      states: [
        { since_chapter: 4, blurb_ar: 'إمبراطورية حربية في الشرق، مكرّسة لإله القتال.' },
      ],
      contains_ids: [],
      sources: [4],
    },
    {
      // NOTE: first_appeared_quote corrected to 'القارة الجنوبية' (ch4 verified); prior quote 'مملكة لوين' was off-topic.
      id: 'southern',
      name_ar: 'القارة الجنوبية',
      name_en: 'Southern Continent',
      kind: 'region',
      parent_id: null,
      map: { cx: 505, cy: 505, poly: '232,442 420,420 600,425 782,452 760,562 560,592 360,586 242,540' },
      first_appeared_chapter: 4,
      first_appeared_quote: 'القارة الجنوبية',
      states: [
        { since_chapter: 4, blurb_ar: 'قارة مفصولة عن الشمال ببحر العواصف؛ أراضٍ مجهولة وآلهة مختلفة.' },
      ],
      contains_ids: [],
      sources: [4],
    },
    {
      // NOTE: 'أرض الآلهة المهجورة' as full phrase not found ≤ch250 in this EPUB.
      // Using 'المهجورة' (verified in ch135) as the first_appeared_quote.
      id: 'forsaken',
      name_ar: 'أرض الآلهة المهجورة',
      name_en: 'Forsaken Land of the Gods',
      kind: 'region',
      parent_id: null,
      map: { cx: 914, cy: 400, poly: '862,140 962,128 978,300 950,502 876,512 852,332' },
      first_appeared_chapter: 135,
      first_appeared_quote: 'المهجورة',
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
      first_appeared_chapter: 59,
      first_appeared_quote: 'بحر الضباب',
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
      first_appeared_chapter: 5,
      first_appeared_quote: 'بحر سونيا',
      states: [
        { since_chapter: 5, blurb_ar: 'مياه دافئة شرقي لوين تعجّ بالقراصنة والمهرّبين وكنيسة العاصفة.' },
      ],
      contains_ids: ['rorsted'],
      sources: [5, 21],
    },
    {
      // NOTE: 'بحر العواصف' not found verbatim in EPUB ≤ch250; first_appeared_quote dropped.
      id: 'berserksea',
      name_ar: 'بحر العواصف',
      name_en: 'Berserk Sea',
      kind: 'sea',
      parent_id: null,
      map: { cx: 500, cy: 376 },
      first_appeared_chapter: 4,
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
      first_appeared_chapter: 3,
      first_appeared_quote: 'باكلوند',
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
      first_appeared_chapter: 1,
      first_appeared_quote: 'تينغن',
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
      first_appeared_chapter: 92,
      first_appeared_quote: 'أرخبيل رورستيد',
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
      first_appeared_chapter: 137,
      first_appeared_quote: 'مدينة الفضة',
      states: [
        { since_chapter: 137, blurb_ar: 'معقل منفرد محاط بالصواعق والوحوش في أرض الآلهة المهجورة.' },
      ],
      contains_ids: [],
      sources: [137],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.locations;
})(typeof window !== 'undefined' ? window : globalThis);
