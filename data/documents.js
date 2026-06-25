// data/documents.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.documents = [
    {
      // NOTE: first_appeared_chapter corrected from 9 → 20; ch9 'مذكرات' refers to Klein's own note-taking.
      // ch20 (chapter19.html) has the first explicit reference to Roselle's diary, verbatim verified.
      id: 'roselle_diary',
      name_ar: 'مذكرات روزيل',
      name_en: "Roselle's Diary",
      kind: 'diary',
      first_appeared_chapter: 20,
      first_appeared_quote: 'مذكرات روزيل غوستاف المفقودة قبل وفاته',
      blurb_ar: 'مذكرات روزيل غوستا، قنصل جمهورية إنتيس السابق ومخترع المحرك البخاري. تحتوي على معارف خفيّة عن الحقب الماضية.',
      entries: [
        // batch-3: ch65 — genuine diary fragment; Klein reads pages about Roselle's path choice.
        // Zaratool reminded Roselle of something that shaped his Seer-path decision.
        { chapter: 65, topic_ar: 'زاراتول وتأثيره على مسار روزيل',
          text: 'مقتطف من المذكرات: يُشير روزيل إلى شخصية غامضة تُدعى زاراتول أثّرت في تمثيله وقراره باتخاذ مسار الرائي.',
          quote: 'جاء تمثيل روزيل من تذكير من الشخصية الغامضة المعروف باسم زاراتول' },
        // batch-4 R1: ch93 — genuine diary entries; Roselle reflects on joining the Church of the Crafts God.
        { chapter: 93, topic_ar: 'انضمام روزيل لكنيسة إله الحرف',
          text: 'روزيل يتساءل إن كان قد انضم لمنظمة ضعيفة، لكنه يقرر أن قطعة ورق بيضاء تُنتج أفضل اللوحات',
          quote: 'انضممت إلى منظمة بدون مستقبل؟' },
        { chapter: 93, topic_ar: 'التحف المختومة لكنيسة إله الحرف',
          text: 'روزيل يلاحظ أن كنيسة إله الحرف تمتلك أقل عدد من التحف المختومة وأقلها خطورة من بين الكنائس السبع',
          quote: 'إله الحرف يحمل أقل عدد من التحف الأثرية المختومة' },
        { chapter: 93, topic_ar: 'لقاء روزيل بزاراتول — زعيم النظام السري',
          text: 'روزيل يكتشف أن السيد زاراتول الغامض هو زعيم النظام السري القديم',
          quote: 'رأيت ذلك السيد الغامض زاراتول مرة أخرى. لم أتوقع منه أن يكون زعيم منظمة قديمة، النظام السري!' },
        // batch-4 R2: ch114 — genuine diary entries; Roselle contemplates sequence advancement and a shadowy ancient org.
        { chapter: 114, topic_ar: 'ترقية التسلسل وغياب النفط الخام',
          text: 'روزيل يتخلى عن التفكير في النفط الخام ويقرر التركيز على ترقية مستوى تسلسله، ثم يفكر في الانضمام إلى منظمة قديمة غامضة تؤثر على العالم من الظل',
          quote: 'ترقية مستوى التسلسل هو ما يهم' },
        { chapter: 114, topic_ar: 'منظمة غامضة قديمة',
          text: 'روزيل يفكر في الانضمام إلى منظمة قديمة وغامضة تؤثر على العالم من الظل كبديل لكنيسة إله الحرف اليدوية',
          quote: 'يمكنني الانضمام إلى تلك المنظمة القديمة والغامضة التي تؤثر على العالم من الظل' },
        // batch-5 R2: ch144 — genuine diary entries: cross-substitution of sequences after Seq5.
        { chapter: 144, topic_ar: 'سر الاستبدال بين مسارات التسلسل',
          text: 'مذكرات روزيل: 8 نوفمبر — طلب رئيس أساقفة فان إستين مساعدته. 9 نوفمبر — أخبره أنه بعد تسلسل 5 يمكن استبدال التسلسلات بأخرى من مسار أو مسارين متوافقَين، يبدأ من التسلسلات الوسطى. الاستبدال الخاطئ = نصف الجنون.',
          quote: 'يمكن استبدال بقية التسلسلات بتسلسلات من نفس المستوى من مسار واحد أو مسارين آخرين' },
        { chapter: 144, topic_ar: 'مسارات قابلة للتبادل في التسلسلات العليا',
          text: 'مسارات اللانائم وجامع الجثث قابلة للتبادل، وكذلك العلّامة وباحث الغموض في التسلسلات العليا.',
          quote: 'مسارات اللانائم و جامع الجثث. نعم، يمكن أيضًا لمسارات العلّامة و باحث الغموض الخاصة بالكنيسة الاستبدال مع بعضها البعض في تسلسلات العليا' },
      ],
      sources: [4, 20],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.documents;
})(typeof window !== 'undefined' ? window : globalThis);
