const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Triggered when a new user signs up via Firebase Auth.
 * Automatically creates a corresponding user profile in Cloud Firestore.
 */
exports.onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    const userDocRef = db.collection("users").doc(user.uid);
    await userDocRef.set({
      uid: user.uid,
      email: user.email || "",
      displayName: user.displayName || user.email?.split("@")[0] || "தமிழ் வாசகர்",
      photoURL: user.photoURL || "",
      bio: "தமிழை நேசிக்கும் ஒரு வாசகர் / படைப்பாளர்",
      role: "reader",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log(`Successfully created profile for user: ${user.uid}`);
  } catch (error) {
    console.error("Error creating user profile document:", error);
  }
});

/**
 * Triggered when a new comment is added to an article.
 * Atomically increments the article's commentsCount.
 */
exports.onCommentCreated = functions.firestore
  .document("articles/{articleId}/comments/{commentId}")
  .onCreate(async (snap, context) => {
    const { articleId } = context.params;
    const articleRef = db.collection("articles").doc(articleId);

    try {
      await articleRef.update({
        commentsCount: admin.firestore.FieldValue.increment(1)
      });
      console.log(`Incremented comment count for article ${articleId}`);
    } catch (error) {
      console.error("Error updating comment count:", error);
    }
  });

/**
 * Triggered when a comment is deleted from an article.
 * Atomically decrements the article's commentsCount.
 */
exports.onCommentDeleted = functions.firestore
  .document("articles/{articleId}/comments/{commentId}")
  .onDelete(async (snap, context) => {
    const { articleId } = context.params;
    const articleRef = db.collection("articles").doc(articleId);

    try {
      await articleRef.update({
        commentsCount: admin.firestore.FieldValue.increment(-1)
      });
      console.log(`Decremented comment count for article ${articleId}`);
    } catch (error) {
      console.error("Error decrementing comment count:", error);
    }
  });

/**
 * Triggered when a reply is added to a forum post.
 * Atomically increments the post's repliesCount.
 */
exports.onReplyCreated = functions.firestore
  .document("posts/{postId}/replies/{replyId}")
  .onCreate(async (snap, context) => {
    const { postId } = context.params;
    const postRef = db.collection("posts").doc(postId);

    try {
      await postRef.update({
        repliesCount: admin.firestore.FieldValue.increment(1)
      });
      console.log(`Incremented reply count for post ${postId}`);
    } catch (error) {
      console.error("Error updating reply count:", error);
    }
  });
