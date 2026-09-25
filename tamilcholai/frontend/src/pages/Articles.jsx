import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Feather, PenSquare, Search, Filter } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { useLanguage } from '../context/LanguageContext';
import ArticleCard from '../components/articles/ArticleCard';

const Articles = () => {
  const { lang, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const data = await firestoreService.getArticles(selectedCategory);
      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, [selectedCategory]);

  const categories = [
    { id: 'all', labelTa: 'அனைத்தும்', labelEn: 'All' },
    { id: 'சங்க இலக்கியம்', labelTa: 'சங்க இலக்கியம்', labelEn: 'Sangam Literature' },
    { id: 'புதுக்கவிதை', labelTa: 'புதுக்கவிதை', labelEn: 'Modern Poetry' },
    { id: 'வரலாறு & கலை', labelTa: 'வரலாறு & கலை', labelEn: 'History & Arts' },
    { id: 'தமிழ் கற்போம்', labelTa: 'தமிழ் கற்போம்', labelEn: 'Learn Tamil' }
  ];

  const filteredArticles = articles.filter((a) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      a.title.toLowerCase().includes(term) ||
      (a.titleEn && a.titleEn.toLowerCase().includes(term)) ||
      a.summary.toLowerCase().includes(term) ||
      a.author.toLowerCase().includes(term)
    );
  });

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="badge badge-peacock" style={{ marginBottom: '0.5rem' }}>
              {t('articles')}
            </div>
            <h1 className="section-title" style={{ textAlign: 'left', margin: 0 }}>
              {lang === 'ta' ? 'இலக்கியக் கட்டுரைகள் & கவிதைகள்' : 'Articles, Essays & Modern Poetry'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              {lang === 'ta'
                ? 'பண்டைய சங்க காலம் முதல் இன்றைய நவீன இலக்கியம் வரையிலான ஆழமான படைப்புகள்.'
                : 'Explore rich perspectives spanning ancient Sangam to contemporary Tamil poetry.'}
            </p>
          </div>

          <Link to="/create-article" className="btn btn-primary" id="write-article-btn">
            <PenSquare size={16} />
            <span>{t('createArticle')}</span>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            background: 'var(--bg-surface)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)'
          }}
        >
          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`btn ${selectedCategory === c.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.35rem 0.85rem', fontSize: '0.84rem', borderRadius: 'var(--radius-full)' }}
              >
                {lang === 'ta' ? c.labelTa : c.labelEn}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', minWidth: '220px', maxWidth: '300px', width: '100%' }}>
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.2rem', paddingRight: '0.75rem', height: '38px', fontSize: '0.88rem' }}
              placeholder={lang === 'ta' ? 'கட்டுரை தேடுக...' : 'Search articles...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--brand-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          </div>
        ) : filteredArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
            <Feather size={40} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h4>{lang === 'ta' ? 'கட்டுரைகள் எதுவும் கிடைக்கவில்லை' : 'No articles found'}</h4>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {lang === 'ta' ? 'நீங்களே ஒரு புதிய கட்டுரையை முதன்முதலில் எழுதி வெளியிடுங்கள்!' : 'Be the first to publish a new piece!'}
            </p>
            <Link to="/create-article" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              <PenSquare size={16} />
              <span>{t('createArticle')}</span>
            </Link>
          </div>
        ) : (
          <div className="grid-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
