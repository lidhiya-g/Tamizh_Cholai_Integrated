import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MessageSquare, PlusCircle, Filter } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { useLanguage } from '../context/LanguageContext';
import PostCard from '../components/forum/PostCard';
import NewPostModal from '../components/forum/NewPostModal';

const CommunityForum = () => {
  const { lang, t } = useLanguage();
  const { onOpenAuth } = useOutletContext() || {};
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await firestoreService.getPosts(selectedCategory);
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [selectedCategory]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const categories = [
    'all',
    'இலக்கிய விவாதம்',
    'திருக்குறள் சிந்தனை',
    'கவிதை அரங்கம்',
    'வரலாற்று வினாக்கள்'
  ];

  return (
    <div className="section">
      <div className="container-narrow">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
              {t('forum')}
            </div>
            <h1 className="section-title" style={{ textAlign: 'left', margin: 0 }}>
              {lang === 'ta' ? 'இலக்கிய உரையாடல் களம்' : 'Literary Community Forum'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
              {lang === 'ta'
                ? 'உங்கள் இலக்கியக் கருத்துகள், கவிதைகள் மற்றும் ஐயங்களை சக வாசகர்களுடன் பகிர்ந்து விவாதிக்கவும்.'
                : 'Connect with fellow Tamil scholars, readers, and poets. Share thoughts and raise questions.'}
            </p>
          </div>

          <button onClick={() => setModalOpen(true)} className="btn btn-primary" id="new-discussion-btn">
            <PlusCircle size={16} />
            <span>{lang === 'ta' ? 'புதிய உரையாடல்' : 'Start Discussion'}</span>
          </button>
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.84rem', borderRadius: 'var(--radius-full)' }}
            >
              {cat === 'all' ? (lang === 'ta' ? 'அனைத்து தலைப்புகளும்' : 'All Topics') : cat}
            </button>
          ))}
        </div>

        {/* Posts Stream */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--brand-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
            <MessageSquare size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h4>{lang === 'ta' ? 'உரையாடல்கள் எதுவும் இல்லை' : 'No discussions yet'}</h4>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {lang === 'ta' ? 'நீங்களே முதல் கேள்வியையோ அல்லது கவிதையையோ பகிருங்கள்!' : 'Be the first to ignite an interesting discussion!'}
            </p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}

        {/* New Post Modal */}
        <NewPostModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onPostCreated={handlePostCreated}
          onOpenAuth={onOpenAuth}
        />
      </div>
    </div>
  );
};

export default CommunityForum;
