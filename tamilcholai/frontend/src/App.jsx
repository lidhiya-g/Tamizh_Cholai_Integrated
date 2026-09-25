import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import TamilcholaiChatbot from './components/TamilcholaiChatbot';

// Pages
import Home from './pages/Home';
import KuralExplorer from './pages/KuralExplorer';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import CreateEditArticle from './pages/CreateEditArticle';
import LearnTamil from './pages/LearnTamil';
import CommunityForum from './pages/CommunityForum';
import Proverbs from './pages/Proverbs';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                <Route path="kural" element={<KuralExplorer />} />

                <Route path="articles" element={<Articles />} />

                <Route path="articles/:id" element={<ArticleDetail />} />

                <Route
                  path="create-article"
                  element={
                    <ProtectedRoute>
                      <CreateEditArticle />
                    </ProtectedRoute>
                  }
                />

                <Route path="learn" element={<LearnTamil />} />

                <Route path="forum" element={<CommunityForum />} />

                <Route path="proverbs" element={<Proverbs />} />

                <Route
                  path="profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>

            {/* Tamilcholai Chatbot */}
            <TamilcholaiChatbot />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
