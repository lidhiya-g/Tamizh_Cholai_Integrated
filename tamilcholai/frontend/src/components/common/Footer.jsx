import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Feather, GraduationCap, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { lang, t } = useLanguage();

  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        padding: '4.5rem 0 2rem 0',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gradient-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '1.3rem'
                }}
              >
                த
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-tamil)',
                  fontWeight: 800,
                  fontSize: '1.35rem',
                  color: 'var(--text-primary)'
                }}
              >
                {t('brandName')}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {t('footerAbout')}
            </p>
            <div
              style={{
                fontStyle: 'italic',
                fontSize: '0.86rem',
                color: 'var(--brand-bronze)',
                borderLeft: '2px solid var(--brand-gold)',
                paddingLeft: '0.75rem'
              }}
            >
              "யாதும் ஊரே யாவரும் கேளிர்"
              <br />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>— கணியன் பூங்குன்றனார், புறநானூறு</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.7px',
                marginBottom: '1.2rem',
                color: 'var(--text-primary)'
              }}
            >
              {t('footerQuickLinks')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/kural" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={14} color="var(--brand-gold)" />
                  <span>{t('kural')}</span>
                </Link>
              </li>
              <li>
                <Link to="/articles" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Feather size={14} color="var(--brand-gold)" />
                  <span>{t('articles')}</span>
                </Link>
              </li>
              <li>
                <Link to="/learn" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <GraduationCap size={14} color="var(--brand-gold)" />
                  <span>{t('learn')}</span>
                </Link>
              </li>
              <li>
                <Link to="/proverbs" style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} color="var(--brand-gold)" />
                  <span>{t('proverbs')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.7px',
                marginBottom: '1.2rem',
                color: 'var(--text-primary)'
              }}
            >
              {lang === 'ta' ? 'இலக்கியத் துறைகள்' : 'Literary Wings'}
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="badge badge-gold">{t('sangamLit')}</span>
              <span className="badge badge-peacock">{t('modernPoetry')}</span>
              <span className="badge badge-crimson">{t('historyArt')}</span>
              <span className="badge badge-gold">{t('learnTamilCat')}</span>
              <span className="badge badge-peacock">திருக்குறள்</span>
            </div>
          </div>

          {/* Tech Stack Info for Developer/Beginner */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.7px',
                marginBottom: '1.2rem',
                color: 'var(--text-primary)'
              }}
            >
              {lang === 'ta' ? 'தொழில்நுட்ப கட்டமைப்பு' : 'Built With'}
            </h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              React 19 • Vite • Cloud Firestore • Firebase Auth & Storage • Responsive CSS
            </p>
            <div
              style={{
                fontSize: '0.82rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-light)'
              }}
            >
              🌱 {lang === 'ta' ? 'அனைவருக்கும் எளிய மற்றும் திறந்த மென்பொருள் கட்டமைப்பு.' : 'Clean, simple, modular and beginner-friendly structure.'}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.86rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>{t('footerCopyright')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>{lang === 'ta' ? 'தமிழ்ப் பற்றோடு உருவாக்கப்பட்டது' : 'Crafted with devotion for Tamil'}</span>
            <Heart size={14} color="var(--brand-crimson)" fill="var(--brand-crimson)" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
