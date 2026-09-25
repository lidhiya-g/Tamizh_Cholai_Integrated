import React, { useState } from 'react';
import { Mail, Lock, User, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Modal from '../common/Modal';

const AuthModal = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const { login, register, resetPassword } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        onClose();
        resetForm();
      } else if (mode === 'register') {
        if (!name.trim()) {
          throw new Error(lang === 'ta' ? 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.' : 'Please enter your name.');
        }
        await register(email, password, name);
        onClose();
        resetForm();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setMessage(lang === 'ta' ? 'கடவுச்சொல் மீட்டெடுப்பு மின்னஞ்சல் அனுப்பப்பட்டது.' : 'Password reset link sent to your email.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Instant demo user sign-in for seamless beginner testing
  const handleQuickDemo = async () => {
    setLoading(true);
    try {
      await login('vanakkam@tamilcholai.org', 'demo123456');
      onClose();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'login'
          ? (lang === 'ta' ? 'தமிழ்ச்சோலையில் உள்நுழைக' : 'Sign in to Tamilcholai')
          : mode === 'register'
          ? (lang === 'ta' ? 'புதிய கணக்கை உருவாக்குக' : 'Create an Account')
          : (lang === 'ta' ? 'கடவுச்சொல் மீட்டெடுப்பு' : 'Reset Password')
      }
      maxWidth="460px"
    >
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="form-group">
            <label className="form-label">{lang === 'ta' ? 'உங்கள் முழுப் பெயர்' : 'Full Name'}</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder={lang === 'ta' ? 'எ.கா: இளங்கோ' : 'e.g. Ilango'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <User size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">{lang === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        {mode !== 'forgot' && (
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label className="form-label" style={{ margin: 0 }}>
                {lang === 'ta' ? 'கடவுச்சொல்' : 'Password'}
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  style={{ fontSize: '0.8rem', color: 'var(--brand-bronze)', textDecoration: 'underline' }}
                >
                  {lang === 'ta' ? 'மறந்துவிட்டதா?' : 'Forgot?'}
                </button>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
              <Lock size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '0.75rem' }}
          disabled={loading}
          id="auth-submit-btn"
        >
          {loading ? (
            <span>{lang === 'ta' ? 'செயல்பாட்டில் உள்ளது...' : 'Processing...'}</span>
          ) : mode === 'login' ? (
            t('login')
          ) : mode === 'register' ? (
            t('register')
          ) : (
            lang === 'ta' ? 'மீட்டெடுப்பு இணைப்பை அனுப்புக' : 'Send Reset Link'
          )}
        </button>
      </form>

      {/* Quick Demo Login Option */}
      <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
        <button
          type="button"
          onClick={handleQuickDemo}
          className="btn btn-secondary"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'var(--bg-secondary)' }}
          id="quick-demo-login-btn"
        >
          <Sparkles size={16} color="var(--brand-gold)" />
          <span style={{ fontWeight: 600 }}>
            {lang === 'ta' ? 'விரைவு மாதிரி உள்நுழைவு (Demo Login)' : 'Quick 1-Click Demo Login'}
          </span>
        </button>
      </div>

      <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.88rem' }}>
        {mode === 'login' ? (
          <p>
            {lang === 'ta' ? 'புதிய வாசகரா?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              style={{ color: 'var(--brand-bronze)', fontWeight: 700, textDecoration: 'underline' }}
            >
              {lang === 'ta' ? 'இப்போதே பதிவு செய்க' : 'Sign Up'}
            </button>
          </p>
        ) : (
          <p>
            {lang === 'ta' ? 'ஏற்கனவே கணக்கு உள்ளதா?' : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              style={{ color: 'var(--brand-bronze)', fontWeight: 700, textDecoration: 'underline' }}
            >
              {lang === 'ta' ? 'உள்நுழைக' : 'Sign In'}
            </button>
          </p>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
