import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Feather,
  GraduationCap,
  MessageSquare,
  Sparkles,
  PenSquare,
  User,
  LogOut,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Navbar = ({ onOpenAuth }) => {
  const { currentUser, logout } = useAuth();
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('home'), icon: Compass },
    { to: '/kural', label: t('kural'), icon: BookOpen },
    { to: '/articles', label: t('articles'), icon: Feather },
    { to: '/learn', label: t('learn'), icon: GraduationCap },
    { to: '/forum', label: t('forum'), icon: MessageSquare },
    { to: '/proverbs', label: t('proverbs'), icon: Sparkles }
  ];

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <header
      className="glass-panel"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '74px'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--gradient-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 900,
              fontSize: '1.4rem',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            த
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-tamil)',
                fontWeight: 800,
                fontSize: '1.35rem',
                lineHeight: 1.1,
                letterSpacing: '-0.3px',
                background: 'linear-gradient(135deg, var(--brand-bronze), var(--brand-crimson))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {t('brandName')}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                letterSpacing: '0.4px'
              }}
            >
              {lang === 'ta' ? 'இலக்கிய & பண்பாட்டுச் சோலை' : 'Classical Tamil Heritage'}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.92rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--brand-bronze)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(238, 155, 0, 0.12)' : 'transparent',
                  transition: 'all var(--transition-fast)'
                })}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Write Article Button */}
          <Link
            to="/create-article"
            className="btn btn-primary desktop-nav"
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.86rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <PenSquare size={15} />
            <span>{t('createArticle')}</span>
          </Link>

          {/* Language Switcher */}
          <LanguageToggle />

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* User Auth Menu */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid var(--border-light)',
                  background: 'var(--bg-surface)'
                }}
                id="user-profile-menu-btn"
              >
                <img
                  src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={currentUser.displayName}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentUser.displayName}
                </span>
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '210px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.5rem',
                    zIndex: 110,
                    animation: 'fadeIn 0.15s ease-out'
                  }}
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-light)', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{currentUser.displayName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem'
                    }}
                    className="dropdown-item"
                  >
                    <User size={15} />
                    <span>{t('profile')}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      width: '100%',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.88rem',
                      color: 'var(--brand-crimson)',
                      textAlign: 'left'
                    }}
                    className="dropdown-item"
                  >
                    <LogOut size={15} />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn btn-secondary"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-full)'
              }}
              id="nav-login-btn"
            >
              <User size={15} />
              <span>{t('login')}</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-toggle"
            aria-label="பட்டி மெனுவை திறக்க"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: '1px solid var(--border-light)',
            background: 'var(--bg-surface)',
            padding: '1rem 1.5rem',
            animation: 'slideUp 0.2s ease-out'
          }}
          className="mobile-drawer"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                >
                  <Icon size={18} color="var(--brand-gold)" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              to="/create-article"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: '0.5rem', width: '100%' }}
            >
              <PenSquare size={16} />
              <span>{t('createArticle')}</span>
            </Link>
          </div>
        </div>
      )}

      {/* Style for responsive toggle visibility */}
      <style>{`
        .dropdown-item:hover {
          background: var(--bg-secondary);
        }
        @media (min-width: 993px) {
          .mobile-toggle, .mobile-drawer {
            display: none !important;
          }
        }
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
