import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const TRANSLATIONS = {
  ta: {
    brandName: 'தமிழ்ச்சோலை',
    brandTagline: 'செம்மொழித் தமிழின் இலக்கியச் சோலை',
    home: 'முகப்பு',
    kural: 'திருக்குறள்',
    articles: 'இலக்கியக் கட்டுரைகள்',
    learn: 'தமிழ் கற்போம்',
    forum: 'மன்றம் / களம்',
    proverbs: 'பழமொழிகள்',
    profile: 'என் சுயவிவரம்',
    createArticle: 'புதிய படைப்பு',
    login: 'உள்நுழைக',
    register: 'பதிவு செய்க',
    logout: 'வெளியேறு',
    searchPlaceholder: 'குறள் எண், சொல் அல்லது தலைப்பைத் தேடுக...',
    dailyKuralTitle: 'இன்றைய திருக்குறள்',
    viewAllKurals: 'அனைத்து குறள்களையும் காண்க',
    featuredArticlesTitle: 'சிறப்புக் கட்டுரைகள்',
    wordOfTheDayTitle: 'இன்றைய சொல் வளம்',
    quizTitle: 'தமிழ் வினாடி வினா',
    startQuiz: 'வினாடி வினாவைத் தொடங்குக',
    communityTitle: 'இலக்கிய உரையாடல் களம்',
    readMore: 'மேலும் படிக்க',
    share: 'பகிர்க',
    listen: 'ஒலிக்கேட்க',
    stopAudio: 'நிறுத்து',
    allCategories: 'அனைத்தும்',
    sangamLit: 'சங்க இலக்கியம்',
    modernPoetry: 'புதுக்கவிதை',
    historyArt: 'வரலாறு & கலை',
    learnTamilCat: 'தமிழ் கற்போம்',
    footerAbout: 'தமிழ்ச்சோலை என்பது உலகின் மூத்த செம்மொழியான தமிழின் செழுமையான இலக்கியம், இலக்கணம் மற்றும் பண்பாட்டு மரபுகளை நவீன டிஜிட்டல் வடிவில் உலகெங்கும் கொண்டு சேர்க்கும் ஒரு திறந்த வெளிப் பெருந்தளம்.',
    footerQuickLinks: 'விரைவு இணைப்புகள்',
    footerCommunity: 'சமூகம்',
    footerCopyright: '© 2026 தமிழ்ச்சோலை. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    firebaseNotice: 'டெமோ பயன்முறை: பயர்பேஸ் இன்னும் இணைக்கப்படவில்லை. அனைத்து அம்சங்களும் முழுமையாகச் செயல்படும் வகையில் மாதிரித் தகவல்கள் ஏற்றப்பட்டுள்ளன.',
    connectFirebase: 'பயர்பேஸ் இணைக்க வழிகாட்டி'
  },
  en: {
    brandName: 'Tamilcholai',
    brandTagline: 'The Digital Sanctuary of Classical Tamil Literature',
    home: 'Home',
    kural: 'Thirukkural',
    articles: 'Articles & Poetry',
    learn: 'Learn Tamil',
    forum: 'Community Forum',
    proverbs: 'Proverbs',
    profile: 'My Profile',
    createArticle: 'Write Article',
    login: 'Sign In',
    register: 'Sign Up',
    logout: 'Sign Out',
    searchPlaceholder: 'Search Kural number, word, or topic...',
    dailyKuralTitle: 'Thirukkural of the Day',
    viewAllKurals: 'Explore All Kurals',
    featuredArticlesTitle: 'Featured Articles',
    wordOfTheDayTitle: 'Word of the Day',
    quizTitle: 'Tamil Literary Quiz',
    startQuiz: 'Start Quiz Challenge',
    communityTitle: 'Literary Community Forum',
    readMore: 'Read Full Story',
    share: 'Share',
    listen: 'Listen Audio',
    stopAudio: 'Stop',
    allCategories: 'All Categories',
    sangamLit: 'Sangam Literature',
    modernPoetry: 'Modern Poetry',
    historyArt: 'History & Arts',
    learnTamilCat: 'Learn Tamil',
    footerAbout: 'Tamilcholai is an open digital sanctuary dedicated to preserving, celebrating, and sharing the timeless wisdom of Tamil literature, poetry, and arts with generations across the globe.',
    footerQuickLinks: 'Quick Links',
    footerCommunity: 'Community',
    footerCopyright: '© 2026 Tamilcholai. All rights reserved.',
    firebaseNotice: 'Demo Mode: Firebase keys not yet configured. Running interactively with rich pre-seeded Tamil datasets.',
    connectFirebase: 'Connect Firebase Guide'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('tamilcholai_lang') || 'ta';
  });

  useEffect(() => {
    localStorage.setItem('tamilcholai_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ta' ? 'en' : 'ta'));
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.ta[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
