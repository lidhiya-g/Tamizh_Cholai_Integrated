import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Heart, Bookmark, Share2, ArrowLeft, Clock, User, Calendar, Trash2 } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CommentSection from '../components/articles/CommentSection';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { lang, t } = useLanguage();
  const { onOpenAuth } = useOutletContext() || {};

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      const data = await firestoreService.getArticleById(id);
      if (data) {
        setArticle(data);
        setLikesCount(data.likesCount || 0);
        setIsLiked(firestoreService.isArticleLiked(id));
        setIsBookmarked(firestoreService.isArticleBookmarked(id));
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  const handleLike = () => {
    if (!article) return;
    const result = firestoreService.toggleLike(article.id);
    setIsLiked(result.isLiked);
    setLikesCount(result.newCount);
  };

  const handleBookmark = () => {
    if (!article) return;
    const result = firestoreService.toggleBookmark(article);
    setIsBookmarked(result);
  };

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'ta' ? 'இணைப்பு நகலெடுக்கப்பட்டது!' : 'Link copied to clipboard!');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(lang === 'ta' ? 'நிச்சயமாக இக்கட்டுரையை நீக்க வேண்டுமா?' : 'Are you sure you want to delete this article?')) {
      return;
    }
    await firestoreService.deleteArticle(article.id);
    navigate('/articles');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 0' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--brand-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>{lang === 'ta' ? 'கட்டுரை கிடைக்கவில்லை' : 'Article Not Found'}</h2>
          <Link to="/articles" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            <ArrowLeft size={16} />
            <span>{lang === 'ta' ? 'கட்டுரைகள் பக்கத்திற்குத் திரும்பு' : 'Back to Articles'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = currentUser && (currentUser.uid === article.authorId || currentUser.email === article.author);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container-narrow">
        {/* Navigation Breadcrumb */}
        <Link
          to="/articles"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            color: 'var(--brand-bronze)',
            marginBottom: '1.75rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} />
          <span>{lang === 'ta' ? 'அனைத்து கட்டுரைகளுக்கும் திரும்பு' : 'Back to Articles'}</span>
        </Link>

        {/* Category & Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold">{article.category}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={13} /> {article.readTime || '4 min read'}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={13} /> {new Date(article.createdAt).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.25, marginBottom: '1.5rem', fontWeight: 800 }}>
          {lang === 'ta' ? article.title : article.titleEn || article.title}
        </h1>

        {/* Author Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-light)',
            paddingBottom: '1.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--gradient-gold)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem'
              }}
            >
              {article.author?.[0] || 'ப'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{article.author}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{article.authorRole || 'எழுத்தாளர்'}</div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleLike}
              className="btn btn-secondary"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.86rem', color: isLiked ? 'var(--brand-crimson)' : 'inherit' }}
            >
              <Heart size={16} fill={isLiked ? 'var(--brand-crimson)' : 'none'} color={isLiked ? 'var(--brand-crimson)' : 'currentColor'} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleBookmark}
              className="btn-icon"
              style={{ color: isBookmarked ? 'var(--brand-gold)' : 'inherit' }}
              title="Bookmark"
            >
              <Bookmark size={17} fill={isBookmarked ? 'var(--brand-gold)' : 'none'} />
            </button>

            <button onClick={handleShare} className="btn-icon" title="Share">
              <Share2 size={17} />
            </button>

            {isAuthor && (
              <button
                onClick={handleDelete}
                className="btn-icon"
                style={{ color: '#ef4444' }}
                title="Delete article"
              >
                <Trash2 size={17} />
              </button>
            )}
          </div>
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
            <img
              src={article.coverImage}
              alt={article.title}
              style={{ width: '100%', maxHeight: '440px', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Article Summary Box */}
        {article.summary && (
          <div
            style={{
              background: 'var(--bg-secondary)',
              borderLeft: '4px solid var(--brand-gold)',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              color: 'var(--text-secondary)'
            }}
          >
            "{article.summary}"
          </div>
        )}

        {/* Full Article Content */}
        <div
          style={{
            fontSize: '1.12rem',
            lineHeight: 1.85,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-line'
          }}
        >
          {article.content}
        </div>

        {/* Comments Section */}
        <CommentSection articleId={article.id} onOpenAuth={onOpenAuth} />
      </div>
    </div>
  );
};

export default ArticleDetail;
