// data/organizations.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.organizations = [
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
          hq_location_id: null, // soniasea (ch5) > church_storms (ch3); no spoiler-safe HQ within ch.250
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
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.organizations;
})(typeof window !== 'undefined' ? window : globalThis);
