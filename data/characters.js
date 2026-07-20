// data/characters.js
(function (g) {
  const L = (g.LOTM = g.LOTM || {});
  L.characters = [
    {
      id: 'klein',
      image: 'characters/klein.webp', name_ar: 'كلاين مورتي', name_en: 'Klein Moretti',
      first_appeared_chapter: 1, status: 'alive',
      first_appeared_quote: 'كلاين موريتي ، مواطن من مملكة لوين',
      pathway: { id: 'seer', name_ar: 'مسار المتنبئ' },
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
        // batch-ch280: moved to Backlund as "Sherlock Moriarty", still Seq-8 Clown.
        { since_chapter: 280, sequence: 'التسلسل 8: المهرج', location: 'باكلوند - 15 شارع مينسك (قسم شاروود)',
          faction: 'نادي التاروت',
          notes: 'انتقل إلى باكلوند وعمل محققاً خاصاً بهوية "شارلوك موريارتي".',
          quote: 'شارع مينسك' },
        // batch-ch296: consumed the Magician potion, advanced to Seq-7.
        { since_chapter: 296, sequence: 'التسلسل 7: لاعب الخفة', location: 'باكلوند - 15 شارع مينسك (قسم شاروود)',
          faction: 'نادي التاروت',
          notes: 'تناوَل جرعة لاعب الخفة وأصبح متجاوز التسلسل 7.',
          quote: 'لاعب الخفة' },
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
        // batch-X: ch251 — Klein kills Rosago (Seq-5 Puppeteer) with Miss Bodyguard + Language of Malice talisman; obtains Seer Seq7/6/5 formulas
        { chapter: 251, type: 'killing', text: 'قتل روزاغوا (المتحكم في الدمى، التسلسل 5 من مسار المتنبئ) عبر تميمة لغة السوء ومساعدة "الأنسة حارس شخصي" — أول لقاء مع متجاوز تسلسل 5.',
          quote: 'التسلسل 5، المتحكم في الدمى' },
        { chapter: 251, type: 'lore_acquisition', text: 'حصل على تركيبات جرعات التسلسل 7 (لاعب الخفة) والتسلسل 6 (عديم الوجه) والتسلسل 5 (المتحكم في الدمى) من مسار المتنبئ عبر عرافة الحلم على جثة روزاغوا.',
          quote: 'التسلسل 7، لاعب الخفة' },
        // batch-ch280: Klein begins Backlund life as Sherlock Moriarty; opens the revenge arc vs the True Creator.
        { chapter: 280, type: 'turning_point', text: 'الخطوة الأولى في باكلوند بهوية المحقق موريارتي — بداية قوس الانتقام ضد الخالق الحقيقي (خلف وفاة القائد دون سميث).',
          quote: 'شارع مينسك' },
        // batch-ch285/287: Laneves (True Creator vessel) manhunt; clown-mask sewer duel.
        { chapter: 285, type: 'investigation', text: 'مطاردة لانيفوس (الخائن وعاء الخالق الحقيقي) في باكلوند بالاشتراك مع صقور الليل والعدالة والشمس.',
          quote: 'لانيفوس' },
        { chapter: 287, type: 'combat', text: 'مواجهة قاتلة في المجاري ضد لانيفوس؛ يفلت من صقور الليل لكن كلاين (بقناع المهرج) يتربص به.',
          quote: 'لانيفوس' },
        // batch-ch296: Magician advancement.
        { chapter: 296, type: 'advance', text: 'تناوَل جرعة لاعب الخفة وأصبح متجاوز التسلسل 7 — نقل الأضرار، القفزة الملتهبة، رصاص الهواء، بدائل الدمى الورقية، خلق الأوهام.',
          quote: 'لاعب الخفة' },
        // batch-ch311: Tarot Club inducts Fors as "Magician".
        { chapter: 311, type: 'faction_event', text: 'ضمّ "الساحر" فورس إلى نادي التاروت كعضو جديد (التسلسل 9 من مسار الباب).',
          quote: 'الساحر' },
        // batch-ch323: Blasphemy Slate heist at the Roselle Memorial Exhibition.
        { chapter: 323, type: 'lore_acquisition', text: 'سرق بطاقة الكفر من معرض روزيل التذكاري بالمتحف الملكي؛ فُكّ ختمها بالتعويذة "برناديت" (بلغة فيزاك القديمة).',
          quote: 'بطاقة الكفر' },
      ],
      abilities: ['العرافة الدقيقة', 'خفة حركة خارقة', 'قراءة حركات الخصم', 'التحكم بتعابير الوجه'],
      relationships: [
        { id: 'audrey', type: 'زميل في النادي', since_chapter: 7 },
        { id: 'don_smith', type: 'قائد عمله', since_chapter: 17,
          quote: 'بدعوة من دون سميث' },
      ],
      tags: ['نادي التاروت', 'الأحمق', 'بطل'],
    },
    {
      // NOTE: name_ar corrected from 'أودري هول' to 'أودري هال' (verbatim EPUB spelling).
      // first_appeared_chapter corrected from 16 → 5 (EPUB ch5/chapter4.html).
      id: 'audrey',
      image: 'characters/audrey.webp', name_ar: 'أودري هال', name_en: 'Audrey Hall',
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
        { chapter: 254, type: 'major_event', text: 'تأكيد نجاح اغتيال السفير باكلاند عبر الصحيفة — فرح لكن خائفة من وحشية السيد A ونظام الشفق.',
          quote: 'نجح السيد A' },
        { chapter: 254, type: 'intel', text: 'سددت الدفعة المتبقية 8000 جنيه عبر شيو وفورس بناءً على تعليمات السيد A بإيداعها في حسابات بنكية مجهولة.',
          quote: 'السيد A' },
        // batch-ch317: Audrey aids Klein at the Roselle Memorial Exhibition (Blasphemy Slate heist setup).
        { chapter: 317, type: 'mission', text: 'ساعدت كلاين في التحقق من حامل صفحة روزيل في معرض روزيل التذكاري بالمتحف الملكي (تمهيداً لسرقة بطاقة الكفر).',
          quote: 'معرض روزيل' },
      ],
      abilities: ['قراءة لغة الجسد', 'استشعار الأفكار السطحية', 'التواصل الذهني'],
      relationships: [{ id: 'klein', type: 'مؤسس النادي', since_chapter: 7 }],
      tags: ['نادي التاروت', 'عدالة', 'نبيلة'],
    },
    {
      // NOTE: name_ar corrected from 'ألجير ويلسون' to 'ألجر ويلسون' (EPUB spelling).
      // first_appeared_chapter corrected from 21 → 5 (chapter4.html).
      // alias 'الرجل المشنوق' corrected to 'الرجل المعلق' (EPUB spelling).
      id: 'alger',
      image: 'characters/alger.webp', name_ar: 'ألجر ويلسون', name_en: 'Alger Wilson',
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
      id: 'derrick',
      image: 'characters/derrick.webp', name_ar: 'ديريك بيرغ', name_en: 'Derrick Berg',
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
        // batch-ch313: Derek studies the ancient gods and their links to the current orthodox gods.
        { chapter: 313, type: 'lore', text: 'بحث في الآلهة القديمة وصلتها بالآلهة الأرثوذكسية الحالية (دراسة من مكتبة مدينة الفضة).',
          quote: 'الألهة القديمة' },
        // batch-ch315: Derek grows concerned about Elder Lovia (Council of Six) being on the True Creator's pathway.
        { chapter: 315, type: 'reveal', text: 'قلقه من أن الشيخ لوفيا (عضو مجلس الستة) على مسار الخالق الحقيقي وتهديد لمدينة الفضة.',
          quote: 'الشيخ لوفيا' },
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
      id: 'don_smith',
      image: 'characters/don_smith.webp', name_ar: 'دون سميث', name_en: 'Don Smith',
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
      id: 'emperor_roselle',
      image: 'characters/emperor_roselle.webp', name_ar: 'الإمبراطور روزيل', name_en: 'Emperor Roselle',
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
      id: 'ence_zangwill',
      image: 'characters/ence_zangwill.webp', name_ar: 'إنس زانغويل', name_en: 'Ince Zangwill',
      first_appeared_chapter: 210, status: 'alive',
      first_appeared_quote: 'على الرغم من أن الأمور تجاوزت بالفعل وصف إنس زانغويل',
      pathway: { id: 'sleepless', name_ar: 'مسار الليل الدائم' },
      aliases: [],
      states: [
        { since_chapter: 210, sequence: 'التسلسل 4: مراقب الليل', location: 'تينغن',
          faction: 'مسار الليل الدائم',
          quote: 'مراقب الليل' },
      ],
      events: [
        // ch210: the scheme's payoff — advancement and apparent kill of Klein
        { chapter: 210, type: 'advance', text: 'تقدّم من التسلسل 5 (حارس البوابة) إلى التسلسل 4 (مراقب الليل) وأصبح نصف إله بعد أخذ رماد القديسة سيلينا',
          quote: 'أخذ رماد القديسة سيلينا' },
        { chapter: 210, type: 'scheme_complete', text: 'نجحت خطته التي دبّرها بأكملها: دفع سلسلة أحداث تينغن نحو تحقيق غايته من الحصول على رماد القديسة سيلينا.',
          quote: 'وقد سار ذلك تمامًا مع نوايا إنس زانغويل' },
        // ch212: Klein's divination confirms Ince orchestrated everything
        { chapter: 212, type: 'reveal', text: 'عرافة كلاين تؤكد أن إنس زانغويل خطّط فعلاً لسلسلة الأحداث بأكملها للحصول على رماد القديسة سيلينا والتقدّم إلى التسلسل 4.',
          quote: 'هذا يعني أن إنس زانغويل قد خطط بالفعل لسلسلة الأحداث من أجل الحصول على رماد القديسة سيلينا، للتقدم إلى التسلسل 4' },
        { chapter: 212, type: 'reveal', text: 'بوصفه رئيسَ أساقفة سابقاً لكنيسة الليل الدائم، كان يعرف بالضبط المكوّنات المطلوبة لطقس التسلسل 4، مما مكّنه من تصميم المخطط بدقة.',
          quote: 'إنس زانغويل، الذي كان رئيس أساقفة سابق، كان تعرف بالضبط أيها كانت، وكان يعرف بالتأكيد المكونات التكميلية المطلوبه' },
      ],
      relationships: [],
      abilities: [],
      tags: ['عدو', 'العقل المدبّر للمجلد الأول', 'مسار الليل الدائم', 'نصف إله'],
      blurb_ar: 'العقل المدبّر الحقيقي للمجلد الأول — رئيس أساقفة سابق خان كنيسة الليل الدائم. هندس بأكمله قوسَ تينغن عبر التحفة الأثرية المختومة 0.08 (ريشة تكتب أحداثاً مقدَّرة يتبعها الناس لاشعورياً)، وأوصل الأمور حتى حصل على رماد القديسة سيلينا وتقدّم إلى التسلسل 4 ليصبح نصف إله.',
      sources: [210, 211, 212],
    },
    {
      // batch-8: Mr. A — Seq-6 Rose Bishop (Secrets pathway); hired assassin who kills Ambassador Buckland at ch249.
      id: 'mr_a', name_ar: 'السيد A', name_en: 'Mr. A',
      first_appeared_chapter: 245, status: 'alive',
      first_appeared_quote: 'السيد A',
      pathway: null,
      aliases: [],
      states: [
        // Rank explicitly confirmed at ch249 in the text; first hired at ch245.
        { since_chapter: 249, sequence: 'التسلسل 6: أسقف الورود', location: 'باكلوند',
          faction: null,
          notes: 'وسيط ومرتزق في الأوساط السرية في باكلوند؛ قادر على الاختباء داخل أجساد الآخرين.',
          quote: 'التسلسل 6 لمسار متوسل الأسرار، أسقف الورود' },
      ],
      events: [
        { chapter: 245, type: 'intro', text: 'توظيفه من قِبل أودري/شيو لاغتيال السفير باكلاند مقابل 10,000 جنيه ذهبي أو تركيبات مسار',
          quote: 'السيد A' },
        { chapter: 249, type: 'major_event', text: 'اغتيال السفير باكلاند (التسلسل 6 متآمر، مسار الصياد) ورئيس استخبارات إنتيس في لوين',
          quote: 'اختفت العزلة التي خلقها مع موته' },
        // batch-X: ch254 — Mr. A revealed as a member of the Twilight Order
        { chapter: 254, type: 'reveal', text: 'كشف أنه من نظام الشفق (Twilight Order); يخطط لإحداث فوضى في القارة استعداداً لعودة "الرب".',
          quote: 'سنسبب الفوضى في جميع أنحاء القارة، ونبذل قصارى جهدنا لجذب انتباه الآخرين، ونستخدم ذلك للترحيب بعودة لوردنا' },
      ],
      relationships: [],
      abilities: ['الاختباء داخل أجساد الآخرين'],
      tags: ['مرتزق', 'باكلوند', 'مسار متوسل الأسرار'],
      blurb_ar: 'السيد A — متجاوز التسلسل 6 (أسقف الورود) من مسار متوسل الأسرار؛ وسيط ومرتزق في باكلوند. وُظِّف من أودري لاغتيال السفير باكلاند رئيس استخبارات إنتيس في لوين.',
      sources: [245, 249],
    },
    {
      // gap-batch: Azik — high-Sequence mystery figure; amnesiac professor at Khoy University,
      // best friend of Klein's mentor Cohen Quentin. No explicit pathway/sequence named through
      // ch279 (text gives only relative descriptors: suspected mid-Seq ch100 → confirmed high-Seq ch194),
      // so pathway=null and sequences remain 'غير معروف'.
      id: 'azik',
      image: 'characters/azik.webp', name_ar: 'أزيك', name_en: 'Azik',
      first_appeared_chapter: 9, status: 'alive',
      first_appeared_quote: 'ناقش البروفيسور المساعد الأول كوهين والسيد أزيك حتمية عصر البخار',
      pathway: null,
      aliases: [
        { name: 'السيد أزيك', since_chapter: 9,
          quote: 'ناقش البروفيسور المساعد الأول كوهين والسيد أزيك حتمية عصر البخار' },
        { name: 'الأكاديمي أزيك', since_chapter: 98,
          quote: 'هو الأكاديمي، أزيك' },
      ],
      states: [
        { since_chapter: 25, sequence: 'غير معروف', location: 'جامعة خوي (قسم التاريخ)',
          faction: 'قسم التاريخ بجامعة خوي',
          quote: 'إنه لا يزال مكتب قسم تاريخ جامعة خوي' },
        { since_chapter: 100, sequence: 'غير معروف (يُشتبه أنه متجاوز تسلسل متوسط)', location: 'جامعة خوي',
          faction: 'قسم التاريخ بجامعة خوي',
          quote: 'قد يكون متجاوز تسلسل متوسط من مدرسة الحياة للفكر' },
        { since_chapter: 194, sequence: 'غير معروف (مؤكَّد أنه متجاوز تسلسلات عليا)',
          location: 'متجه إلى باكلوند بحثًا عن ذكرياته المفقودة', faction: 'قسم التاريخ بجامعة خوي',
          quote: 'هذا المعلم الذي يعاني من فقدان الذاكرة والذي عاش حياة طويلة كان متجاوز تسلسلات عليا' },
      ],
      events: [
        { chapter: 25, type: 'intro', text: 'أول ظهور حيّ لأزيك في مكتب قسم التاريخ بجامعة خوي إلى جانب المعلّم كوهين كوينتين.',
          quote: 'إنه لا يزال مكتب قسم تاريخ جامعة خوي' },
        { chapter: 98, text: 'يُعرَّف أزيك بأنه أفضل صديق للمعلّم كوهين كوينتين، معلّم كلاين.',
          quote: 'ابتسم أزيك، الذي كان أفضل صديق لكوهين كوينتين' },
        { chapter: 112, type: 'reveal', text: 'أزيك يكشف لكلاين أنه فقد معظم ذاكرته قبل دخوله قسم التاريخ بجامعة باكلوند، ويشتبه كلاين بانتمائه لمنظمة سرية (مدرسة الحياة للفكر).',
          quote: 'قبل أن أدخل قسم التاريخ بجامعة باكلوند، فقدت معظم ذاكرتي' },
        { chapter: 149, text: 'كلاين يجد دليلًا عن ماضي أزيك المنسي مرتبطًا ببلدة لامود وقلعة مهجورة.',
          quote: 'لقد وجدت دليلاً عن ماضيك' },
        { chapter: 172, text: 'الصافرة النحاسية التي أعطاها أزيك لكلاين، أداة طقسية تتكرر في فصول لاحقة.',
          quote: 'الصافرة النحاسية من أزيك' },
        { chapter: 194, type: 'reveal', text: 'كلاين يؤكّد أن أزيك متجاوز من تسلسلات عليا وأنه قتل شخصًا يُدعى كيلانغوس.',
          quote: 'وقد أكد كلاين أخيرًا أن السيد أزيك هو الذي قتل كيلانغوس' },
        { chapter: 210, type: 'backstory', text: 'خلفية (عبر رواية إنس زانغويل): أزيك يقرر الذهاب إلى باكلوند بحثًا عن ذكرياته المفقودة.',
          quote: 'قرر أزيك الذهاب إلى باكلوند بحثًا عن ذكرياته المفقودة' },
      ],
      abilities: [],
      relationships: [],
      tags: ['غامض', 'متجاوز رفيع'],
      blurb_ar: 'أستاذ تاريخ في جامعة خوي وصديق كوهين كوينتين (معلّم كلاين)؛ فاقد للذاكرة، متجاوز رفيع التسلسل يبحث عن ماضيه المنسي.',
      sources: [9, 25, 98, 100, 112, 149, 172, 194, 210],
    },
    {
      // gap-batch: Leonard Mitchell — Seq-8 Midnight Poet (Sleepless pathway), senior Nighthawk in
      // Tingen under Don Smith; works cases with Klein. pathway=null intentionally: the Sleepless
      // pathway ('مسار اللانائم') is not present in data/pathways.js, and a {id:'sleepless'} ref would
      // break the "character pathway.id references a real pathway" test — same convention as mr_a.
      // Pathway/sequence info is preserved in the state sequence text, events, tags and blurb.
      id: 'leonard',
      image: 'characters/leonard.webp', name_ar: 'ليونارد ميتشل', name_en: 'Leonard Mitchell',
      first_appeared_chapter: 17, status: 'alive',
      first_appeared_quote: 'لقد فعل ليونارد مثل هذه الحماقة',
      pathway: { id: 'sleepless', name_ar: 'مسار الليل الدائم' },
      aliases: [],
      states: [
        { since_chapter: 21, sequence: 'التسلسل 8: شاعر منتصف الليل', location: 'تينغن',
          faction: 'صقور الليل',
          quote: 'ليونارد ميتشل. ذو التسلسل 8 شاعر منتصف الليل' },
      ],
      events: [
        { chapter: 21, type: 'intro', text: 'تعريف رسمي بالاسم الكامل والتسلسل: ليونارد ميتشل، التسلسل 8 شاعر منتصف الليل، ضابط في صقور الليل بتينغن.',
          quote: 'ليونارد ميتشل. ذو التسلسل 8 شاعر منتصف الليل' },
        { chapter: 44, text: 'يبرهن على كفاءته القتالية في عملية إنقاذ خطف، إذ يُخضع الخاطفين.',
          quote: 'انزلق ليونارد إلى الأمام وضرب الخاطف الصاحي وأفقده الوعي' },
        { chapter: 127, type: 'reveal', text: 'تُربط قدرته على الإنشاد المُنوِّم صراحةً بشاعر منتصف الليل من مسار اللانائم.',
          quote: 'كانت هذه القدرات مشابهة لقدرات شاعر منتصف الليل من مسار اللانائم' },
        { chapter: 208, text: 'يُصاب إصابة بالغة في المعركة ضد الوحش ميغوس/نسل الإله الشرير.',
          quote: 'تصدعت عظام ليونارد، وكان هناك تدفق للدماء من فمه باستمرار' },
        { chapter: 211, text: 'يبلّغ عائلة كلاين (بينسون وميليسا) بقصة الغطاء أن كلاين مات بطلًا، ويحضر كحامل نعش.',
          quote: 'لقد مات أخوك كلاين على يد مجرم شرير بينما كان يحاول إنقاذ الآخرين. إنه بطل، بطل حقيقي' },
        { chapter: 211, text: 'يقسم على الانتقام من إنس زانغويل ويصرّح بأنه على وشك التقدم قريبًا.',
          quote: 'إنس زانغويل، يجب أن تعيش حتى اليوم الذي أصبح فيه قوي بما فيه الكفاية' },
      ],
      abilities: [],
      relationships: [],
      tags: ['صقور الليل', 'مسار اللانائم', 'شاعر منتصف الليل'],
      blurb_ar: 'متجاوز التسلسل 8 (شاعر منتصف الليل) من مسار اللانائم وضابط أقدم في صقور ليل تينغن تحت قيادة دون سميث، يعمل مع كلاين على القضايا الخارقة؛ نجا من معركة شبه قاتلة وأقسم على الانتقام من إنس زانغويل.',
      sources: [17, 21, 44, 127, 208, 211],
    },

    // ── batch-ch280-324: Backlund arc — significant new recurring characters ──

    {
      // Laneves — the Tingen traitor, now a vessel of the True Creator; the manhunt target of Klein's revenge arc.
      id: 'laneves',
      name_ar: 'لانيفوس', name_en: 'Laneves',
      first_appeared_chapter: 285, status: 'alive',
      first_appeared_quote: 'لانيفوس',
      pathway: null,
      aliases: [],
      states: [
        { since_chapter: 285, sequence: 'غير معروف (وعاء الخالق الحقيقي)', location: 'باكلوند', faction: 'نظام الشفق',
          notes: 'خائن تينغن صار وعاءً للخالق الحقيقي؛ مطارد من صقور الليل وكلاين.',
          quote: 'لانيفوس' },
      ],
      events: [
        { chapter: 285, type: 'intro', text: 'بداية مطاردة لانيفوس في باكلوند — الخائن الذي صار وعاءً للخالق الحقيقي.',
          quote: 'لانيفوس' },
        { chapter: 287, type: 'combat', text: 'مواجهة قاتلة في المجاري؛ يفلت من صقور الليل لكن كلاين (بقناع المهرج) يتربص به.',
          quote: 'لانيفوس' },
      ],
      relationships: [],
      abilities: [],
      tags: ['نظام الشفق', 'الخالق الحقيقي', 'باكلوند'],
      blurb_ar: 'خائنٌ من أحداث تينغن صار وعاءً لقداسة الخالق الحقيقي؛ هدف قوس انتقام كلاين في باكلوند، ومطارد من صقور الليل.',
      sources: [285, 287],
    },
    {
      // Cattleya — "Admiral of Stars", a notable pirate admiral introduced via Alger's news in ch294.
      id: 'cattleya',
      name_ar: 'كاتليا', name_en: 'Cattleya',
      first_appeared_chapter: 294, status: 'alive',
      first_appeared_quote: 'أدميرال النجوم',
      pathway: null,
      aliases: [{ name: 'أدميرال النجوم', since_chapter: 294, quote: 'أدميرال النجوم' }],
      states: [
        { since_chapter: 294, sequence: 'غير معروف', location: 'البحار', faction: 'قراصنة',
          notes: 'أدميرال نجوم قرصانة بارزة.',
          quote: 'أدميرال النجوم' },
      ],
      events: [
        { chapter: 294, type: 'intro', text: 'ذكرى أولاً كأدميرال النجوم بين أدميرالات القراصنة (إلى جانب تريسي الموت الأسود).',
          quote: 'أدميرال النجوم' },
      ],
      relationships: [],
      abilities: [],
      tags: ['قراصنة', 'أدميرال النجوم'],
      blurb_ar: 'أدميرال النجوم — قرصانة بارزة ظهر ذكرها أولاً في أخبار الرجل المعلق إلى جانب غيرها من الأدميرالات.',
      sources: [294],
    },
    {
      // Bishop Utravsky — hunched bishop of the Harvest Church (God of Earth) in Backlund; former pirate & former Seq-6 Dawn Paladin.
      id: 'utravsky',
      name_ar: 'أوترافسكي', name_en: 'Utravsky',
      first_appeared_chapter: 302, status: 'alive',
      first_appeared_quote: 'أوترافسكي',
      pathway: null,
      aliases: [{ name: 'الأسقف العملاق', since_chapter: 306, quote: 'الأسقف العملاق' }],
      states: [
        { since_chapter: 302, sequence: 'غير معروف (أسقف، سابقًا بالادين فجر)', location: 'باكلوند - كنيسة الحصاد', faction: 'كنيسة الحصاد',
          notes: 'أسقف كنيسة الحصاد في باكلوند؛ ضخم الجثة وله ماضٍ كقرصان وبالادين فجر سابق.',
          quote: 'أوترافسكي' },
      ],
      events: [
        { chapter: 302, type: 'intro', text: 'ظهور الأسقف أوترافسكي في كنيسة الحصاد بباكلوند — رجل ضخم بملامح مرعبة وطفولية في آنٍ واحد.',
          quote: 'أوترافسكي' },
      ],
      relationships: [],
      abilities: [],
      tags: ['كنيسة الحصاد', 'باكلوند', 'بالادين فجر'],
      blurb_ar: 'أسقف كنيسة الحصاد (إله الأرض) في باكلوند؛ ضخم الجثة، له ماضٍ كقرصان، وكان بالادين فجر (التسلسل 6 من مسار المحارب/العملاق).',
      sources: [302, 306, 307],
    },
    {
      // Fors — "Magician", newest Tarot Club member (ch311); Door-pathway Seq-9 Beyonder (wall-passing). Also a writer.
      id: 'fors',
      name_ar: 'فورس', name_en: 'Fors Wall',
      first_appeared_chapter: 311, status: 'alive',
      first_appeared_quote: 'الساحر',
      pathway: null,
      aliases: [{ name: 'الساحر', since_chapter: 311, quote: 'الساحر' }],
      states: [
        { since_chapter: 311, sequence: 'التسلسل 9 (مسار الباب)', location: 'باكلوند', faction: 'نادي التاروت',
          notes: 'كاتبة ومتجاوزة من مسار الباب، تستطيع العبور عبر الجدران؛ انضمت لنادي التاروت باسم "الساحر".',
          quote: 'الساحر' },
      ],
      events: [
        { chapter: 311, type: 'join', text: 'انضمت إلى نادي التاروت كعضوة جديدة باسم "الساحر" (التسلسل 9 من مسار الباب).',
          quote: 'الساحر' },
      ],
      relationships: [{ id: 'audrey', type: 'صديقة/زميلة (معرفة سابقة)', since_chapter: 311 }],
      abilities: ['العبور عبر الجدران'],
      tags: ['نادي التاروت', 'الساحر', 'مسار الباب', 'باكلوند'],
      blurb_ar: 'كاتبة ومتجاوزة من مسار الباب (التسلسل 9)، انضمت إلى نادي التاروت باسم "الساحر"؛ صديقة شيو ولسابقة معرفة بأودري.',
      sources: [311],
    },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = L.characters;
})(typeof window !== 'undefined' ? window : globalThis);
