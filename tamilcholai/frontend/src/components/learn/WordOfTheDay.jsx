import React from 'react';
import { BookMarked, Volume2 } from 'lucide-react';
import { WORDS_OF_THE_DAY } from '../../services/seedData';
import { useSpeech } from '../../hooks/useSpeech';
import { useLanguage } from '../../context/LanguageContext';

const WordOfTheDay = () => {
  const { lang, t } = useLanguage();
  const { speak } = useSpeech();
  const wordItem = WORDS_OF_THE_DAY[0];

  return (
    <div
      style={{
        background: 'var(--gradient-card)',
        border: '1px solid var(--border-light)',
        borderTop: '4px solid var(--brand-peacock)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookMarked size={20} color="var(--brand-peacock)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--brand-peacock)' }}>
            {t('wordOfTheDayTitle')}
          </span>
        </div>
        <button
          onClick={() => speak(wordItem.word.split(' ')[0])}
          className="btn-icon"
          style={{ width: '32px', height: '32px' }}
          title="Listen pronunciation"
        >
          <Volume2 size={16} />
        </button>
      </div>

      <h4 style={{ fontFamily: 'var(--font-tamil)', fontSize: '1.6rem', color: 'var(--brand-teal)', marginBottom: '0.5rem' }}>
        {wordItem.word}
      </h4>

      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '0.85rem', lineHeight: 1.5 }}>
        {lang === 'ta' ? wordItem.meaningTa : wordItem.meaningEn}
      </p>

      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.65rem 0.85rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}
      >
        <strong>{lang === 'ta' ? 'பயன்பாடு' : 'Usage'}:</strong> <em>"{wordItem.usage}"</em>
      </div>
    </div>
  );
};

export default WordOfTheDay;
