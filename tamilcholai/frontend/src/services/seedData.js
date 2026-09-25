/**
 * Seed data for Articles, Community Forum, Interactive Quiz, Alphabet, and Word of the Day.
 */

export const TAMIL_ALPHABET = {
  uyir: [
    { letter: 'அ', sound: 'a', name: 'அகர உயிர்', example: 'அம்மா (Amma - Mother)' },
    { letter: 'ஆ', sound: 'aa', name: 'ஆகார உயிர்', example: 'ஆடு (Aadu - Goat)' },
    { letter: 'இ', sound: 'i', name: 'இகர உயிர்', example: 'இலை (Ilai - Leaf)' },
    { letter: 'ஈ', sound: 'ee', name: 'ஈகார உயிர்', example: 'ஈட்டி (Eetti - Spear)' },
    { letter: 'உ', sound: 'u', name: 'உகர உயிர்', example: 'உரல் (Ural - Mortar)' },
    { letter: 'ஊ', sound: 'oo', name: 'ஊகார உயிர்', example: 'ஊஞ்சல் (Oonjal - Swing)' },
    { letter: 'எ', sound: 'e', name: 'எகர உயிர்', example: 'எலி (Eli - Mouse)' },
    { letter: 'ஏ', sound: 'ae', name: 'ஏகார உயிர்', example: 'ஏணி (Eani - Ladder)' },
    { letter: 'ஐ', sound: 'ai', name: 'ஐகார உயிர்', example: 'ஐந்து (Ainthu - Five)' },
    { letter: 'ஒ', sound: 'o', name: 'ஒகர உயிர்', example: 'ஒட்டகம் (Ottagam - Camel)' },
    { letter: 'ஓ', sound: 'oh', name: 'ஓகார உயிர்', example: 'ஓடம் (Odam - Boat)' },
    { letter: 'ஔ', sound: 'au', name: 'ஔகார உயிர்', example: 'ஔவையார் (Avvaiyar - Poetess)' }
  ],
  ayutham: [
    { letter: 'ஃ', sound: 'ak', name: 'ஆய்த எழுத்து', example: 'எஃகு (Ehgu - Steel)' }
  ],
  mei: [
    { letter: 'க்', sound: 'ik', type: 'வல்லினம் (Hard)', example: 'கொக்கு (Crane)' },
    { letter: 'ங்', sound: 'ing', type: 'மெல்லினம் (Soft)', example: 'சிங்கம் (Lion)' },
    { letter: 'ச்', sound: 'ich', type: 'வல்லினம் (Hard)', example: 'பச்சை (Green)' },
    { letter: 'ஞ்', sound: 'inj', type: 'மெல்லினம் (Soft)', example: 'மஞ்சள் (Yellow)' },
    { letter: 'ட்', sound: 'it', type: 'வல்லினம் (Hard)', example: 'பட்டம் (Kite)' },
    { letter: 'ண்', sound: 'inn', type: 'மெல்லினம் (Soft)', example: 'கண் (Eye)' },
    { letter: 'த்', sound: 'ith', type: 'வல்லினம் (Hard)', example: 'நத்தை (Snail)' },
    { letter: 'ந்', sound: 'inth', type: 'மெல்லினம் (Soft)', example: 'பந்து (Ball)' },
    { letter: 'ப்', sound: 'ip', type: 'வல்லினம் (Hard)', example: 'கப்பல் (Ship)' },
    { letter: 'ம்', sound: 'im', type: 'மெல்லினம் (Soft)', example: 'மரம் (Tree)' },
    { letter: 'ய்', sound: 'iy', type: 'இடையினம் (Medium)', example: 'பாய் (Mat)' },
    { letter: 'ர்', sound: 'ir', type: 'இடையினம் (Medium)', example: 'தேர் (Chariot)' },
    { letter: 'ல்', sound: 'il', type: 'இடையினம் (Medium)', example: 'கல் (Stone)' },
    { letter: 'வ்', sound: 'iv', type: 'இடையினம் (Medium)', example: 'செவ்வாழை (Red Banana)' },
    { letter: 'ழ்', sound: 'izhh', type: 'இடையினம் (Medium - Special)', example: 'தமிழ் (Tamil)' },
    { letter: 'ள்', sound: 'ill', type: 'இடையினம் (Medium)', example: 'வாள் (Sword)' },
    { letter: 'ற்', sound: 'itr', type: 'வல்லினம் (Hard)', example: 'வெற்றிலை (Betel Leaf)' },
    { letter: 'ன்', sound: 'in', type: 'மெல்லினம் (Soft)', example: 'மான் (Deer)' }
  ]
};

export const WORDS_OF_THE_DAY = [
  {
    word: 'அகம் (Agam)',
    meaningTa: 'உள்ளம், மனம், இல்லம் அல்லது தனிமனித அகவாழ்க்கை.',
    meaningEn: 'Inner self, heart, soul, or domestic private life in classical Tamil literature.',
    usage: 'அகத்தூய்மை வாய்மையால் உண்டாகும் - திருக்குறள்.'
  },
  {
    word: 'செம்மொழி (Semmozhi)',
    meaningTa: 'தொன்மை, தனித்தன்மை, செழுமையான இலக்கிய வளம் கொண்ட உயர்ந்த மொழி.',
    meaningEn: 'Classical language holding ancient antiquity, independent origin, and rich literary heritage.',
    usage: 'தமிழ் உலகின் மூத்த செம்மொழிகளில் தலையாயது.'
  },
  {
    word: 'ஈகை (Eegai)',
    meaningTa: 'எதிர்பார்ப்பின்றி இல்லையென்று வந்தோருக்கு மகிழ்ச்சியுடன் கொடுக்கும் பெருந்தன்மை.',
    meaningEn: 'Selfless generosity, altruistic giving and charity to the needy without expecting any return.',
    usage: 'ஈத்துவக்கும் இன்பம் அறியார்கொல் தாமுடைமை வைத்திழக்கும் வன்கணவர்.'
  },
  {
    word: 'விருந்தோம்பல் (Virunthombal)',
    meaningTa: 'வீட்டிற்கு வரும் விருந்தினரை முகம் மலர வரவேற்று உணவளித்து உபசரிக்கும் உயரிய தமிழ்ப் பண்பாடு.',
    meaningEn: 'The sacred Tamil cultural virtue of warmly welcoming, sheltering, and hosting guests.',
    usage: 'விருந்தோம்பல் தமிழரின் தலையாய அறங்களில் ஒன்றாகும்.'
  }
];

export const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'சங்க இலக்கியத்தில் இயற்கை வனப்பும் வாழ்வியல் நெறிகளும்',
    titleEn: 'Nature and Philosophy of Living in Sangam Literature',
    category: 'சங்க இலக்கியம்',
    categoryEn: 'Sangam Literature',
    author: 'பேராசிரியர் முனைவர் க. இளங்கோவன்',
    authorId: 'auth-seed-1',
    authorRole: 'Scholar',
    readTime: '6 min read',
    createdAt: '2026-09-18T10:00:00Z',
    likesCount: 142,
    commentsCount: 18,
    bookmarksCount: 65,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
    summary: 'பண்டைத் தமிழர்கள் ஐவகை நிலங்களாகப் பிரித்து இயற்கையோடு இயைந்து வாழ்ந்த விதம், முல்லை, குறிஞ்சி, மருதம், நெய்தல், பாலை திணைகளின் அழகியல் பார்வை.',
    content: `சங்க காலத் தமிழர்கள் இயற்கையை வெறும் புறப்பொருள் காட்சியாக மட்டும் பார்க்காமல், தங்களின் வாழ்வியலோடும் அக உணர்வுகளோடும் ஒன்றிணைத்துப் பார்த்தனர்.

தொல்காப்பியம் வகுத்த **ஐந்திணை கோட்பாடு** (குறிஞ்சி, முல்லை, மருதம், நெய்தல், பாலை) உலக இலக்கிய வரலாற்றிலேயே ஈடு இணையற்ற ஒரு சூழலியல் பகுப்பாகும்:

* **குறிஞ்சி**: மலையும் மலை சார்ந்த இடமும் - புணர்தலும் புணர்தல் நிமித்தமும் (காதல் தொடக்கம்)
* **முல்லை**: காடும் காடு சார்ந்த இடமும் - இருத்தலும் இருத்தல் நிமித்தமும் (பொறுமை மற்றும் இல்லறம்)
* **மருதம்**: வயலும் வயல் சார்ந்த நிலமும் - ஊடலும் ஊடல் நிமித்தமும் (வாழ்வின் ஊடல்கள்)
* **நெய்தல்**: கடலும் கடல் சார்ந்த பகுதியும் - இரங்கலும் இரங்கல் நிமித்தமும் (பிரிவின் துயரம்)
* **பாலை**: மணலும் மணல் சார்ந்த வறண்ட நிலமும் - பிரிதலும் பிரிதல் நிமித்தமும்

இயற்கையை வணங்கி, மரங்களையும் விலங்குகளையும் உடன்பிறப்பாகக் கருதிய நம் முன்னோர்களின் வாழ்க்கை நெறி இன்றியமையாத சூழலியல் பாடம் புகட்டுகிறது.`
  },
  {
    id: 'art-2',
    title: 'பாரதியாரின் விடுதலைக் கனவும் புதுக்கவிதை புரட்சியும்',
    titleEn: 'Mahakavi Bharatiyar: Vision of Freedom and the Free Verse Revolution',
    category: 'புதுக்கவிதை',
    categoryEn: 'Modern Poetry',
    author: 'சுப்பிரமணிய பாரதி ஆய்வு மன்றம்',
    authorId: 'auth-seed-2',
    authorRole: 'Contributor',
    readTime: '4 min read',
    createdAt: '2026-09-20T14:30:00Z',
    likesCount: 219,
    commentsCount: 27,
    bookmarksCount: 88,
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80',
    summary: 'மரபுக்கவிதையின் கடுமையான யாப்பிலக்கணச் சுவர்களைத் தகர்த்து, எளிய தமிழால் எளிய மக்களை எழுச்சி கொள்ள வைத்த மகாகவி பாரதியாரின் கவிதை வீச்சு.',
    content: `"எண்ணிய முடிதல் வேண்டும், நல்லவே எண்ணல் வேண்டும்;
திண்ணிய நெஞ்சம் வேண்டும், தெளிந்த நல் அறிவு வேண்டும்!"

சுப்பிரமணிய பாரதியார் தமிழ் இலக்கியத்தின் திருப்புமுனை. பண்டிதர்களின் அரண்மனைகளில் மட்டுமே சிறைப்பட்டுக் கிடந்த தமிழ் மொழியை தெருக்களுக்கும், சாமானிய உழைக்கும் மக்களுக்கும் கொண்டு சேர்த்தவர் பாரதி.

அடிமைப்பட்டு கிடந்த தேசத்திற்கு 'விடுதலை' என்ற தீச்சுடரை ஏற்றியதோடு மட்டுமல்லாமல், பெண் விடுதலை, சாதி மறுப்பு, அறிவியல் சிந்தனைகள், உலகளாவிய சகோதரத்துவம் ஆகியவற்றைத் தன் பாட்டுகளால் நிலைநாட்டினார்.`
  },
  {
    id: 'art-3',
    title: 'தஞ்சைப் பெருவுடையார் கோவில்: சோழர்களின் வானளாவிய கட்டிடக்கலை விந்தை',
    titleEn: 'Brihadeeswara Temple, Thanjavur: The Marvel of Chola Architecture',
    category: 'வரலாறு & கலை',
    categoryEn: 'History & Architecture',
    author: 'இராஜேந்திரன் செட்டியார்',
    authorId: 'auth-seed-3',
    authorRole: 'Historian',
    readTime: '7 min read',
    createdAt: '2026-09-21T09:15:00Z',
    likesCount: 312,
    commentsCount: 42,
    bookmarksCount: 154,
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    summary: 'ஆயிரம் ஆண்டுகளைக் கடந்தும் கம்பீரமாக நிற்கும் ராஜராஜ சோழனின் தஞ்சை பெரிய கோவிலின் கட்டிடக்கலை ரகசியங்கள், நிழல் விந்தை மற்றும் விமானத் தொழில்நுட்பம்.',
    content: `கி.பி. 1010-ல் மாமன்னன் முதலாம் ராஜராஜ சோழனால் கட்டி முடிக்கப்பட்ட **தஞ்சைப் பெரிய கோவில் (பெருவுடையார் கோவில்)**, திராவிடக் கட்டிடக்கலையின் மகுடமாகும்.

### வியக்க வைக்கும் உண்மைகள்:
1. **முழுவதும் கிரானைட் கற்களால் ஆனது**: தஞ்சையைச் சுற்றி 50 மைல் சுற்றளவுக்கு கிரானைட் பாறைகளே இல்லாத சமவெளி நிலத்தில், இவ்வளவு பெரிய கருங்கற்கள் எங்கிருந்து எவ்வாறு கொண்டு வரப்பட்டன என்பது அதிசயத்தக்கது.
2. **80 டன் எடையுள்ள விமான உச்சிப் பாறை**: 216 அடி உயரமுள்ள பிரம்மாண்ட விமானத்தின் உச்சியில் 80 டன் எடை கொண்ட ஒரே கல்லால் செதுக்கப்பட்ட கலசம் நிறுவப்பட்டுள்ளது. இதை 6 கி.மீ தொலைவிலிருந்து அமைக்கப்பட்ட தற்காலிக மணல் சரிவு மூலம் யானைகளைக் கொண்டு மேலேற்றினர்.
3. **செங்குத்து சமச்சீர்மை**: பூகம்பங்கள் மற்றும் சூறாவளிகளைத் தாண்டி ஆயிரம் ஆண்டுகளுக்கும் மேலாக அதன் அஸ்திவாரம் அசையாமல் நிற்கிறது.

யுனெஸ்கோவால் உலகப் பாரம்பரியச் சின்னமாக அறிவிக்கப்பட்ட இக்கோவில் தமிழரின் பொறியியல் நுட்பத்திற்கு நித்திய சான்றாகும்.`
  },
  {
    id: 'art-4',
    title: 'குழந்தைகளுக்குத் தமிழ் கற்றுக் கொடுக்கும் எளிய முறைகள்',
    titleEn: 'Creative Ways to Teach Tamil to Children in the Digital Era',
    category: 'தமிழ் கற்போம்',
    categoryEn: 'Learn Tamil',
    author: 'அன்புச்செல்வி ஆசிரியர்',
    authorId: 'auth-seed-4',
    authorRole: 'Educator',
    readTime: '5 min read',
    createdAt: '2026-09-22T08:00:00Z',
    likesCount: 98,
    commentsCount: 12,
    bookmarksCount: 47,
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80',
    summary: 'வெளிநாடுகளிலும் நவீன சூழலிலும் வாழும் இளம் தலைமுறையினருக்கு தாய்மொழியின் இனிமையை கதைகள், பாடல்கள் மற்றும் விளையாட்டுகள் மூலம் புகட்டுவது எப்படி?',
    content: `இன்றைய மின்னணு காலகட்டத்தில் குழந்தைகளுக்கு தாய்மொழியான தமிழை சுமையாக இல்லாமல், சுவையான விளையாட்டாகக் கற்பிப்பது மிகவும் அவசியமாகும்.

### நடைமுறைப் பரிந்துரைகள்:
1. **பாட்டி கதைகளும் பாரதி பாடல்களும்**: 'ஓடி விளையாடு பாப்பா' போன்ற எளிய தாள நயமுள்ள பாடல்களைக் கேட்க வைப்பது மொழி ஆர்வத்தைத் தூண்டும்.
2. **தினசரி 10 தமிழ் வார்த்தைகள்**: வீட்டில் உள்ள பொருட்களைத் தமிழிலேயே பெயரிட்டு அழைக்கப் பழக்குங்கள்.
3. **மின்னணு செயலிகள் & வினாடி வினா**: தமிழ்ச்சோலை போன்ற தளங்களின் எழுத்து பலகை மற்றும் வினாடி வினாக்களைக் கொண்டு விளையாட்டாகக் கற்கச் செய்யுங்கள்.`
  }
];

export const INITIAL_COMMENTS = [
  {
    id: 'comm-1',
    articleId: 'art-1',
    userName: 'கார்த்திகேயன் சுந்தரம்',
    userRole: 'வாசகர்',
    createdAt: '2026-09-19T11:20:00Z',
    text: 'சங்க இலக்கியத்தின் திணை கோட்பாடுகளை இவ்வளவு சுருக்கமாகவும் ஆழமாகவும் விளக்கியமைக்கு நெஞ்சார்ந்த நன்றிகள்!'
  },
  {
    id: 'comm-2',
    articleId: 'art-1',
    userName: 'மாலதி ராமநாதன்',
    userRole: 'ஆசிரியர்',
    createdAt: '2026-09-20T04:10:00Z',
    text: 'இக்கட்டுரையை என் பள்ளி மாணவர்களோடு பகிர்ந்து கொண்டேன். மிகச் சிறந்த வழிகாட்டுதல்.'
  },
  {
    id: 'comm-3',
    articleId: 'art-3',
    userName: 'வேல்முருகன் சோழன்',
    userRole: 'வரலாற்று ஆர்வலர்',
    createdAt: '2026-09-22T10:15:00Z',
    text: 'தஞ்சை பெரிய கோவிலைப் பற்றி படிக்கும்போதெல்லாம் தமிழனாகப் பெருமிதம் மேலிடுகிறது!'
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    title: 'சிலப்பதிகாரத்தில் மாதவியின் கதாபாத்திரம் குறித்த உங்களின் பார்வை என்ன?',
    titleEn: 'What is your perspective on Madhavi\'s character in Silappathikaram?',
    author: 'அமுதன்',
    authorRole: 'இலக்கிய மாணவன்',
    category: 'இலக்கிய விவாதம்',
    createdAt: '2026-09-21T16:00:00Z',
    upvotes: 45,
    repliesCount: 6,
    content: 'சிலப்பதிகாரத்தில் கண்ணகிக்கு இணையான அல்லது சில இடங்களில் அவளை விடவும் தியாகமும் கலையார்வமும் கொண்ட கதாபாத்திரமாக மாதவி சித்தரிக்கப்படுகிறாள் என்று நினைக்கிறேன். உங்கள் கருத்துகளைப் பகிருங்கள்.'
  },
  {
    id: 'post-2',
    title: 'சுயமரியாதையும் தன்னம்பிக்கையும் ஊட்டக்கூடிய சிறந்த திருக்குறள்கள் எவை?',
    titleEn: 'Which Kurals best cultivate self-respect and unshakable confidence?',
    author: 'தேன்மொழி',
    authorRole: 'உறுப்பினர்',
    category: 'திருக்குறள் சிந்தனை',
    createdAt: '2026-09-22T12:30:00Z',
    upvotes: 38,
    repliesCount: 4,
    content: 'இளைஞர்களுக்கு மன உறுதியை வளர்க்கும் குறள்களைக் குறிப்பிடவும். எனக்கு "தெய்வத்தான் ஆகா தெனினும் முயற்சிதன் மெய்வருத்தக் கூலி தரும்" மிகவும் பிடிக்கும்.'
  },
  {
    id: 'post-3',
    title: 'என் முதல் ஹைக்கூ கவிதை - கருத்துகளை வரவேற்கிறேன்',
    titleEn: 'My first Haiku poem in Tamil - feedback welcome',
    author: 'கவிப்பிரியன்',
    authorRole: 'வளர் கவிஞர்',
    category: 'கவிதை அரங்கம்',
    createdAt: '2026-09-23T06:00:00Z',
    upvotes: 29,
    repliesCount: 3,
    content: `மழை நின்ற பின்னும்
மரக்கிளையில் ஊஞ்சலாடுகிறது
ஒரு துளி வானம்!`
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 'q-1',
    questionTa: 'திருக்குறளை இயற்றிய திருவள்ளுவர் வாழ்ந்த காலம் தோராயமாக எதுவெனக் கருதப்படுகிறது?',
    questionEn: 'What is the estimated historical period when Thiruvalluvar lived?',
    options: [
      'கி.மு. 31 (பொ.ஆ.மு. 31)',
      'கி.பி. 1500 (பொ.ஆ. 1500)',
      'கி.மு. 1000',
      'கி.பி. 800'
    ],
    correctAnswer: 0,
    explanationTa: 'தமிழ்நாடு அரசு திருவள்ளுவர் ஆண்டாக கி.மு. 31-ஐ அதிகாரப்பூர்வமாக ஏற்றுக்கொண்டுள்ளது.'
  },
  {
    id: 'q-2',
    questionTa: 'தமிழில் உள்ள மொத்த உயிர் எழுத்துக்களின் எண்ணிக்கை எத்தனை?',
    questionEn: 'How many primary vowels (Uyir Ezhuthukkal) are there in the Tamil language?',
    options: ['10', '12', '18', '216'],
    correctAnswer: 1,
    explanationTa: 'அ முதல் ஔ வரையிலான 12 எழுத்துக்கள் தமிழ் உயிர் எழுத்துக்கள் ஆகும்.'
  },
  {
    id: 'q-3',
    questionTa: '"யாதும் ஊரே யாவரும் கேளிர்" என்ற வரலாற்றுப் புகழ்மிக்க வரிகளைப் பாடிய சங்கப் புலவர் யார்?',
    questionEn: 'Who is the famous Sangam poet who sang "Every town is our home, and all people are our kin"?',
    options: ['கபிலர்', 'ஔவையார்', 'கணியன் பூங்குன்றனார்', 'பரணர்'],
    correctAnswer: 2,
    explanationTa: 'புறநானூற்றில் இடம்பெற்ற இந்த உலகளாவிய சகோதரத்துவப் பாடலைப் பாடியவர் கணியன் பூங்குன்றனார் ஆவார்.'
  },
  {
    id: 'q-4',
    questionTa: 'திருக்குறளில் உள்ள மொத்த அதிகாரங்கள் மற்றும் குறட்பாக்களின் எண்ணிக்கை என்ன?',
    questionEn: 'What is the total number of chapters and couplets in the Thirukkural?',
    options: [
      '100 அதிகாரங்கள், 1000 குறள்கள்',
      '133 அதிகாரங்கள், 1330 குறள்கள்',
      '150 அதிகாரங்கள், 1500 குறள்கள்',
      '108 அதிகாரங்கள், 1080 குறள்கள்'
    ],
    correctAnswer: 1,
    explanationTa: 'திருக்குறளில் 133 அதிகாரங்களும், அதிகாரத்திற்கு 10 குறள்கள் வீதம் மொத்தம் 1330 குறட்பாக்களும் உள்ளன.'
  },
  {
    id: 'q-5',
    questionTa: '"செந்தமிழ் நாடெனும் போதினிலே - இன்பத் தேன்வந்து பாயுது காதினிலே" என்ற பாடலை இயற்றியவர் யார்?',
    questionEn: 'Who composed the immortal patriotic lyric "Senthamizh Naadenum Pothinile"?',
    options: ['பாரதிதாசன்', 'மகாகவி பாரதியார்', 'கண்ணதாசன்', 'வாலி'],
    correctAnswer: 1,
    explanationTa: 'இப்பாடலைத் தமிழின் தவப்புதல்வரான மகாகவி சுப்பிரமணிய பாரதியார் இயற்றினார்.'
  }
];
