import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0],
            photoURL: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            role: 'Author'
          });
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Restore demo user from localStorage if present
      const demoUser = authService.getCurrentUser();
      setCurrentUser(demoUser);
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setCurrentUser(user);
    return user;
  };

  const register = async (email, password, displayName) => {
    const user = await authService.register(email, password, displayName);
    setCurrentUser(user);
    return user;
  };

  const loginWithGoogle = async () => {
    const user = await authService.loginWithGoogle();
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  const resetPassword = async (email) => {
    return await authService.resetPassword(email);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        isConfigured: isFirebaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
