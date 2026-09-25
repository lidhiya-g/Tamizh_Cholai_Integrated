import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { firestoreService } from '../../services/firestoreService';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../common/Modal';

const NewPostModal = ({ isOpen, onClose, onPostCreated, onOpenAuth }) => {
  const { currentUser } = useAuth();
  const { lang } = useLanguage();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('இலக்கிய விவாதம்');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'இலக்கிய விவாதம்',
    'திருக்குறள் சிந்தனை',
    'கவிதை அரங்கம்',
    'வரலாற்று வினாக்கள்',
    'மொழி வளர்ச்சி & சொல்லாக்கம்'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      onClose();
      if (onOpenAuth) onOpenAuth();
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError(lang === 'ta' ? 'தலைப்பு மற்றும் விவரத்தை நிரப்பவும்.' : 'Please enter title and content.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const created = await firestoreService.createPost({ title, category, content }, currentUser);
      if (onPostCreated) onPostCreated(created);
      setTitle('');
      setContent('');
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error creating post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lang === 'ta' ? 'புதிய உரையாடலைத் தொடங்குக' : 'Start a New Discussion'}
      maxWidth="580px"
    >
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.65rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">{lang === 'ta' ? 'உரையாடல் தலைப்பு' : 'Discussion Topic / Question'}</label>
          <input
            type="text"
            className="form-input"
            placeholder={lang === 'ta' ? 'எ.கா: சிலப்பதிகாரத்தில் மாதவியின் பங்கு என்ன?' : 'e.g. Favorite Sangam poetry couplet?'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">{lang === 'ta' ? 'துறை / பிரிவு' : 'Category'}</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">{lang === 'ta' ? 'உங்கள் கருத்து / கேள்வி' : 'Your Detailed Thoughts / Question'}</label>
          <textarea
            className="form-textarea"
            rows={5}
            placeholder={lang === 'ta' ? 'உங்கள் விரிவான கருத்துகள், கவிதைகள் அல்லது விவாதக் குறிப்புகளை இங்கே எழுதுங்கள்...' : 'Write your detailed perspectives or literary notes here...'}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            {lang === 'ta' ? 'ரத்து' : 'Cancel'}
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <Send size={15} />
            <span>{loading ? (lang === 'ta' ? 'பதிவாகிறது...' : 'Publishing...') : (lang === 'ta' ? 'வெளியிடுக' : 'Publish')}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewPostModal;
