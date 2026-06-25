// data/characters.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.characters = [
    {
      id: 'klein', name_ar: 'كلاين مورتي', name_en: 'Klein Moretti',
      first_appeared_chapter: 1, status: 'alive',
      first_appeared_quote: 'كلاين موريتي ، مواطن من مملكة لوين',
      pathway: { id: 'seer', name_ar: 'مسار الرائي' },
      aliases: [
        // NOTE: alias الأحمق chosen at ch6 (verified); used since_chapter:6 per JSON.
        { name: 'الأحمق', since_chapter: 6,
          quote: 'الأحمق' },
        // NOTE: The EPUB spells this name as شارلوك موريارتي (not شيرلوك); corrected here.
        { name: 'شارلوك موريارتي', since_chapter: 215,
          quote: 'شارلوك موريارتي. يمكنك دعوتب شارلوك' },
      ],
      states: [
        // NOTE: Fixed — Klein is an ordinary person at ch1, not yet a Beyonder.
        { since_chapter: 1, sequence: 'غير متجاوِز (إنسان عادي)', location: 'تينغن', faction: 'لا أحد',
          notes: 'منتقل بروحٍ من عالم آخر إلى جسد كلاين.',
          quote: 'كلاين موريتي ، مواطن من مملكة لوين' },
        // batch-2: Klein takes Seer potion at ch32 and becomes a Beyonder (Seq9 المتنبئ).
        { since_chapter: 32, sequence: 'التسلسل 9: المتنبئ', location: 'تينغن', faction: 'صقور الليل',
          notes: 'تناوَل جرعة المتنبئ وأصبح متجاوزًا.',
          quote: 'أنا الآن متجاوز' },
        // batch-6: Klein takes Clown potion at ch168 (actual act); ch172 quote was retroactive reference.
        { since_chapter: 168, sequence: 'التسلسل 8: المهرج', location: 'تينغن', faction: 'نادي التاروت',
          notes: 'تناوَل جرعة المهرج وأصبح متجاوز التسلسل 8.',
          quote: 'كان يعلم أنه كان متجاوز التسلسل 8' },
      ],
      events: [
        // Milestones only (batch-1 noise trimmed per user directive).
        { chapter: 1, type: 'intro', text: 'الاستيقاظ في جسد كلاين مورتي — انتقال تشو مينغ روي من الأرض.',
          quote: 'كلاين موريتي ، مواطن من مملكة لوين' },
        { chapter: 7, text: 'تبنّى هوية كلاين موريتي بالكامل وتخلّى عن تشو مينغ روي',
          quote: 'من هذه اللحظة ، أنا كلاين' },
        { chapter: 15, text: 'وافق على الانضمام كموظف مدني لصقور الليل',
          quote: 'موظفيكم المدنيين' },
        { chapter: 21, text: 'عثر على يوميات الإمبراطور روزيل وتعلّم جوهر نظام الجرعات',
          quote: 'جوهر الجرعات' },
        // batch-2: became a Beyonder by drinking the Seer potion.
        { chapter: 32, type: 'advance', text: 'تناوَل جرعة المتنبئ وأصبح متجاوزًا من التسلسل 9',
          quote: 'أنا الآن متجاوز' },
        // batch-2: officially joined the Tingen Divination Club.
        { chapter: 48, text: 'انضمّ إلى نادي العرافة في تينغن',
          quote: 'أخطط للانضمام إلى النادي' },
        // batch-3: Nighthawk membership offer (ch77).
        { chapter: 77, type: 'faction_join_offer', text: 'عُرض على كلاين الانضمام رسمياً إلى صقور ليل مدينة تينغن.',
          quote: 'السيد كلاين موريتي، هل أنت على استعداد للانضمام رسمياً إلى صقور ليل مدينة تينغن كواحد من أعضائها' },
        // batch-3: Klein kills a Secret Order Clown (Seq-8+) in ch81.
        { chapter: 81, type: 'killing', text: 'قتل كلاين المتجاوز (المهرج ذو البدلة) من النظام السري — كان في التسلسل 8 على الأقل.',
          quote: 'لقد قتلت ببراعة متجاوز كان على الأقل في التسلسل 8' },
        // batch-3: Formal Nighthawk membership confirmed by the Holy Cathedral (ch83).
        { chapter: 83, type: 'faction_join', text: 'وافقت الكاتدرائية المقدسة على انضمام كلاين رسمياً لصقور الليل.',
          quote: 'الكاتدرائية المقدسة وافقت على الأمر. أنت الآن عضو رسمي' },
        // batch-4 R1: ch91 first clear use of hypnosis ability; ch103 kills Sirius Arapis; ch105 obtains Clown formula.
        { chapter: 91, type: 'ability_use', text: 'استخدم مهارة التنويم المغناطيسي على دييفيل لاستجواب ضحايا حرائق المصنع — أول استخدام واضح لقدرة التنويم.',
          quote: 'التنويم المغناطيسى؟' },
        { chapter: 103, type: 'killing', text: 'قتل سيريوس أرابيس (عضو نظام الشفق) أثناء مواجهة في الشارع.',
          quote: 'تم تحطيم رأس سيريوس بشكل أساسي إلى مزيج' },
        { chapter: 105, type: 'lore_acquisition', text: 'حصل على تركيبة جرعة المهرج (التسلسل 8 من مسار السيئر) عبر طقوس وساطة على جثة سيريوس.',
          quote: 'هذه هي التركيبة الثانية ، واسمها في دفتر الملاحظات هو المهرج' },
        // batch-4 R2: ch108 assignment; ch115 digesting Seer potion; ch118 completes digestion.
        { chapter: 108, type: 'assignment', text: 'كُلِّف بحراسة بوابة تشانيس في كنيسة الليل الدائم.',
          quote: 'بوابة تشانيس' },
        { chapter: 115, type: 'pathway_progress', text: 'يواصل هضم جرعة المتنبئ بعد الحصول على تركيبة جرعة المهرج (تسلسل 8).',
          quote: 'لدي تركيبة لجرعة المهرج، كل ما علي فعله الآن هو هضم جرعة المتنبئ بالكامل' },
        { chapter: 118, type: 'pathway_progress', text: 'أكمل هضم جرعة المتنبئ — زالت الأصوات والرؤى غير الطبيعية.',
          quote: 'اختفت بالفعل الأصوات التي لا يجب أن يسمعها والأشياء التي لا يجب أن يراها أثناء الانخراط في الإدراك أو الرؤية الروحية' },
        // batch-6: Actual potion consumption ch168; ch172 was a retroactive reference — replaced.
        { chapter: 168, type: 'advance', text: 'تناوَل جرعة المهرج وأصبح متجاوز التسلسل 8 (المهرج).',
          quote: 'كان يعلم أنه كان متجاوز التسلسل 8' },
        { chapter: 210, type: 'turning_point', text: 'استغلّ إنس زانغويل فوضى نهاية قوس تينغن و"قتل" كلاين ظاهريًا وأخذ رماد القديسة سيلينا؛ نجا كلاين عبر عالم الضباب الرمادي. تنتهي قصة تينغن هنا.',
          quote: 'تنتهي قصة تينغن هنا' },
        { chapter: 215, type: 'identity', text: 'ظهور هوية "شارلوك موريارتي".',
          quote: 'شارلوك موريارتي. يمكنك دعوتب شارلوك' },
      ],
      abilities: ['العرافة الدقيقة', 'خفة حركة خارقة', 'قراءة حركات الخصم', 'التحكم بتعابير الوجه'],
      relationships: [
        { id: 'audrey', type: 'زميل في النادي', since_chapter: 7 },
        { id: 'benson_moretti', type: 'أخ أكبر', since_chapter: 1,
          quote: 'كان لديه أيضا أخ أكبر وأخت صغرى' },
        { id: 'melissa_moretti', type: 'أخت صغرى', since_chapter: 1,
          quote: 'كان لديه أيضا أخ أكبر وأخت صغرى' },
        { id: 'don_smith', type: 'قائد عمله', since_chapter: 17,
          quote: 'بدعوة من دون سميث' },
      ],
      tags: ['نادي التاروت', 'الأحمق', 'بطل'],
    },
    {
      // NOTE: name_ar corrected from 'أودري هول' to 'أودري هال' (verbatim EPUB spelling).
      // first_appeared_chapter corrected from 16 → 5 (EPUB ch5/chapter4.html).
      id: 'audrey', name_ar: 'أودري هال', name_en: 'Audrey Hall',
      first_appeared_chapter: 5, status: 'alive',
      first_appeared_quote: 'جلست أودري هال أمام خزانة ملابس',
      pathway: { id: 'spectator', name_ar: 'مسار المتفرّج' },
      aliases: [
        // NOTE: alias العدالة first used at ch7 (chapter6.html); fixed from since_chapter:21.
        { name: 'العدالة', since_chapter: 7,
          quote: 'لقد قررت. تسميتي ستكون' },
      ],
      states: [
        // FIX: Audrey is not yet a Beyonder at ch5/ch7; she is a noble with no sequence.
        { since_chapter: 5, sequence: 'غير متجاوِزة (نبيلة)', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نبلاء لوين', notes: 'سيدة نبيلة بعقلٍ حادّ خلف آداب المجتمع الراقي.',
          quote: 'جلست أودري هال أمام خزانة ملابس' },
        { since_chapter: 7, sequence: 'غير متجاوِزة (نبيلة)', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'عضو نادي التاروت باسم "العدالة" — لم تتناول الجرعة بعد.',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        // batch-2: Audrey drinks the Spectator potion at ch41 and becomes a Beyonder.
        { since_chapter: 41, sequence: 'التسلسل 9: المتفرّج', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'تناولت جرعة المتفرّج وأصبحت متجاوِزة.',
          quote: 'شربت بسرعة جرعة المتفرج' },
        // batch-8: Audrey advances to Seq-8 Telepathist (المتخاطر) at ch221 via Alger's sacrifice ritual — corrected from erroneous ch235.
        { since_chapter: 221, sequence: 'التسلسل 8: المتخاطر', location: 'باكلوند - حي الإمبراطورة',
          faction: 'نادي التاروت', notes: 'ترقّت إلى التسلسل 8 عبر طقس تضحية ألجر — أول نقل ناجح بين أعضاء النادي',
          quote: 'شربت بثقة جرعة المتخاطر وتمكنت بنجاح من التغلب على مرحلة الإندماج مع خصائص التجاوز، وتحقيق تقدم' },
      ],
      events: [
        { chapter: 5, type: 'intro', text: 'الظهور الأول في الضباب الرمادي.',
          quote: 'جلست أودري هال أمام خزانة ملابس' },
        { chapter: 5, text: 'ظهرت أول مرة وسُحبت إلى الضباب الرمادي',
          quote: 'في الضباب الرمادي ، استعادت أودري هال' },
        { chapter: 7, type: 'join', text: 'الانضمام إلى نادي التاروت كـ"العدالة".',
          quote: 'الأعضاء المؤسسين لنادي التاروت' },
        { chapter: 7, text: 'اختارت لقب العدالة واقترحت تسمية نادي التاروت',
          quote: 'لقد قررت. تسميتي ستكون' },
        // batch-4 R2: ch94 paid 1000 pounds for secret-org intel; ch113 received new diary page from Forsel; ch118 near digestion complete.
        { chapter: 94, type: 'intel_purchase', text: 'دفعت 1000 جنيه لتلقي معلومات عن المنظمات السرية من الرجل المعلق في نادي التاروت.',
          quote: 'أحتاج إلى المال- ألف جنيه' },
        { chapter: 113, type: 'lore_acquisition', text: 'تلقّت صفحة جديدة من مذكرات الإمبراطور روزيل (من فورس وال) وشاركتها في تجمع التاروت.',
          quote: 'وجدت صفحة أخرى من مذكرات الإمبراطور روزيل', doc_ref: 'roselle_diary' },
        { chapter: 118, type: 'pathway_progress', text: 'قريبة من إكمال هضم جرعة المتفرّج (3-4 أسابيع متبقية).',
          quote: 'قد تحتاج إلى ثلاثة إلى أربعة أسابيع أخرى حتى تكمل' },
        { chapter: 221, type: 'advance', text: 'الارتقاء إلى التسلسل 8 المتخاطر عبر طقس تضحية ألجر (أول نقل ناجح بين أعضاء نادي التاروت).',
          quote: 'شربت بثقة جرعة المتخاطر وتمكنت بنجاح من التغلب على مرحلة الإندماج مع خصائص التجاوز، وتحقيق تقدم' },
      ],
      abilities: ['قراءة لغة الجسد', 'استشعار الأفكار السطحية', 'التواصل الذهني'],
      relationships: [{ id: 'klein', type: 'مؤسس النادي', since_chapter: 7 }],
      tags: ['نادي التاروت', 'عدالة', 'نبيلة'],
    },
    {
      // NOTE: name_ar corrected from 'ألجير ويلسون' to 'ألجر ويلسون' (EPUB spelling).
      // first_appeared_chapter corrected from 21 → 5 (chapter4.html).
      // alias 'الرجل المشنوق' corrected to 'الرجل المعلق' (EPUB spelling).
      id: 'alger', name_ar: 'ألجر ويلسون', name_en: 'Alger Wilson',
      first_appeared_chapter: 5, status: 'alive',
      first_appeared_quote: 'ألجر ويلسون على سطح السفينة',
      pathway: { id: 'sailor', name_ar: 'مسار البحّار' },
      aliases: [
        // NOTE: alias الرجل المعلق chosen at ch7 (verified); fixed from since_chapter:5.
        { name: 'الرجل المعلق', since_chapter: 7,
          quote: 'الرجل المعلق' },
      ],
      states: [
        { since_chapter: 5, sequence: 'التسلسل 7: مبارك الرياح', location: 'بحر سونيا - أرخبيل رورستيد',
          faction: 'كنيسة العواصف (سرّاً) / نادي التاروت',
          notes: 'بحّار-كاهن حذِر يبحر في سياسات بحر سونيا.',
          quote: 'ألجر ويلسون على سطح السفينة' },
      ],
      events: [
        { chapter: 5, type: 'intro', text: 'الظهور الأول في الضباب الرمادي مع أودري.',
          quote: 'ألجر ويلسون على سطح السفينة' },
        { chapter: 5, text: 'ظهر أول مرة على سفينة في بحر سونيا',
          quote: 'مركب شراعي ذاي ثلاث رؤوس' },
        { chapter: 7, text: 'اختار لقب الرجل المعلق',
          quote: 'الرجل المعلق' },
        // batch-2: Alger reveals he drowned a Psychoanalysts member to cut the info chain.
        { chapter: 60, text: 'قتل أحد أعضاء علماء النفس وكشف للنادي معلومات عن التسلسلات',
          quote: 'لقد أغرقته بيدي' },
        // batch-4 R2: ch114 asked about land of the banished gods as the sacred seat of the Twilight Order's deity.
        { chapter: 114, type: 'lore_question', text: 'سأل عن أرض الآلهة المنبوذة بوصفها المقر المقدس لمعبود نظام الشفق.',
          quote: 'أرض الآلهة المنبوذة' },
      ],
      abilities: ['القتال المائي الخارق', 'التحكم بطاقة البرق الطفيفة', 'التلاعب بالرياح والملاحة'],
      relationships: [],
      tags: ['نادي التاروت', 'الرجل المعلق', 'بحّار'],
    },
    {
      // NOTE: first_appeared_chapter corrected from 121 → 137 (chapter136.html verified).
      id: 'derrick', name_ar: 'ديريك بيرغ', name_en: 'Derrick Berg',
      first_appeared_chapter: 137, status: 'alive',
      first_appeared_quote: 'وقف ديريك أمام مجموعة من السلالم',
      pathway: { id: 'sun', name_ar: 'مسار الشمس' },
      aliases: [
        // NOTE: alias 'الشمس' re-anchored to ch137 quote that ties Derrick to Sun pathway
        { name: 'الشمس', since_chapter: 137,
          quote: 'أريد أن أصبح الشمس' },
      ],
      states: [
        { since_chapter: 137, sequence: 'التسلسل ?: الشمس', location: 'مدينة الفضة - أرض الآلهة المهجورة',
          faction: 'مدينة الفضة', notes: 'جندي من مدينة الفضة، أُجبر على قتل والديه لوقف تحوّلهما إلى أرواح شريرة.',
          quote: 'أريد أن أصبح الشمس' },
        { since_chapter: 139, sequence: 'التسلسل 9: الشاعر الملحمي', location: 'مدينة الفضة - أرض الآلهة المهجورة',
          faction: 'نادي التاروت', notes: 'انضمّ إلى نادي التاروت بورقة الشمس بعد أن طلب جرعة بداية مسار الشمس.',
          quote: 'لقد تمكنت من تجنيد عضو آخر' },
      ],
      events: [
        // batch-5: Derrick introduced in Silver City (the Forsaken Land). Forced to kill his parents to stop them turning into evil spirits.
        { chapter: 137, type: 'intro', text: 'الظهور الأول في مدينة الفضة — أُجبر على قتل والديه لوقف تحوّلهما إلى أرواح شريرة (صدمته التأسيسية).',
          quote: 'شعب الظلام الذين نبذهم الإله' },
        // batch-5: Derrick prays/reaches Klein above the mist and asks to become the Sun.
        { chapter: 137, type: 'sun_pathway_request', text: 'صلّى/تواصل مع كلاين (الأحمق) فوق الضباب وطلب أن يصبح الشمس.',
          quote: 'أريد أن أصبح الشمس' },
        // batch-5: Formally recruited to Tarot Club as the Sun card.
        { chapter: 139, type: 'join', text: 'جُنِّد رسمياً في نادي التاروت كورقة الشمس.',
          quote: 'لقد تمكنت من تجنيد عضو آخر' },
        // batch-5: Reveals a member of Silver City's Council of Six is a Shepherd.
        { chapter: 146, type: 'major_reveal', text: 'كشف أن أحد أعضاء مجلس الستة في مدينة الفضة هو "راعٍ" — متجاوز من مسار متوسل الأسرار/المستمع.',
          quote: 'الراعي!' },
      ],
      abilities: ['ضوء مقدّس', 'أمل لا يُكسر'],
      relationships: [
        { id: 'klein', type: 'مرشد في نادي التاروت (الأحمق)', since_chapter: 137,
          quote: 'أريد أن أصبح الشمس' },
      ],
      tags: ['مدينة الفضة', 'الشمس', 'نادي التاروت'],
      blurb_ar: 'ديريك بيرغ — شاب من مدينة الفضة (الأرض المهجورة) حيث لا شمس ولا قمر. أُجبر في صدمة مؤسِّسة على قتل والديه لإيقاف تحوّلهما إلى أرواح شريرة. طلب من كلاين أن يصبح الشمس، وانضمّ إلى نادي التاروت حاملاً ورقة الشمس.',
      sources: [137, 139, 146],
    },
    {
      id: 'benson_moretti', name_ar: 'بينسون موريتي', name_en: 'Benson Moretti',
      first_appeared_chapter: 4, status: 'alive',
      first_appeared_quote: 'شقيق كلاين ، بينسون',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 4, location: 'تينغن', faction: 'مدني',
          quote: 'شقيق كلاين ، بينسون' },
      ],
      events: [],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'أخو كلاين الأكبر.',
      sources: [4],
    },
    {
      id: 'melissa_moretti', name_ar: 'ميليسا موريتي', name_en: 'Melissa Moretti',
      first_appeared_chapter: 3, status: 'alive',
      first_appeared_quote: 'ميليسا إستيقظت',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 3, location: 'تينغن', faction: 'مدني',
          quote: 'ميليسا إستيقظت' },
      ],
      events: [],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'أخت كلاين الصغرى، طالبة في تينغن.',
      sources: [3],
    },
    {
      id: 'don_smith', name_ar: 'دون سميث', name_en: 'Don Smith',
      first_appeared_chapter: 12, status: 'alive', death_chapter: 209,
      first_appeared_quote: 'دون سميث',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 12, location: 'تينغن', faction: 'صقور الليل',
          quote: 'دون سميث' },
      ],
      events: [
        { chapter: 209, type: 'death', text: 'ضحّى بقلبه لإيقاف طفلٍ إلهٍ شرير وتُوفّي — ذروة قوس تينغن',
          quote: 'سحب يده اليمنى بسرعة' },
      ],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'قائد فريق صقور الليل في تينغن، يتحكم في الأحلام.',
      sources: [12, 209],
    },
    {
      id: 'emperor_roselle', name_ar: 'الإمبراطور روزيل', name_en: 'Emperor Roselle',
      first_appeared_chapter: 21, status: 'alive',
      first_appeared_quote: 'الإمبراطور روزيل',
      pathway: { id: 'spectator', name_ar: 'مسار المتفرّج' },
      aliases: [],
      states: [
        { since_chapter: 21, location: null, faction: 'إمبراطورية سابقة',
          quote: 'الإمبراطور روزيل' },
      ],
      events: [
        // batch-2: from his diary — born in Intis, offered Spectator pathway by the Church of the Crafts God.
        { chapter: 59, text: 'من مذكراته: وُلد في مملكة إنتيس؛ أعطته كنيسة إله الحرفيين خيار مسار العبقري (المتفرّج) أو باحث الغموض',
          quote: 'أعطتني كنيسة إله الحرفيين خيارين', doc_ref: 'roselle_diary' },
        { chapter: 59, text: 'من مذكراته: اختار مسار العبقري (المتفرّج لاحقاً) لكونه مساراً كاملاً',
          quote: 'لقد كان خياري سهلاً: العبقري', doc_ref: 'roselle_diary' },
        // batch-4 R1: ch104 — fate-web/Antigonos reveal: Roselle steered toward Seer path by Zaratool; links Klein's notebook to Antigonos lineage.
        { chapter: 104, type: 'fate_web', text: 'كُشف أن مسار روزيل نحو تسلسل المتنبئ كان بتأثير زاراتول قائد النظام السري — شبكة قدر تجمع روزيل وكلاين عبر مسار أنتيغونوس.',
          quote: 'انحاز الإمبراطور روزيل نحو تسلسل المتنبئ بسبب السيد الغامض زاراتول', doc_ref: 'roselle_diary' },
      ],
      relationships: [],
      abilities: [],
      tags: [],
      blurb_ar: 'إمبراطور سابق من أصل أرضي، وُلد في إنتيس؛ اختار مسار المتفرّج/العبقري من كنيسة إله الصُنّاع. يومياته مصدر نادر عن نظام الجرعات.',
      sources: [21, 59],
    },
    {
      id: 'ence_zangwill', name_ar: 'إنس زانغويل', name_en: 'Ince Zangwill',
      first_appeared_chapter: 210, status: 'alive',
      first_appeared_quote: 'على الرغم من أن الأمور تجاوزت بالفعل وصف إنس زانغويل',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 210, sequence: 'التسلسل 4: مراقب الليل', location: 'تينغن',
          faction: 'مسار الليل الدائم',
          quote: 'مراقب الليل' },
      ],
      events: [
        { chapter: 210, type: 'advance', text: 'تقدّم من التسلسل 5 (حارس البوابة) إلى التسلسل 4 (مراقب الليل) وأصبح نصف إله بعد أخذ رماد القديسة سيلينا',
          quote: 'أخذ رماد القديسة سيلينا' },
      ],
      relationships: [],
      abilities: [],
      tags: ['عدو', 'نصف إله', 'مسار الليل الدائم'],
      blurb_ar: 'متجاوز من مسار الليل الدائم؛ استغلّ نهاية قوس تينغن ليتقدّم إلى التسلسل 4 ويصبح نصف إله، و"قتل" كلاين ظاهريًا.',
      sources: [210],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.characters;
})(typeof window !== 'undefined' ? window : globalThis);
