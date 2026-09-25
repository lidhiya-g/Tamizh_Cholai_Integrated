import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Clock, User } from 'lucide-react';
import { firestoreService } from '../../services/firestoreService';
import { useLanguage } from '../../context/LanguageContext';

const PostCard = ({ post }) => {
  const { lang } = useLanguage();
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = async () => {
    if (hasUpvoted) return;
    const newCount = await firestoreService.upvotePost(post.id);
    setUpvotes(newCount);
    setHasUpvoted(true);
  };

  return (
    <div className="card" style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem' }}>
      {/* Upvote side button */}
      <button
        onClick={handleUpvote}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-md)',
          background: hasUpvoted ? 'rgba(238, 155, 0, 0.15)' : 'var(--bg-secondary)',
          border: hasUpvoted ? '1.5px solid var(--brand-gold)' : '1px solid var(--border-light)',
          color: hasUpvoted ? 'var(--brand-bronze)' : 'var(--text-secondary)',
          cursor: hasUpvoted ? 'default' : 'pointer',
          alignSelf: 'flex-start',
          minWidth: '52px',
          transition: 'all 0.2s'
        }}
        title="Upvote discussion"
      >
        <ThumbsUp size={18} />
        <span style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.2rem' }}>{upvotes}</span>
      </button>

      {/* Post body */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
            {post.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            • {new Date(post.createdAt).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US')}
          </span>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>
          {lang === 'ta' ? post.title : post.titleEn || post.title}
        </h3>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem', whiteSpace: 'pre-line' }}>
          {post.content}
        </p>

        {/* Footer info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <User size={14} />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{post.author}</span>
            {post.authorRole && <span>({post.authorRole})</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <MessageSquare size={14} />
            <span>{post.repliesCount || 0} {lang === 'ta' ? 'பதில்கள்' : 'replies'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
