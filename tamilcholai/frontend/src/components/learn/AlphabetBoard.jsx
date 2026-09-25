import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen } from 'lucide-react';
import { TAMIL_ALPHABET } from '../../services/seedData';
import { useSpeech } from '../../hooks/useSpeech';
import { useLanguage } from '../../context/LanguageContext';

const AlphabetBoard = () => {
  const { lang } = useLanguage();
  const { speak } = useSpeech();
  const [activeTab, setActiveTab] = useState('uyir'); // 'uyir' | 'mei' | 'ayutham'
  const [selectedLetter, setSelectedLetter] = useState(TAMIL_ALPHABET.uyir[0]);

  const handleTileClick = (item) => {
    setSelectedLetter(item);
    speak(item.letter);
  };

  return (
    <div className="card" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="var(--brand-gold)" />
            <span>{lang === 'ta' ? 'தமிழ் நெடுங்கணக்கு ஒலிப் பலகை' : 'Interactive Tamil Alphabet Board'}</span>
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
            {lang === 'ta' ? 'எழுத்துக்களைத் தொட்டு அவற்றின் துல்லியமான உச்சரிப்பைக் கேளுங்கள்.' : 'Click on any letter to hear authentic Tamil pronunciation.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.3rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-light)' }}>
          <button
            onClick={() => { setActiveTab('uyir'); setSelectedLetter(TAMIL_ALPHABET.uyir[0]); }}
            style={{
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: activeTab === 'uyir' ? 'var(--brand-gold)' : 'transparent',
              color: activeTab === 'uyir' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            உயிர் (12)
          </button>
          <button
            onClick={() => { setActiveTab('mei'); setSelectedLetter(TAMIL_ALPHABET.mei[0]); }}
            style={{
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: activeTab === 'mei' ? 'var(--brand-gold)' : 'transparent',
              color: activeTab === 'mei' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            மெய் (18)
          </button>
          <button
            onClick={() => { setActiveTab('ayutham'); setSelectedLetter(TAMIL_ALPHABET.ayutham[0]); }}
            style={{
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: activeTab === 'ayutham' ? 'var(--brand-gold)' : 'transparent',
              color: activeTab === 'ayutham' ? '#ffffff' : 'var(--text-secondary)',
              transition: 'all 0.2s'
            }}
          >
            ஆய்தம் (1)
          </button>
        </div>
      </div>

      {/* Grid of Letters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
          gap: '0.85rem',
          marginBottom: '2rem'
        }}
      >
        {TAMIL_ALPHABET[activeTab].map((item) => {
          const isSelected = selectedLetter.letter === item.letter;
          return (
            <button
              key={item.letter}
              onClick={() => handleTileClick(item)}
              style={{
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'var(--gradient-gold)' : 'var(--bg-secondary)',
                color: isSelected ? '#ffffff' : 'var(--text-primary)',
                border: isSelected ? '2px solid var(--brand-bronze)' : '1px solid var(--border-light)',
                boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                transition: 'all var(--transition-fast)'
              }}
              className="alpha-tile"
            >
              <span style={{ fontFamily: 'var(--font-tamil)', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1.1 }}>
                {item.letter}
              </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 500 }}>
                {item.sound}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Letter Spotlight Card */}
      {selectedLetter && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderLeft: '4px solid var(--brand-gold)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-tamil)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--brand-bronze)',
                lineHeight: 1
              }}
            >
              {selectedLetter.letter}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {selectedLetter.name || selectedLetter.type}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {lang === 'ta' ? 'எடுத்துக்காட்டு' : 'Example Word'}: <strong>{selectedLetter.example}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => speak(`${selectedLetter.letter}, ${selectedLetter.example}`)}
            className="btn btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.88rem' }}
          >
            <Volume2 size={16} />
            <span>{lang === 'ta' ? 'மீண்டும் ஒலிக்கேட்க' : 'Pronounce Word'}</span>
          </button>
        </div>
      )}

      <style>{`
        .alpha-tile:hover {
          transform: translateY(-2px);
          border-color: var(--brand-gold);
        }
      `}</style>
    </div>
  );
};

export default AlphabetBoard;
