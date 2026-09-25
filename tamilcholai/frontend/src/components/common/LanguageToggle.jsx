import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="btn btn-secondary"
      style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)' }}
      aria-label="மொழி மாற்றுக / Change Language"
      title="Toggle Tamil / English"
      id="lang-toggle-btn"
    >
      <Languages size={16} />
      <span style={{ fontWeight: 700 }}>{lang === 'ta' ? 'தமிழ்' : 'English'}</span>
    </button>
  );
};

export default LanguageToggle;
