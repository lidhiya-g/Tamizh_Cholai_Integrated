import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Bookmark, Feather, LogOut, Heart, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { firestoreService } from '../services/firestoreService';
import ArticleCard from '../components/articles/ArticleCard';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('bookmarks'); // 'bookmarks' | 'myArticles'
  const [bookmarks, setBookmarks] = useState([]);
  const [myArticles, setMyArticles] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      // Bookmarks
      const saved = firestoreService.getBookmarks();
      setBookmarks(saved);

      // Authored articles
      const allArticles = await firestoreService.getArticles();
      const authored = allArticles.filter(
        (a) => a.authorId === currentUser?.uid || a.author === currentUser?.displayName
      );
      setMyArticles(authored);
    };
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Profile Card Header */}
        <div
          className="card"
          style={{
            maxWidth: '860px',
            margin: '0 auto 2.5rem auto',
            padding: '2rem',
            background: 'var(--gradient-card)',
            borderTop: '4px solid var(--brand-gold)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img
                src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={currentUser.displayName}
                style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--brand-gold)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{currentUser.displayName}</h2>
                  <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                    {currentUser.role || 'வாசகர்'}
                  </span>
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {currentUser.email}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                  "{currentUser.bio || 'தமிழை நேசிக்கும் ஒரு வாசகர்'}"
                </p>
              </div>
            </div>

            <button onClick={handleLogout} className="btn btn-secondary" style={{ color: 'var(--brand-crimson)' }}>
              <LogOut size={16} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: '860px', margin: '0 auto 2rem auto', display: 'flex', borderBottom: '1px solid var(--border-light)', gap: '1.5rem' }}>
          <button
            onClick={() => setActiveTab('bookmarks')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.75rem 0.25rem',
              fontSize: '1rem',
              fontWeight: 700,
              color: activeTab === 'bookmarks' ? 'var(--brand-bronze)' : 'var(--text-muted)',
              borderBottom: activeTab === 'bookmarks' ? '2.5px solid var(--brand-gold)' : 'none',
              cursor: 'pointer'
            }}
          >
            <Bookmark size={18} />
            <span>{lang === 'ta' ? 'சேமிக்கப்பட்ட கட்டுரைகள்' : 'Saved Bookmarks'} ({bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('myArticles')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.75rem 0.25rem',
              fontSize: '1rem',
              fontWeight: 700,
              color: activeTab === 'myArticles' ? 'var(--brand-bronze)' : 'var(--text-muted)',
              borderBottom: activeTab === 'myArticles' ? '2.5px solid var(--brand-gold)' : 'none',
              cursor: 'pointer'
            }}
          >
            <Feather size={18} />
            <span>{lang === 'ta' ? 'என் படைப்புகள்' : 'My Authored Pieces'} ({myArticles.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {activeTab === 'bookmarks' && (
            <div>
              {bookmarks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
                  <Bookmark size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4>{lang === 'ta' ? 'இன்னும் கட்டுரைகள் எதுவும் சேமிக்கப்படவில்லை' : 'No bookmarked articles yet'}</h4>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    {lang === 'ta' ? 'கட்டுரைகளை வாசிக்கும்போது குறிசொடுக்கினால் அவை இங்கே சேமிக்கப்படும்.' : 'Click the bookmark icon on any article to save it here for later reading.'}
                  </p>
                  <Link to="/articles" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    <span>{lang === 'ta' ? 'கட்டுரைகளைத் தேடுக' : 'Explore Articles'}</span>
                  </Link>
                </div>
              ) : (
                <div className="grid-2">
                  {bookmarks.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'myArticles' && (
            <div>
              {myArticles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
                  <Feather size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4>{lang === 'ta' ? 'நீங்கள் இன்னும் எந்தக் கட்டுரையும் வெளியிடவில்லை' : 'You haven’t written any articles yet'}</h4>
                  <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    {lang === 'ta' ? 'உங்கள் முதல் இலக்கியக் கட்டுரையை இன்றே எழுதி உலகத்தோடு பகிருங்கள்!' : 'Compose and publish your first Tamil article or poem today!'}
                  </p>
                  <Link to="/create-article" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    <span>{t('createArticle')}</span>
                  </Link>
                </div>
              ) : (
                <div className="grid-2">
                  {myArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
