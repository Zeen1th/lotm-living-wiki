// data/glossary.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.glossary = [
    {
      id: 'gloss_pathway',
      term_ar: 'مسار',
      def_ar: 'سلسلة من تسعة تسلسلات تحديد قدرات المتعالي، كلٌّ منها يمنح قدرات وشخصية مختلفة.',
      // 'مسار' first appears in EPUB at ch4 (chapter3.html); ch1 has no pathway term.
      first_appeared_chapter: 4,
      first_appeared_quote: 'مسار',
      ref: { kind: 'collection', id: 'pathways' },
      sources: [4],
    },
    {
      id: 'gloss_sequence',
      term_ar: 'تسلسل',
      def_ar: 'مستوى التطوّر ضمن المسار؛ يتراوح من التسلسل 9 (الأدنى) إلى التسلسل 0 (الأعلى).',
      // 'تسلسل' first appears in EPUB at ch5 (chapter4.html).
      first_appeared_chapter: 5,
      first_appeared_quote: 'تسلسل',
      ref: null,
      sources: [5],
    },
    {
      id: 'gloss_beyonder',
      term_ar: 'المتجاوز / الخارق',
      def_ar: 'إنسان اكتسب قدرات تتجاوز الحدود البشرية العادية عبر تناول معجون التسلسل.',
      // 'متجاوز' first appears at ch6 (chapter5.html). Note: Arabic text uses متجاوز not متعالي.
      first_appeared_chapter: 6,
      first_appeared_quote: 'متجاوز',
      ref: null,
      sources: [6],
    },
    {
      id: 'gloss_gray_fog',
      term_ar: 'الضباب الرمادي',
      def_ar: 'بُعد غامض فوق الواقع يتخذه كلاين مكاناً للتجمّع والتشاور والاستفسار.',
      first_appeared_chapter: 5,
      first_appeared_quote: 'الضباب الرمادي',
      ref: null,
      sources: [5],
    },
    {
      id: 'gloss_tarot',
      term_ar: 'بطاقة التاروت',
      def_ar: 'بطاقات تكهّن ذات رمزية مرتبطة بالمسارات؛ يعتمد عليها نادي التاروت كرموز هوية لأعضائه.',
      first_appeared_chapter: 5,
      first_appeared_quote: 'الرجل المعلق',
      ref: { kind: 'organization', id: 'tarot_club' },
      sources: [5, 7],
    },
    // batch-2: Blasphemy Slate — first mentioned at ch60.
    {
      id: 'gloss_blasphemy_slate',
      term_ar: 'لوح الكفر',
      def_ar: 'لوحٌ يُقال إنه يحوي أسرار مسارات التجاوز الاثنين والعشرين',
      first_appeared_chapter: 60,
      first_appeared_quote: 'لوح الكفر تحتوي على ألغاز عميقة للمسارات الإثنين والعشرين الإلهية',
      ref: null,
      sources: [60],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.glossary;
})(typeof window !== 'undefined' ? window : globalThis);
