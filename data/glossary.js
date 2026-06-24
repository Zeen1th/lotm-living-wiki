// data/glossary.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.glossary = [
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
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.glossary;
})(typeof window !== 'undefined' ? window : globalThis);
