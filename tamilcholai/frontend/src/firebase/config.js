import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if credentials are supplied (not placeholder text)
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.includes('your_firebase_api_key') &&
  firebaseConfig.projectId &&
  !firebaseConfig.projectId.includes('your_project_id')
);

let app = null;
let auth = null;
let db = null;
let storage = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    console.log('✅ Firebase initialized successfully in live mode.');
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed, falling back to local demo mode:', error);
  }
} else {
  console.info('ℹ️ Tamilcholai is running in Demo Mode with rich pre-seeded Tamil content. Configure .env with Firebase credentials to connect live Firestore/Auth.');
}

export { app, auth, db, storage, googleProvider };
export default app;
