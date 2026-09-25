import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Feather,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  Award
} from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { useLanguage } from '../context/LanguageContext';
import DailyKural from '../components/kural/DailyKural';
import ArticleCard from '../components/articles/ArticleCard';
import WordOfTheDay from '../components/learn/WordOfTheDay';
import QuizGame from '../components/learn/QuizGame';

const Home = () => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredArticles, setFeaturedArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await firestoreService.getArticles();
      setFeaturedArticles(data.slice(0, 3));
    };
    fetchArticles();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // If it's a number, go directly to Kural Explorer
    if (!isNaN(searchQuery.trim())) {
      navigate(`/kural?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/articles?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'radial-gradient(circle at 50% 20%, rgba(238, 155, 0, 0.12) 0%, rgba(10, 147, 150, 0.05) 50%, transparent 80%)',
          padding: '4.5rem 0 3.5rem 0',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div className="container-narrow">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(238, 155, 0, 0.15)',
              border: '1px solid rgba(238, 155, 0, 0.35)',
              color: 'var(--brand-bronze)',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={16} />
            <span>{lang === 'ta' ? 'செம்மொழித் தமிழ் இணையக் கருவூலம்' : 'Classical Tamil Digital Sanctuary'}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              background: 'linear-gradient(135deg, var(--text-primary) 20%, var(--brand-bronze) 70%, var(--brand-crimson) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {lang === 'ta' ? 'தமிழ்ச்சோலையில் இணைவோம்; இலக்கிய இன்பம் பயில்வோம்' : 'Welcome to Tamilcholai; Immerse in Classical Tamil'}
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 2.25rem auto'
            }}
          >
            {lang === 'ta'
              ? 'திருக்குறள் ஒலி வடிவம், சங்க இலக்கியம், புதுக்கவிதை, எளிய தமிழ் கற்றல் பலகை மற்றும் விவாதக் களம் கொண்ட முழுமையான டிஜிட்டல் சோலை.'
              : 'Explore audio-narrated Thirukkural, classical Sangam literature, modern poetry, interactive alphabet soundboard, and community forums.'}
          </p>

          {/* Smart Universal Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              maxWidth: '600px',
              margin: '0 auto 2rem auto',
              position: 'relative'
            }}
          >
            <input
              type="text"
              className="form-input"
              style={{
                padding: '0.95rem 7.5rem 0.95rem 3rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '1rem',
                boxShadow: 'var(--shadow-md)'
              }}
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="hero-search-input"
            />
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '1.1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                position: 'absolute',
                right: '6px',
                top: '6px',
                bottom: '6px',
                borderRadius: 'var(--radius-full)',
                padding: '0 1.25rem'
              }}
              id="hero-search-btn"
            >
              {lang === 'ta' ? 'தேடுக' : 'Search'}
            </button>
          </form>

          {/* Quick Categories Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/kural" className="btn btn-secondary" style={{ borderRadius: 'var(--radius-full)', fontSize: '0.86rem' }}>
              <BookOpen size={15} color="var(--brand-gold)" />
              <span>{t('kural')}</span>
            </Link>
            <Link to="/articles" className="btn btn-secondary" style={{ borderRadius: 'var(--radius-full)', fontSize: '0.86rem' }}>
              <Feather size={15} color="var(--brand-peacock)" />
              <span>{t('articles')}</span>
            </Link>
            <Link to="/learn" className="btn btn-secondary" style={{ borderRadius: 'var(--radius-full)', fontSize: '0.86rem' }}>
              <GraduationCap size={15} color="var(--brand-bronze)" />
              <span>{t('learn')}</span>
            </Link>
            <Link to="/proverbs" className="btn btn-secondary" style={{ borderRadius: 'var(--radius-full)', fontSize: '0.86rem' }}>
              <Sparkles size={15} color="var(--brand-gold)" />
              <span>{t('proverbs')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Kural Section */}
      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <DailyKural />
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge badge-peacock" style={{ marginBottom: '0.5rem' }}>
                {t('featuredArticlesTitle')}
              </div>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>
                {lang === 'ta' ? 'செறிவான இலக்கியப் படைப்புகள்' : 'Rich Literary Narratives'}
              </h2>
            </div>
            <Link to="/articles" className="btn btn-secondary">
              <span>{lang === 'ta' ? 'அனைத்து கட்டுரைகளும்' : 'View All Articles'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Learning Section (Word of the Day & Quiz) */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
              {t('learn')}
            </span>
            <h2 className="section-title">
              {lang === 'ta' ? 'விளையாட்டாகத் தமிழ் கற்போம்' : 'Learn Tamil with Joy'}
            </h2>
            <p className="section-subtitle">
              {lang === 'ta'
                ? 'தினசரி ஒரு அரிய தமிழ்ச் சொல்லை அறிந்துகொள்ளுங்கள்; இலக்கிய வினாடி வினாவில் பங்கேற்று உங்கள் அறிவை சோதியுங்கள்.'
                : 'Enrich your vocabulary with daily classical words and challenge yourself with interactive quizzes.'}
            </p>
            <div className="title-ornament">
              <span className="title-ornament-line" />
              <span className="title-ornament-dot" />
              <span className="title-ornament-line" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
            <WordOfTheDay />
            <QuizGame />
          </div>
        </div>
      </section>

      {/* Stats & Heritage Badges */}
      <section style={{ borderTop: '1px solid var(--border-light)', padding: '3.5rem 0', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--brand-gold)' }}>
                2500+
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {lang === 'ta' ? 'ஆண்டுகள் தொன்மை' : 'Years of Antiquity'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'ta' ? 'உலகின் முதல் செம்மொழி' : 'Prime Classical Language'}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--brand-peacock)' }}>
                1330
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {lang === 'ta' ? 'திருக்குறள் மணிகள்' : 'Thirukkural Couplets'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'ta' ? 'முழுமையான ஒலி வடிவத்துடன்' : 'Complete with Audio TTS'}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--brand-crimson)' }}>
                100%
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {lang === 'ta' ? 'திறந்தவெளி தளம்' : 'Open Sanctuary'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'ta' ? 'அனைவருக்கும் இலவசம்' : 'Free for Everyone'}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--brand-bronze)' }}>
                Firebase
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {lang === 'ta' ? 'நிகழ்நேர தரவுத்தளம்' : 'Cloud Architecture'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'ta' ? 'பாதுகாப்பான கட்டமைப்பு' : 'Auth, Firestore, Storage'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
