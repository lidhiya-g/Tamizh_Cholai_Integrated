import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, MessageSquare, Clock, ArrowUpRight } from 'lucide-react';
import { firestoreService } from '../../services/firestoreService';
import { useLanguage } from '../../context/LanguageContext';

const ArticleCard = ({ article, onLikeChange }) => {
  const { lang, t } = useLanguage();
  const [isLiked, setIsLiked] = useState(() => firestoreService.isArticleLiked(article.id));
  const [likesCount, setLikesCount] = useState(article.likesCount || 0);
  const [isBookmarked, setIsBookmarked] = useState(() => firestoreService.isArticleBookmarked(article.id));

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = firestoreService.toggleLike(article.id);
    setIsLiked(result.isLiked);
    setLikesCount(result.newCount);
    if (onLikeChange) onLikeChange(article.id, result.newCount);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = firestoreService.toggleBookmark(article);
    setIsBookmarked(result);
  };

  // Badge category colors
  const getCategoryClass = (cat) => {
    if (cat?.includes('சங்க') || cat?.includes('Sangam')) return 'badge-gold';
    if (cat?.includes('கவிதை') || cat?.includes('Poetry')) return 'badge-peacock';
    if (cat?.includes('வரலாறு') || cat?.includes('History')) return 'badge-crimson';
    return 'badge-gold';
  };

  return (
    <article className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Cover Image */}
      <Link to={`/articles/${article.id}`} style={{ overflow: 'hidden', height: '210px', display: 'block', position: 'relative' }}>
        <img
          src={article.coverImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'}
          alt={article.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          className="article-img-hover"
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span className={`badge ${getCategoryClass(article.category)}`}>
            {lang === 'ta' ? article.category : article.categoryEn || article.category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
          <Clock size={13} />
          <span>{article.readTime || '4 min read'}</span>
          <span>•</span>
          <span>{new Date(article.createdAt).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US', { month: 'short', day: 'numeric' })}</span>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', lineHeight: 1.4 }}>
          <Link
            to={`/articles/${article.id}`}
            style={{ color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <span>{lang === 'ta' ? article.title : article.titleEn || article.title}</span>
          </Link>
        </h3>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1, lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {article.summary}
        </p>

        {/* Footer Meta & Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-light)',
            paddingTop: '0.85rem',
            marginTop: 'auto'
          }}
        >
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {article.author}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {/* Like */}
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.82rem',
                color: isLiked ? 'var(--brand-crimson)' : 'var(--text-muted)'
              }}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart size={16} fill={isLiked ? 'var(--brand-crimson)' : 'none'} color={isLiked ? 'var(--brand-crimson)' : 'currentColor'} />
              <span>{likesCount}</span>
            </button>

            {/* Comments */}
            <Link
              to={`/articles/${article.id}#comments`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.82rem',
                color: 'var(--text-muted)'
              }}
              title="Comments"
            >
              <MessageSquare size={16} />
              <span>{article.commentsCount || 0}</span>
            </Link>

            {/* Bookmark */}
            <button
              onClick={handleBookmark}
              style={{
                display: 'flex',
                alignItems: 'center',
                color: isBookmarked ? 'var(--brand-gold)' : 'var(--text-muted)'
              }}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
            >
              <Bookmark size={16} fill={isBookmarked ? 'var(--brand-gold)' : 'none'} color={isBookmarked ? 'var(--brand-gold)' : 'currentColor'} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .article-img-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </article>
  );
};

export default ArticleCard;
