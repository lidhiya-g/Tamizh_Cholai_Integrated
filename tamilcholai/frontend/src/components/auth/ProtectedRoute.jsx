import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, onOpenAuth }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--border-light)', borderTopColor: 'var(--brand-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!currentUser) {
    if (onOpenAuth) onOpenAuth();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
