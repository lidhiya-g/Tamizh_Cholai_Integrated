import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NotFound = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-tamil)',
            fontSize: '6rem',
            fontWeight: 900,
            color: 'var(--brand-gold)',
            lineHeight: 1,
            marginBottom: '1rem'
          }}
        >
          404
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>
          {lang === 'ta' ? 'பக்கம் காணப்படவில்லை!' : 'Page Not Found!'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 2rem auto' }}>
          {lang === 'ta'
            ? 'நீங்கள் தேடிய பக்கம் சோலையில் இல்லை அல்லது முகவரி மாற்றப்பட்டிருக்கலாம்.'
            : 'The page you are looking for does not exist in Tamilcholai or has been moved.'}
        </p>
        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          <span>{lang === 'ta' ? 'முகப்புப் பக்கத்திற்குத் திரும்புக' : 'Return to Home'}</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
