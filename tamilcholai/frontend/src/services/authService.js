import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../firebase/config';

// Local storage key for demo session
const DEMO_USER_KEY = 'tamilcholai_demo_user';

export const authService = {
  // Login with Email & Password
  async login(email, password) {
    if (isFirebaseConfigured && auth) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } else {
      // Demo authentication simulation
      const demoUser = {
        uid: 'demo-user-id-101',
        email: email || 'tamilan@tamilcholai.org',
        displayName: email ? email.split('@')[0] : 'தமிழ் செல்வன்',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'author',
        bio: 'தமிழை சுவாசிக்கும் ஒரு வாசகர்'
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      return demoUser;
    }
  },

  // Register with Email, Password & Name
  async register(email, password, displayName) {
    if (isFirebaseConfigured && auth) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      // Create user record in Firestore
      if (db) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: displayName || user.email.split('@')[0],
          photoURL: '',
          bio: 'தமிழை நேசிக்கும் ஒரு வாசகர்',
          role: 'reader',
          createdAt: serverTimestamp()
        });
      }
      return user;
    } else {
      const demoUser = {
        uid: 'demo-' + Date.now(),
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'reader',
        bio: 'தமிழை நேசிக்கும் ஒரு புதிய வாசகர்'
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
      return demoUser;
    }
  },

  // Sign In with Google
  async loginWithGoogle() {
    if (isFirebaseConfigured && auth && googleProvider) {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (db) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            bio: 'தமிழை நேசிக்கும் ஒரு வாசகர்',
            role: 'reader',
            createdAt: serverTimestamp()
          });
        }
      }
      return user;
    } else {
      return this.login('google.user@tamilcholai.org', 'demopassword');
    }
  },

  // Logout
  async logout() {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(DEMO_USER_KEY);
  },

  // Reset Password
  async resetPassword(email) {
    if (isFirebaseConfigured && auth) {
      await sendPasswordResetEmail(auth, email);
    }
    return true;
  },

  // Get current active user (Firebase or local demo)
  getCurrentUser() {
    if (isFirebaseConfigured && auth?.currentUser) {
      return auth.currentUser;
    }
    const saved = localStorage.getItem(DEMO_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  }
};
