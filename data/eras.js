// data/eras.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.eras = [
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
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.eras;
})(typeof window !== 'undefined' ? window : globalThis);
