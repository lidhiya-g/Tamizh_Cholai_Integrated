import React from 'react';
import { GraduationCap, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AlphabetBoard from '../components/learn/AlphabetBoard';
import WordOfTheDay from '../components/learn/WordOfTheDay';
import QuizGame from '../components/learn/QuizGame';

const LearnTamil = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            {lang === 'ta' ? 'அடிப்படை முதல் இலக்கியம் வரை' : 'From Basics to Mastery'}
          </div>
          <h1 className="section-title">
            {lang === 'ta' ? 'தமிழ் பயிலகம் (Learn Tamil)' : 'Interactive Tamil Learning Hub'}
          </h1>
          <p className="section-subtitle">
            {lang === 'ta'
              ? 'தமிழ் எழுத்துக்களின் தூய ஒலி வடிவம், தினசரி சொல்வளம் மற்றும் அறிவுக்கூர்மை தரும் இலக்கிய வினாடி வினா.'
              : 'Master Tamil alphabet pronunciation with audio soundboard, enrich your vocabulary, and play interactive literary quizzes.'}
          </p>
          <div className="title-ornament">
            <span className="title-ornament-line" />
            <span className="title-ornament-dot" />
            <span className="title-ornament-line" />
          </div>
        </div>

        {/* Overview Stats of Tamil Letters */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}
        >
          <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2rem', fontWeight: 900, color: 'var(--brand-gold)' }}>12</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>உயிர் எழுத்துக்கள்</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vowels (அ - ஔ)</div>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2rem', fontWeight: 900, color: 'var(--brand-peacock)' }}>18</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>மெய் எழுத்துக்கள்</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Consonants (க் - ன்)</div>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2rem', fontWeight: 900, color: 'var(--brand-bronze)' }}>216</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>உயிர்மெய் எழுத்துக்கள்</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Compound letters</div>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2rem', fontWeight: 900, color: 'var(--brand-crimson)' }}>1</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>ஆய்த எழுத்து</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Special (ஃ)</div>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '1.25rem', background: 'var(--gradient-card)', border: '2px solid var(--brand-gold)' }}>
            <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '2rem', fontWeight: 900, color: 'var(--brand-gold)' }}>247</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>மொத்த எழுத்துக்கள்</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Tamil Letters</div>
          </div>
        </div>

        {/* Alphabet Soundboard */}
        <div style={{ marginBottom: '3rem' }}>
          <AlphabetBoard />
        </div>

        {/* Word of the Day & Quiz Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          <WordOfTheDay />
          <QuizGame />
        </div>
      </div>
    </div>
  );
};

export default LearnTamil;
