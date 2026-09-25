import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FirebaseSetupBanner from '../components/common/FirebaseSetupBanner';
import AuthModal from '../components/auth/AuthModal';

const MainLayout = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <FirebaseSetupBanner />
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />
      <main style={{ flex: 1 }}>
        <Outlet context={{ onOpenAuth: () => setAuthModalOpen(true) }} />
      </main>
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default MainLayout;
