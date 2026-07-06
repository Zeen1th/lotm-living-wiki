// data/meta.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.meta = {
    title_ar: 'سيد الألغاز — موسوعة حية',
    encodedThroughChapter: 279,
    volumes: [
      { id: 'v1', name_ar: 'المجلد الأول: المتنبئ القرمزي', start_chapter: 1,   end_chapter: 206 },
      { id: 'v2', name_ar: 'المجلد الثاني: وجه مشوه', start_chapter: 207, end_chapter: 279 },
    ],
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = L.meta;
})(typeof window !== 'undefined' ? window : globalThis);
