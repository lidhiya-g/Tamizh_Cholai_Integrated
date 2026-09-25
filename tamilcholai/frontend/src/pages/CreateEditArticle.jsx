import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PenSquare, Image, Upload, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { firestoreService } from '../services/firestoreService';
import { storageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const PRESET_COVERS = [
  { label: 'சங்க இலக்கியம் / பனை ஏடு', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80' },
  { label: 'கவிதை / பேனா', url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=80' },
  { label: 'கோவில் / சிற்பக்கலை', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80' },
  { label: 'தமிழ் பயிலகம்', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80' }
];

const CreateEditArticle = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { lang, t } = useLanguage();

  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('சங்க இலக்கியம்');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');
    try {
      const url = await storageService.uploadImage(file, 'articles');
      setCoverImage(url);
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !summary.trim()) {
      setError(lang === 'ta' ? 'தயவுசெய்து அனைத்து விவரங்களையும் பூர்த்தி செய்யவும்.' : 'Please fill all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const newArticle = await firestoreService.createArticle(
        {
          title: title.trim(),
          titleEn: titleEn.trim(),
          category,
          summary: summary.trim(),
          content: content.trim(),
          coverImage,
          readTime: `${Math.max(2, Math.ceil(content.split(' ').length / 150))} min read`
        },
        currentUser
      );

      navigate(`/articles/${newArticle.id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error publishing article');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section" style={{ paddingTop: '2rem' }}>
      <div className="container-narrow">
        <Link
          to="/articles"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            color: 'var(--brand-bronze)',
            marginBottom: '1.5rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} />
          <span>{lang === 'ta' ? 'கட்டுரைகள் பக்கத்திற்குத் திரும்பு' : 'Back to Articles'}</span>
        </Link>

        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gradient-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <PenSquare size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', margin: 0 }}>
                {lang === 'ta' ? 'புதிய படைப்பை உருவாக்குதல்' : 'Create New Literary Article'}
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {lang === 'ta' ? 'உங்கள் ஆய்வு, கவிதை அல்லது சிந்தனைகளை உலகத்தமிழரோடு பகிருங்கள்.' : 'Share your poem, literary reflection, or research with Tamil readers.'}
              </span>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title Tamil */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'ta' ? 'கட்டுரைத் தலைப்பு (தமிழில்) *' : 'Article Title (Tamil) *'}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder={lang === 'ta' ? 'எ.கா: சிலப்பதிகாரத்தில் இசை நுணுக்கங்கள்' : 'e.g. Silappathikaram Literary Aesthetics'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Title English Optional */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'ta' ? 'ஆங்கிலத் தலைப்பு (விருப்பப்பட்டால்)' : 'English Title (Optional)'}
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Musical Nuances in Silappathikaram"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">{lang === 'ta' ? 'பிரிவு / துறை *' : 'Category *'}</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="சங்க இலக்கியம்">சங்க இலக்கியம் (Sangam Literature)</option>
                <option value="புதுக்கவிதை">புதுக்கவிதை (Modern Poetry)</option>
                <option value="வரலாறு & கலை">வரலாறு & கலை (History & Arts)</option>
                <option value="தமிழ் கற்போம்">தமிழ் கற்போம் (Learn Tamil)</option>
              </select>
            </div>

            {/* Summary */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'ta' ? 'சுருக்கக் குறிப்பு (Summary) *' : 'Brief Summary *'}
              </label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder={lang === 'ta' ? 'இக்கட்டுரையின் சுருக்கத்தை 2 வரிகளில் குறிப்பிடவும்...' : 'A short 2-line preview of your piece...'}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>

            {/* Cover Image */}
            <div className="form-group">
              <label className="form-label">{lang === 'ta' ? 'முகப்புப் படம் (Cover Image)' : 'Cover Image'}</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                  <Upload size={16} />
                  <span>{uploadingImage ? (lang === 'ta' ? 'பதிவேறுகிறது...' : 'Uploading...') : (lang === 'ta' ? 'கணினியிலிருந்து படம் பதிவேற்றுக' : 'Upload from Device')}</span>
                  <input type="file" accept="image/*" onChange={handleImageFile} style={{ display: 'none' }} />
                </label>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {lang === 'ta' ? 'அல்லது கீழே உள்ள மாதிரிப் படத்தைத் தேர்ந்தெடுக்கவும்:' : 'or choose a preset cover:'}
                </span>
              </div>

              {/* Preset cover picker */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.65rem' }}>
                {PRESET_COVERS.map((preset) => (
                  <button
                    type="button"
                    key={preset.url}
                    onClick={() => setCoverImage(preset.url)}
                    style={{
                      height: '65px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: coverImage === preset.url ? '3px solid var(--brand-gold)' : '1px solid var(--border-light)',
                      position: 'relative',
                      padding: 0
                    }}
                  >
                    <img src={preset.url} alt={preset.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {coverImage === preset.url && (
                      <div style={{ position: 'absolute', top: '4px', right: '4px', background: 'var(--brand-gold)', borderRadius: '50%', padding: '2px', display: 'flex' }}>
                        <CheckCircle2 size={12} color="#ffffff" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="form-group">
              <label className="form-label">
                {lang === 'ta' ? 'முழுமையான கட்டுரை / கவிதை விவரம் *' : 'Full Content / Poetry *'}
              </label>
              <textarea
                className="form-textarea"
                rows={10}
                placeholder={lang === 'ta' ? 'உங்கள் விரிவான படைப்பை இங்கே தட்டச்சு செய்யவும்...' : 'Write your full content here...'}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
              <Link to="/articles" className="btn btn-secondary">
                {lang === 'ta' ? 'ரத்து' : 'Cancel'}
              </Link>
              <button type="submit" className="btn btn-primary" disabled={submitting} id="publish-article-btn">
                <PenSquare size={16} />
                <span>{submitting ? (lang === 'ta' ? 'வெளியிடப்படுகிறது...' : 'Publishing...') : (lang === 'ta' ? 'இப்போதே வெளியிடுக' : 'Publish Article')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEditArticle;
