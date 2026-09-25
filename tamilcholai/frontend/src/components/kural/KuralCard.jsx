import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, CheckCircle2, Share2, BookOpen } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';
import { useLanguage } from '../../context/LanguageContext';

const KuralCard = ({ kural }) => {
  const { lang } = useLanguage();
  const { speak, stop, isSpeaking, isSupported } = useSpeech();
  const [activeTab, setActiveTab] = useState('mv'); // 'mv' | 'mk' | 'sp' | 'en'
  const [copied, setCopied] = useState(false);

  if (!kural) return null;

  const kuralFullText = `${kural.line1} ${kural.line2}`;

  const handleAudio = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(kuralFullText);
    }
  };

  const handleCopy = () => {
    const textToCopy = `திருக்குறள் எண்: ${kural.number}
அதிகாரம்: ${kural.athikaram} (${kural.pal})

${kural.line1}
${kural.line2}

பொருள்: ${kural.tamilExpMVaradarajan}
English: ${kural.englishCouplet}

- தமிழ்ச்சோலை (Tamilcholai)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `திருக்குறள் ${kural.number} - ${kural.athikaram}`,
        text: `${kural.line1}\n${kural.line2}\n\n- தமிழ்ச்சோலை`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  // Badge color based on Pal
  const getPalBadgeClass = (pal) => {
    if (pal?.includes('அறத்து') || pal === 'Virtue') return 'badge-gold';
    if (pal?.includes('பொருட்') || pal === 'Wealth / Polity') return 'badge-peacock';
    return 'badge-crimson';
  };

  return (
    <div className="card card-gold-border" style={{ marginBottom: '1.5rem' }}>
      {/* Header with Number & Pal */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span
            style={{
              background: 'var(--brand-gold)',
              color: '#ffffff',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            #{kural.number}
          </span>
          <span className={`badge ${getPalBadgeClass(kural.pal)}`}>
            {lang === 'ta' ? kural.pal : kural.palEn}
          </span>
          <span style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            • {lang === 'ta' ? kural.athikaram : kural.athikaramEn}
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          {isSupported && (
            <button
              onClick={handleAudio}
              className={`btn-icon ${isSpeaking ? 'pulse-glow' : ''}`}
              title={isSpeaking ? 'Stop recitation' : 'Listen audio in Tamil'}
              style={{ width: '36px', height: '36px', color: isSpeaking ? 'var(--brand-ruby)' : 'inherit' }}
            >
              {isSpeaking ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
          )}

          <button
            onClick={handleCopy}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
            title="Copy Kural and meaning"
          >
            {copied ? <CheckCircle2 size={16} color="#10b981" /> : <Copy size={16} />}
          </button>

          <button
            onClick={handleShare}
            className="btn-icon"
            style={{ width: '36px', height: '36px' }}
            title="Share"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* The Metrical Kural Couplet */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          margin: '0.85rem 0 1.25rem 0',
          borderLeft: '4px solid var(--brand-bronze)'
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-tamil)',
            fontSize: '1.18rem',
            fontWeight: 700,
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            marginBottom: '0.35rem'
          }}
        >
          {kural.line1}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-tamil)',
            fontSize: '1.18rem',
            fontWeight: 700,
            lineHeight: 1.6,
            color: 'var(--text-primary)'
          }}
        >
          {kural.line2}
        </p>
      </div>

      {/* Commentary Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid var(--border-light)', marginBottom: '0.85rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        <button
          onClick={() => setActiveTab('mv')}
          style={{
            padding: '0.4rem 0.75rem',
            fontSize: '0.85rem',
            fontWeight: activeTab === 'mv' ? 700 : 500,
            color: activeTab === 'mv' ? 'var(--brand-bronze)' : 'var(--text-muted)',
            borderBottom: activeTab === 'mv' ? '2px solid var(--brand-gold)' : 'none',
            whiteSpace: 'nowrap'
          }}
        >
          மு. வரதராசனார்
        </button>
        <button
          onClick={() => setActiveTab('mk')}
          style={{
            padding: '0.4rem 0.75rem',
            fontSize: '0.85rem',
            fontWeight: activeTab === 'mk' ? 700 : 500,
            color: activeTab === 'mk' ? 'var(--brand-bronze)' : 'var(--text-muted)',
            borderBottom: activeTab === 'mk' ? '2px solid var(--brand-gold)' : 'none',
            whiteSpace: 'nowrap'
          }}
        >
          மு. கருணாநிதி
        </button>
        <button
          onClick={() => setActiveTab('sp')}
          style={{
            padding: '0.4rem 0.75rem',
            fontSize: '0.85rem',
            fontWeight: activeTab === 'sp' ? 700 : 500,
            color: activeTab === 'sp' ? 'var(--brand-bronze)' : 'var(--text-muted)',
            borderBottom: activeTab === 'sp' ? '2px solid var(--brand-gold)' : 'none',
            whiteSpace: 'nowrap'
          }}
        >
          சாலமன் பாப்பையா
        </button>
        <button
          onClick={() => setActiveTab('en')}
          style={{
            padding: '0.4rem 0.75rem',
            fontSize: '0.85rem',
            fontWeight: activeTab === 'en' ? 700 : 500,
            color: activeTab === 'en' ? 'var(--brand-bronze)' : 'var(--text-muted)',
            borderBottom: activeTab === 'en' ? '2px solid var(--brand-gold)' : 'none',
            whiteSpace: 'nowrap'
          }}
        >
          English Translation
        </button>
      </div>

      {/* Commentary Content */}
      <div style={{ fontSize: '0.94rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
        {activeTab === 'mv' && <p>{kural.tamilExpMVaradarajan}</p>}
        {activeTab === 'mk' && <p>{kural.tamilExpMKarunanidhi}</p>}
        {activeTab === 'sp' && <p>{kural.tamilExpSPappaiah}</p>}
        {activeTab === 'en' && (
          <div>
            <p style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              "{kural.englishCouplet}"
            </p>
            <p>{kural.englishExp}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KuralCard;
