import React, { useState } from 'react';
import { Sparkles, Search, Volume2, Copy, CheckCircle2 } from 'lucide-react';
import { TAMIL_PROVERBS } from '../services/proverbsData';
import { useSpeech } from '../hooks/useSpeech';
import { useLanguage } from '../context/LanguageContext';

const Proverbs = () => {
  const { lang, t } = useLanguage();
  const { speak } = useSpeech();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredProverbs = TAMIL_PROVERBS.filter((p) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.tamil.toLowerCase().includes(term) ||
      p.englishTitle.toLowerCase().includes(term) ||
      p.explanationTa.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  });

  const handleCopy = (prov) => {
    navigator.clipboard.writeText(`${prov.tamil}\n${prov.englishTitle}\nவிளக்கம்: ${prov.explanationTa}\n\n- தமிழ்ச்சோலை`);
    setCopiedId(prov.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            {lang === 'ta' ? 'முன்னோர் வாழ்வியல் ஞானம்' : 'Timeless Tamil Wisdom'}
          </div>
          <h1 className="section-title">
            {lang === 'ta' ? 'பழமொழிகள் & மரபுத்தொடர்கள்' : 'Tamil Proverbs & Idioms'}
          </h1>
          <p className="section-subtitle">
            {lang === 'ta'
              ? 'தலைமுறை தலைமுறையாக வாழ்வனுபவங்களால் செதுக்கப்பட்ட பழமொழிகளும் அவற்றின் ஆழமான வாழ்வியல் விளக்கங்களும்.'
              : 'Cherished Tamil proverbs passed down generations, paired with English equivalents and practical philosophy.'}
          </p>
          <div className="title-ornament">
            <span className="title-ornament-line" />
            <span className="title-ornament-dot" />
            <span className="title-ornament-line" />
          </div>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder={lang === 'ta' ? 'பழமொழி அல்லது பொருள் தேடுக...' : 'Search proverbs or meanings...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        {/* Proverbs Grid */}
        <div className="grid-2">
          {filteredProverbs.map((prov) => (
            <div key={prov.id} className="card card-gold-border" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                  {prov.category}
                </span>

                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    onClick={() => speak(prov.tamil)}
                    className="btn-icon"
                    style={{ width: '32px', height: '32px' }}
                    title="Pronounce proverb"
                  >
                    <Volume2 size={15} />
                  </button>
                  <button
                    onClick={() => handleCopy(prov)}
                    className="btn-icon"
                    style={{ width: '32px', height: '32px' }}
                    title="Copy proverb"
                  >
                    {copiedId === prov.id ? <CheckCircle2 size={15} color="#10b981" /> : <Copy size={15} />}
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-tamil)', color: 'var(--brand-bronze)', marginBottom: '0.45rem' }}>
                "{prov.tamil}"
              </h3>

              <div style={{ fontSize: '0.88rem', fontStyle: 'italic', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
                English: {prov.englishTitle}
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: 'auto', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                <strong>{lang === 'ta' ? 'விளக்கம்' : 'Meaning'}:</strong> {lang === 'ta' ? prov.explanationTa : prov.explanationEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proverbs;
