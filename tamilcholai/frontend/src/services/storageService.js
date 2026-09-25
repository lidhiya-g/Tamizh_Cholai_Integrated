import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from '../firebase/config';

export const storageService = {
  /**
   * Upload an image file to Firebase Storage or convert to DataURL locally.
   * @param {File} file - Image file to upload
   * @param {string} folder - Destination folder (e.g. 'articles', 'avatars')
   * @returns {Promise<string>} Download URL or Data URL
   */
  async uploadImage(file, folder = 'articles') {
    if (!file) return '';

    // Validate size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error('கோப்பின் அளவு 5MB-க்கும் குறைவாக இருக்க வேண்டும் (File size must be under 5MB).');
    }

    if (isFirebaseConfigured && storage) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const storageRef = ref(storage, `${folder}/${fileName}`);
        
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
      } catch (err) {
        console.warn('Firebase Storage upload error, falling back to local base64:', err);
      }
    }

    // Local data URL fallback
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
};
