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
      first_appeared_quote: 'نادي التاروت',
      states: [
        {
          since_chapter: 7,
          blurb_ar: 'تجمّع سري للمتعالين يلتقون فوق الضباب الرمادي بقيادة "الأحمق".',
          leader_id: 'klein',
          hq_location_id: null,
          quote: 'نادي التاروت',
        },
      ],
      member_ids: ['klein', 'audrey', 'alger'],
      events: [
        { chapter: 7, text: 'تأسيس نادي التاروت رسمياً.',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
      ],
      sources: [7],
    },
    {
      id: 'secret_order',
      name_ar: 'النظام السري',
      name_en: 'Secret Order',
      kind: 'sect',
      first_appeared_chapter: 28,
      first_appeared_quote: 'النظام السري',
      states: [
        {
          since_chapter: 28,
          blurb_ar: 'تنظيم سري يعمل في الخفاء داخل مملكة لوين.',
          leader_id: null,
          hq_location_id: 'backlund',
          quote: 'النظام السري',
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
      member_ids: [],
      events: [],
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
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.organizations;
})(typeof window !== 'undefined' ? window : globalThis);
