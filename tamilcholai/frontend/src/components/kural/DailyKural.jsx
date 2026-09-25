import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDailyKural } from '../../services/kuralData';
import { useLanguage } from '../../context/LanguageContext';
import KuralCard from './KuralCard';

const DailyKural = () => {
  const { lang, t } = useLanguage();
  const dailyKural = getDailyKural();

  return (
    <div
      style={{
        background: 'var(--gradient-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(238, 155, 0, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-gold)'
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', margin: 0 }}>{t('dailyKuralTitle')}</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {lang === 'ta' ? 'அறிவும் அறமும் புகட்டும் உலகப் பொதுமறை' : 'Universal Tamil ethical wisdom for every day'}
            </span>
          </div>
        </div>

        <Link
          to="/kural"
          className="btn btn-secondary"
          style={{ fontSize: '0.88rem', padding: '0.4rem 0.85rem' }}
        >
          <span>{t('viewAllKurals')}</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      <KuralCard kural={dailyKural} />
    </div>
  );
};

export default DailyKural;
