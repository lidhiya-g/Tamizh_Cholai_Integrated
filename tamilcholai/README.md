# 🌺 தமிழ்ச்சோலை (Tamilcholai)

> **A modern, dynamic full-stack digital sanctuary for Tamil literature, language learning, cultural heritage, and community.**

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-v11-ffca28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![License](https://img.shields.io/badge/License-MIT-emerald)](LICENSE)

---

## 📖 Table of Contents
1. [About the Application](#-about-the-application)
2. [Key Features](#-key-features)
3. [Architecture & Project Structure](#-architecture--project-structure)
4. [Quick Start (Zero Friction)](#-quick-start-zero-friction)
5. [Connecting Your Firebase Backend](#-connecting-your-firebase-backend)
6. [Cloud Firestore Collections](#-cloud-firestore-collections)
7. [Deploying to Firebase Hosting](#-deploying-to-firebase-hosting)
8. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🌟 About the Application

**தமிழ்ச்சோலை (Tamilcholai)** translates to *"Lush Garden of Tamil"*. It is built for Tamil enthusiasts, students, and readers worldwide. It seamlessly blends the grandeur of classical Tamil literature (*Thirukkural, Sangam literature*) with modern poetry, interactive alphabet and pronunciation learning, gamified quizzes, and collaborative community discussions.

---

## ✨ Key Features

- **🏛️ திருக்குறள் அரங்கம் (Thirukkural Explorer)**:
  - Daily Kural with full Tamil explanations (*Mu. Karunanidhi*, *Solomon Pappaiah*, *Mu. Varadarajan*) and English translation.
  - Interactive search by Kural number (1–1330), Pal (அறத்துப்பால், பொருட்பால், காமத்துப்பால்), and Athikaram.
  - **Tamil Text-to-Speech (TTS)**: Listen to native Tamil pronunciation of any Kural using browser synthesis.
- **📚 இலக்கியச் சோலை (Articles & Literature Magazine)**:
  - Rich articles across Sangam Literature, Modern Poetry, History & Architecture, and Arts.
  - Interactive Likes, Bookmarks, and real-time nested comments.
  - Authors can compose and publish new articles with rich formatting and cover images.
- **🎓 தமிழ் பயிலகம் (Interactive Tamil Learning Hub)**:
  - **Alphabet Board**: Interactive Uyir (உயிர் 12), Mei (மெய் 18), and Ayutha Ezhuthu (ஆய்த எழுத்து 1) with instant sound audio pronunciation.
  - **Word of the Day (தினசரி சொல்)**: Learn rich classical and contemporary Tamil words with meanings and usage.
  - **Gamified Quiz**: Test your knowledge on Tamil literature, vocabulary, and proverbs with live score and celebration effects!
- **🗣️ களம் / மன்றம் (Community Discussion Forum)**:
  - Dynamic discussions, ask questions, share poems, upvote, and reply in threads.
- **💬 பழமொழிகள் & மரபுத்தொடர்கள் (Proverbs & Idioms)**:
  - Searchable collection of wisdom-filled Tamil proverbs with deep meanings and English equivalents.
- **🌐 Bilingual Support**:
  - Instant 1-click toggle between **தமிழ் (Tamil)** and **English** for all navigation, actions, and messages.
- **🌓 Theme Customization**:
  - Deep royal Tamil heritage dark mode & serene temple bronze light mode.

---

## 📂 Architecture & Project Structure

```text
tamilcholai/
│
├── frontend/                     # React + Vite Client Application
│   ├── public/                   # Static assets & icons
│   ├── src/
│   │   ├── assets/               # Cultural banners and emblems
│   │   ├── components/           # Modular UI components
│   │   │   ├── common/           # Navbar, Footer, Modal, ThemeToggle, Toast
│   │   │   ├── kural/            # KuralCard, KuralSearch, AudioPlayer
│   │   │   ├── articles/         # ArticleCard, CommentSection, ArticleEditor
│   │   │   ├── learn/            # AlphabetBoard, QuizGame, WordOfTheDay
│   │   │   ├── forum/            # PostCard, NewPostModal, ForumFilters
│   │   │   └── auth/             # AuthModal, ProtectedRoute
│   │   ├── pages/                # Route views (Home, Articles, Learn, etc.)
│   │   ├── layouts/              # Main layout wrapper
│   │   ├── services/             # Firebase & Mock Service Layer
│   │   ├── context/              # Auth, Language & Theme state
│   │   ├── hooks/                # Custom hooks (useAuth, useSpeech, etc.)
│   │   ├── firebase/
│   │   │   └── config.js         # Firebase SDK initialization
│   │   ├── App.jsx               # Route definitions
│   │   ├── main.jsx              # App entry point
│   │   └── index.css             # Heritage design system & responsive CSS
│   ├── package.json
│   └── vite.config.js
│
├── firebase/
│   ├── firestore.rules           # Production security rules
│   ├── storage.rules             # File validation & size limits
│   └── firestore.indexes.json    # Composite indexes
│
├── functions/                    # Optional Firebase Cloud Functions
│   ├── index.js                  # User onboarding & atomic counter triggers
│   └── package.json
│
├── firebase.json                 # Firebase CLI deployment config
├── .firebaserc                   # Firebase project target
├── .env.example                  # Environment configuration template
├── .gitignore
└── README.md                     # Documentation (this file)
```

---

## 🚀 Quick Start (Zero Friction)

You can run Tamilcholai immediately on your computer! Even without your Firebase keys, the application automatically enables **Demo Mode** pre-loaded with rich Tamil Kurals, stories, and quizzes.

### 1. Install Dependencies
Open your terminal in the `tamilcholai/frontend` directory:

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Visit **`http://localhost:5173`** in your browser!

---

## 🔒 Connecting Your Firebase Backend

When you are ready to connect your live Firebase project:

### Step 1: Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com).
2. Click **Add project**, name it (e.g., `tamilcholai-app`), and finish setup.

### Step 2: Enable Firebase Services
In your Firebase Console:
- **Authentication**: Click **Build > Authentication > Get Started**. Under Sign-in method, enable **Email/Password** and **Google**.
- **Cloud Firestore**: Click **Build > Firestore Database > Create Database**. Choose Start in production mode (or test mode for quick prototyping).
- **Firebase Storage**: Click **Build > Storage > Get Started**.

### Step 3: Add Web App & Copy Keys
1. In Firebase Project Overview, click the Web icon (`</>`).
2. Register your app (e.g., `tamilcholai-web`).
3. You will see a `firebaseConfig` object with keys.
4. In `tamilcholai/frontend/`, create a file named `.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...your_actual_key
VITE_FIREBASE_AUTH_DOMAIN=tamilcholai-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tamilcholai-app
VITE_FIREBASE_STORAGE_BUCKET=tamilcholai-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef...
```

5. Restart your frontend (`npm run dev`). Tamilcholai will now seamlessly store users, articles, comments, and images directly in your Firebase cloud!

---

## 🗄️ Cloud Firestore Collections

| Collection | Description | Access Rules |
| :--- | :--- | :--- |
| `users` | User profiles (name, bio, role, avatar) | Public read, owner update |
| `articles` | Literary pieces, poetry, historical essays | Public read, auth create, owner edit/delete |
| `articles/{id}/comments` | Community comments on articles | Public read, auth create, owner delete |
| `posts` | Forum questions, literary thoughts, replies | Public read, auth create, owner update |
| `users/{id}/bookmarks` | User's saved articles & favorite Kurals | Private to owner |

---

## 🚀 Deploying to Firebase Hosting

To deploy your project to Firebase Hosting for free:

```bash
# 1. Build the production bundle
cd frontend
npm run build
cd ..

# 2. Login to Firebase CLI
npm install -g firebase-tools
firebase login

# 3. Deploy
firebase deploy
```

Your app will be live at `https://<your-project-id>.web.app`!

---

## 💡 Troubleshooting & FAQ

- **Q: Does Tamil voice pronunciation work on all devices?**  
  *A: Yes! It uses the browser's native Web Speech API (`ta-IN` Tamil voice). If your operating system doesn't have an installed Tamil voice pack, the app automatically falls back to standard phonetic reading.*
- **Q: Can I use this on mobile phones?**  
  *A: Yes, Tamilcholai is built with a 100% responsive mobile-first design with smooth touch navigation.*

---

*வாழ்க தமிழ்! வெல்க தமிழ்! (Long live Tamil!)*
