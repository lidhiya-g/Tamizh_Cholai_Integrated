import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { INITIAL_ARTICLES, INITIAL_COMMENTS, INITIAL_POSTS } from './seedData';

// Local storage backup keys for demo/offline resilience
const LS_ARTICLES_KEY = 'tamilcholai_articles';
const LS_COMMENTS_KEY = 'tamilcholai_comments';
const LS_POSTS_KEY = 'tamilcholai_posts';
const LS_LIKES_KEY = 'tamilcholai_likes';
const LS_BOOKMARKS_KEY = 'tamilcholai_bookmarks';

// Helper to initialize local storage data if not present
const getStoredLocalData = (key, defaultData) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Local storage read error:', e);
    return defaultData;
  }
};

const setStoredLocalData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Local storage write error:', e);
  }
};

export const firestoreService = {
  /* =========================================================================
     ARTICLES
     ========================================================================= */
  async getArticles(category = 'all') {
    if (isFirebaseConfigured && db) {
      try {
        let q = collection(db, 'articles');
        if (category && category !== 'all') {
          q = query(q, where('category', '==', category), orderBy('createdAt', 'desc'));
        } else {
          q = query(q, orderBy('createdAt', 'desc'));
        }
        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (err) {
        console.warn('Firestore articles fetch error, falling back to local seed:', err);
      }
    }

    // Local / Demo Mode
    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    if (category && category !== 'all') {
      return articles.filter(a => a.category === category || a.categoryEn === category);
    }
    return articles;
  },

  async getArticleById(articleId) {
    if (isFirebaseConfigured && db) {
      try {
        const snap = await getDoc(doc(db, 'articles', articleId));
        if (snap.exists()) {
          return { id: snap.id, ...snap.data() };
        }
      } catch (err) {
        console.warn('Firestore single article fetch error:', err);
      }
    }

    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    return articles.find(a => a.id === articleId) || null;
  },

  async createArticle(articleData, user) {
    const newDoc = {
      title: articleData.title,
      titleEn: articleData.titleEn || '',
      category: articleData.category,
      categoryEn: articleData.categoryEn || articleData.category,
      summary: articleData.summary,
      content: articleData.content,
      coverImage: articleData.coverImage || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80',
      author: user?.displayName || 'தமிழ் படைப்பாளர்',
      authorId: user?.uid || 'guest-author',
      authorRole: user?.role || 'Author',
      readTime: articleData.readTime || '4 min read',
      likesCount: 0,
      commentsCount: 0,
      bookmarksCount: 0,
      createdAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'articles'), newDoc);
        return { id: docRef.id, ...newDoc };
      } catch (err) {
        console.warn('Firestore article creation error:', err);
      }
    }

    // Local fallback
    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    const createdItem = { id: 'art-' + Date.now(), ...newDoc, createdAt: new Date().toISOString() };
    articles.unshift(createdItem);
    setStoredLocalData(LS_ARTICLES_KEY, articles);
    return createdItem;
  },

  async updateArticle(articleId, updateData) {
    if (isFirebaseConfigured && db) {
      try {
        const ref = doc(db, 'articles', articleId);
        await updateDoc(ref, {
          ...updateData,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('Firestore update article error:', err);
      }
    }

    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    const index = articles.findIndex(a => a.id === articleId);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updateData, updatedAt: new Date().toISOString() };
      setStoredLocalData(LS_ARTICLES_KEY, articles);
      return articles[index];
    }
    return null;
  },

  async deleteArticle(articleId) {
    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'articles', articleId));
      } catch (err) {
        console.warn('Firestore delete article error:', err);
      }
    }

    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    const filtered = articles.filter(a => a.id !== articleId);
    setStoredLocalData(LS_ARTICLES_KEY, filtered);
    return true;
  },

  /* =========================================================================
     COMMENTS
     ========================================================================= */
  async getComments(articleId) {
    if (isFirebaseConfigured && db) {
      try {
        const commentsRef = collection(db, 'articles', articleId, 'comments');
        const q = query(commentsRef, orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (err) {
        console.warn('Firestore comments fetch error:', err);
      }
    }

    const allComments = getStoredLocalData(LS_COMMENTS_KEY, INITIAL_COMMENTS);
    return allComments.filter(c => c.articleId === articleId);
  },

  async addComment(articleId, commentText, user) {
    const newComment = {
      articleId,
      text: commentText,
      userName: user?.displayName || 'அநாமதேய வாசகர்',
      userId: user?.uid || 'guest-user',
      userRole: user?.role || 'வாசகர்',
      createdAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, 'articles', articleId, 'comments');
        const docRef = await addDoc(colRef, newComment);
        // Increment count
        await updateDoc(doc(db, 'articles', articleId), {
          commentsCount: increment(1)
        });
        return { id: docRef.id, ...newComment };
      } catch (err) {
        console.warn('Firestore comment add error:', err);
      }
    }

    const allComments = getStoredLocalData(LS_COMMENTS_KEY, INITIAL_COMMENTS);
    const created = { id: 'comm-' + Date.now(), ...newComment, createdAt: new Date().toISOString() };
    allComments.unshift(created);
    setStoredLocalData(LS_COMMENTS_KEY, allComments);

    // Increment local article count
    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    const art = articles.find(a => a.id === articleId);
    if (art) {
      art.commentsCount = (art.commentsCount || 0) + 1;
      setStoredLocalData(LS_ARTICLES_KEY, articles);
    }
    return created;
  },

  /* =========================================================================
     FORUM / DISCUSSIONS
     ========================================================================= */
  async getPosts(category = 'all') {
    if (isFirebaseConfigured && db) {
      try {
        let q = collection(db, 'posts');
        if (category && category !== 'all') {
          q = query(q, where('category', '==', category), orderBy('createdAt', 'desc'));
        } else {
          q = query(q, orderBy('createdAt', 'desc'));
        }
        const snap = await getDocs(q);
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (err) {
        console.warn('Firestore posts fetch error:', err);
      }
    }

    const posts = getStoredLocalData(LS_POSTS_KEY, INITIAL_POSTS);
    if (category && category !== 'all') {
      return posts.filter(p => p.category === category);
    }
    return posts;
  },

  async createPost(postData, user) {
    const newPost = {
      title: postData.title,
      titleEn: postData.titleEn || '',
      category: postData.category,
      content: postData.content,
      author: user?.displayName || 'தமிழ் உறுப்பினர்',
      authorId: user?.uid || 'guest-member',
      authorRole: user?.role || 'உறுப்பினர்',
      upvotes: 1,
      repliesCount: 0,
      createdAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'posts'), newPost);
        return { id: docRef.id, ...newPost };
      } catch (err) {
        console.warn('Firestore post creation error:', err);
      }
    }

    const posts = getStoredLocalData(LS_POSTS_KEY, INITIAL_POSTS);
    const created = { id: 'post-' + Date.now(), ...newPost, createdAt: new Date().toISOString() };
    posts.unshift(created);
    setStoredLocalData(LS_POSTS_KEY, posts);
    return created;
  },

  async upvotePost(postId) {
    if (isFirebaseConfigured && db) {
      try {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
          upvotes: increment(1)
        });
      } catch (err) {
        console.warn('Firestore upvote error:', err);
      }
    }

    const posts = getStoredLocalData(LS_POSTS_KEY, INITIAL_POSTS);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.upvotes = (post.upvotes || 0) + 1;
      setStoredLocalData(LS_POSTS_KEY, posts);
      return post.upvotes;
    }
    return 0;
  },

  /* =========================================================================
     LIKES & BOOKMARKS
     ========================================================================= */
  toggleLike(articleId) {
    const likes = getStoredLocalData(LS_LIKES_KEY, {});
    const isLiked = !likes[articleId];
    likes[articleId] = isLiked;
    setStoredLocalData(LS_LIKES_KEY, likes);

    // Update count in articles
    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    const art = articles.find(a => a.id === articleId);
    if (art) {
      art.likesCount = Math.max(0, (art.likesCount || 0) + (isLiked ? 1 : -1));
      setStoredLocalData(LS_ARTICLES_KEY, articles);
    }
    return { isLiked, newCount: art?.likesCount || 0 };
  },

  isArticleLiked(articleId) {
    const likes = getStoredLocalData(LS_LIKES_KEY, {});
    return Boolean(likes[articleId]);
  },

  toggleBookmark(article) {
    const bookmarks = getStoredLocalData(LS_BOOKMARKS_KEY, []);
    const existsIndex = bookmarks.findIndex(b => b.id === article.id);
    let isBookmarked = false;

    if (existsIndex > -1) {
      bookmarks.splice(existsIndex, 1);
      isBookmarked = false;
    } else {
      bookmarks.unshift(article);
      isBookmarked = true;
    }

    setStoredLocalData(LS_BOOKMARKS_KEY, bookmarks);

    // Update article count
    const articles = getStoredLocalData(LS_ARTICLES_KEY, INITIAL_ARTICLES);
    const art = articles.find(a => a.id === article.id);
    if (art) {
      art.bookmarksCount = Math.max(0, (art.bookmarksCount || 0) + (isBookmarked ? 1 : -1));
      setStoredLocalData(LS_ARTICLES_KEY, articles);
    }
    return isBookmarked;
  },

  getBookmarks() {
    return getStoredLocalData(LS_BOOKMARKS_KEY, []);
  },

  isArticleBookmarked(articleId) {
    const bookmarks = getStoredLocalData(LS_BOOKMARKS_KEY, []);
    return bookmarks.some(b => b.id === articleId);
  }
};
