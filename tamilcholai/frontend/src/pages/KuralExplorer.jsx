import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Volume2 } from 'lucide-react';
import { searchKurals } from '../services/kuralData';
import { useLanguage } from '../context/LanguageContext';
import KuralCard from '../components/kural/KuralCard';

const KuralExplorer = () => {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedPal, setSelectedPal] = useState('all');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
    const filtered = searchKurals(urlQuery, selectedPal);
    setResults(filtered);
  }, [searchParams, selectedPal]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
    const filtered = searchKurals(query, selectedPal);
    setResults(filtered);
  };

  const handlePalChange = (pal) => {
    setSelectedPal(pal);
    const filtered = searchKurals(query, pal);
    setResults(filtered);
  };

  const palOptions = [
    { id: 'all', labelTa: 'அனைத்துப் பால்களும் (All)', labelEn: 'All Sections' },
    { id: 'அறத்துப்பால்', labelTa: 'அறத்துப்பால் (Virtue)', labelEn: 'Virtue (Arathuppal)' },
    { id: 'பொருட்பால்', labelTa: 'பொருட்பால் (Wealth)', labelEn: 'Wealth (Porutpal)' },
    { id: 'காமத்துப்பால்', labelTa: 'காமத்துப்பால் (Love)', labelEn: 'Love (Kammathuppal)' }
  ];

  return (
    <div className="section">
      <div className="container">
        {/* Page Header */}
        <div className="section-title-wrap">
          <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
            {lang === 'ta' ? 'உலகப் பொதுமறை' : 'Universal Tamil Ethical Classic'}
          </div>
          <h1 className="section-title">
            {lang === 'ta' ? 'திருக்குறள் அரங்கம்' : 'Thirukkural Explorer'}
          </h1>
          <p className="section-subtitle">
            {lang === 'ta'
              ? '1330 குறட்பாக்களையும் ஒலி உச்சரிப்பு, மு.வ, கலைஞர், சாலமன் பாப்பையா உரைகள் மற்றும் ஆங்கில விளக்கத்துடன் தேடிக் கற்கவும்.'
              : 'Search and listen to all 1330 couplets with authentic commentaries and English translations.'}
          </p>
          <div className="title-ornament">
            <span className="title-ornament-line" />
            <span className="title-ornament-dot" />
            <span className="title-ornament-line" />
          </div>
        </div>

        {/* Search & Filters Controls */}
        <div
          className="card"
          style={{
            maxWidth: '860px',
            margin: '0 auto 2.5rem auto',
            padding: '1.5rem',
            background: 'var(--bg-surface)'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder={lang === 'ta' ? 'குறள் எண் (1-1330) அல்லது சொல் தேடுக...' : 'Search by Kural number (1-1330) or phrase...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                id="kural-search-input"
              />
              <Search
                size={18}
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" id="kural-search-btn">
              {lang === 'ta' ? 'தேடுக' : 'Search'}
            </button>
          </form>

          {/* Pal Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Filter size={14} /> {lang === 'ta' ? 'பால்' : 'Section'}:
            </span>
            {palOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handlePalChange(opt.id)}
                className={`btn ${selectedPal === opt.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.3rem 0.85rem', fontSize: '0.82rem', borderRadius: 'var(--radius-full)' }}
              >
                {lang === 'ta' ? opt.labelTa : opt.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ maxWidth: '860px', margin: '0 auto 1.5rem auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <span>
            {lang === 'ta' ? 'காணப்படும் குறள்கள்' : 'Kurals found'}: <strong>{results.length}</strong>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Volume2 size={15} color="var(--brand-gold)" />
            {lang === 'ta' ? 'ஒலி உச்சரிப்பு வசதி இணைக்கப்பட்டுள்ளது' : 'Audio recitation enabled'}
          </span>
        </div>

        {/* Results List */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
              <BookOpen size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
              <h4>{lang === 'ta' ? 'குறள்கள் எதுவும் கிடைக்கவில்லை' : 'No Kurals found'}</h4>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                {lang === 'ta' ? 'வேறு சொல் அல்லது குறள் எண்ணைக் கொண்டு தேடவும்.' : 'Try a different keyword or Kural number.'}
              </p>
            </div>
          ) : (
            results.map((kural) => <KuralCard key={kural.number} kural={kural} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default KuralExplorer;
