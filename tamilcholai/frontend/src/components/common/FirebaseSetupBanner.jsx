import React, { useState } from 'react';
import { Database, ExternalLink, CheckCircle2, Copy, X } from 'lucide-react';
import { isFirebaseConfigured } from '../../firebase/config';
import { useLanguage } from '../../context/LanguageContext';
import Modal from './Modal';

const FirebaseSetupBanner = () => {
  const { lang } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('tamilcholai_hide_fb_banner') === 'true';
  });
  const [copied, setCopied] = useState(false);

  if (isFirebaseConfigured || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('tamilcholai_hide_fb_banner', 'true');
  };

  const sampleEnvText = `VITE_FIREBASE_API_KEY=AIzaSy...your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef...`;

  const copyEnvSnippet = () => {
    navigator.clipboard.writeText(sampleEnvText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(90deg, #ca6702 0%, #ee9b00 100%)',
          color: '#ffffff',
          padding: '0.5rem 1rem',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          zIndex: 90
        }}
        id="firebase-status-banner"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={16} />
          <span>
            {lang === 'ta'
              ? '✨ தமிழ்ச்சோலை இயங்குகிறது (டெமோ பயன்முறை - மாதிரித் தகவல்கள் தயார்).'
              : '✨ Tamilcholai is running in Demo Mode with rich sample data.'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: '#ffffff',
              color: '#9b2226',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {lang === 'ta' ? 'பயர்பேஸ் இணைக்க வழிகாட்டி' : 'Connect Real Firebase'}
          </button>
          <button
            onClick={handleDismiss}
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex' }}
            title="Dismiss notice"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={lang === 'ta' ? 'பயர்பேஸ் (Firebase) இணைப்பது எப்படி?' : 'How to Connect Your Firebase Project'}
        maxWidth="620px"
      >
        <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '1rem' }}>
            {lang === 'ta'
              ? 'நீங்கள் ஒரு தொடக்கநிலை பயனர் (Beginner) என்றாலும், 3 எளிய படிகளில் உங்கள் சொந்த பயர்பேஸ் தரவுத்தளத்தை இணைக்கலாம்:'
              : 'Follow these 3 easy steps to connect your own free Google Firebase backend:'}
          </p>

          <ol style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <li>
              <strong>1. {lang === 'ta' ? 'திட்டம் தொடங்குதல்' : 'Create Project'}: </strong>
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--brand-bronze)', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
              >
                Firebase Console <ExternalLink size={13} />
              </a>{' '}
              {lang === 'ta' ? 'சென்று "Add project" கொடுத்து திட்டத்தை உருவாக்கவும்.' : 'and create a new project.'}
            </li>
            <li>
              <strong>2. {lang === 'ta' ? 'சேவைகளை இயக்குதல்' : 'Enable Services'}: </strong>
              {lang === 'ta'
                ? 'Authentication (Email/Password), Cloud Firestore மற்றும் Storage சேவைகளை Build மெனுவில் ஆன் (Enable) செய்யவும்.'
                : 'Enable Authentication (Email/Password), Cloud Firestore, and Firebase Storage.'}
            </li>
            <li>
              <strong>3. {lang === 'ta' ? 'ரகசிய குறியீடுகளை நகலெடுத்தல்' : 'Add Web App & Copy Keys'}: </strong>
              {lang === 'ta'
                ? 'Web (</>) ஆப் உருவாக்கி, கிடைக்கும் விபரங்களை frontend/.env கோப்பில் சேமிக்கவும்.'
                : 'Register a Web App (</>) and paste the configuration keys into frontend/.env:'}
            </li>
          </ol>

          <div
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem',
              position: 'relative',
              marginBottom: '1.25rem'
            }}
          >
            <pre style={{ margin: 0, fontSize: '0.78rem', overflowX: 'auto', fontFamily: 'monospace' }}>
              {sampleEnvText}
            </pre>
            <button
              onClick={copyEnvSnippet}
              className="btn btn-secondary"
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            >
              {copied ? <CheckCircle2 size={13} color="#2a9d8f" /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div style={{ textAlign: 'right' }}>
            <button onClick={() => setShowModal(false)} className="btn btn-primary">
              {lang === 'ta' ? 'சரி, புரிந்தது!' : 'Got it, thanks!'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FirebaseSetupBanner;
