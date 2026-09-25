import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, User, Clock } from 'lucide-react';
import { firestoreService } from '../../services/firestoreService';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const CommentSection = ({ articleId, onOpenAuth }) => {
  const { currentUser } = useAuth();
  const { lang } = useLanguage();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await firestoreService.getComments(articleId);
      setComments(data);
    };
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    setSubmitting(true);
    try {
      const created = await firestoreService.addComment(articleId, commentText.trim(), currentUser);
      setComments((prev) => [created, ...prev]);
      setCommentText('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-light)', paddingTop: '2.5rem' }} id="comments">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <MessageSquare size={22} color="var(--brand-gold)" />
        <h3 style={{ fontSize: '1.4rem', margin: 0 }}>
          {lang === 'ta' ? 'கருத்துரைகள்' : 'Discussion & Comments'} ({comments.length})
        </h3>
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--brand-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 700,
              flexShrink: 0
            }}
          >
            {currentUser?.displayName?.[0] || 'வ'}
          </div>
          <div style={{ flex: 1 }}>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder={
                currentUser
                  ? (lang === 'ta' ? 'இக்கட்டுரை குறித்த உங்கள் சிந்தனைகளைப் பகிர்க...' : 'Share your thoughts on this article...')
                  : (lang === 'ta' ? 'கருத்துரை எழுத உள்நுழையவும்...' : 'Please sign in to leave a comment...')
              }
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.65rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || !commentText.trim()}
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem' }}
              >
                <Send size={15} />
                <span>{submitting ? (lang === 'ta' ? 'பதிவாகிறது...' : 'Posting...') : (lang === 'ta' ? 'கருத்துரை பதிவு செய்' : 'Post Comment')}</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {comments.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            {lang === 'ta' ? 'இன்னும் கருத்துரைகள் இல்லை. நீங்களே முதல் கருத்தைப் பதிவு செய்யுங்கள்!' : 'No comments yet. Be the first to share your thoughts!'}
          </div>
        ) : (
          comments.map((comm) => (
            <div
              key={comm.id}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(10, 147, 150, 0.15)',
                      color: 'var(--brand-peacock)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    {comm.userName?.[0] || 'த'}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem' }}>{comm.userName}</span>
                    {comm.userRole && (
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        • {comm.userRole}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  <span>{new Date(comm.createdAt).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-US')}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, paddingLeft: '2.5rem' }}>
                {comm.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
