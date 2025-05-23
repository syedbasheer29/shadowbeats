import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  AuthError
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  serverTimestamp,
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOcaN5FOfb8HhybxWzkWQvd20nNbHUKo0",
  authDomain: "shadow-beats-1c0c3.firebaseapp.com",
  projectId: "shadow-beats-1c0c3",
  storageBucket: "shadow-beats-1c0c3.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firestore with custom settings
const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalAutoDetectLongPolling: true // Let Firebase automatically choose the best connection method
});

// Enable offline persistence with retry logic
const enablePersistence = async () => {
  try {
    await enableIndexedDbPersistence(db);
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  }
};

// Initialize persistence
enablePersistence();

// Helper function to handle Firebase errors
const handleFirebaseError = (error: any): string => {
  const errorCode = error.code;
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or sign in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'permission-denied':
      return 'You do not have permission to perform this action.';
    case 'unavailable':
      return 'The service is currently unavailable. Please try again later.';
    case 'failed-precondition':
      return 'The operation was rejected because the system is not in a state required for the operation\'s execution.';
    case 'resource-exhausted':
      return 'The operation was rejected because the system has insufficient resources.';
    case 'internal':
      return 'An internal error occurred. Please try again later.';
    default:
      console.error('Firebase error:', error);
      return 'An error occurred. Please try again.';
  }
};

// Retry logic for Firestore operations
const withRetry = async <T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  throw lastError;
};

// Auth functions with retry logic
export const signUp = async (email: string, password: string, displayName: string) => {
  return withRetry(async () => {
    try {
      if (password.length < 6) {
        throw new Error('Password should be at least 6 characters long.');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        createdAt: serverTimestamp(),
        theme: 'cyberpunk',
        bio: '',
        avatar: '',
        stats: {
          totalPlays: 0,
          favoriteSongs: 0,
          playlists: 0,
          listeningTime: '0h 0m'
        }
      });

      return user;
    } catch (error: any) {
      throw new Error(handleFirebaseError(error));
    }
  });
};

export const signIn = async (email: string, password: string) => {
  return withRetry(async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(handleFirebaseError(error));
    }
  });
};

export const logout = async () => {
  return withRetry(async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(handleFirebaseError(error));
    }
  });
};

// User profile functions with retry logic
export const getUserProfile = async (userId: string) => {
  return withRetry(async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error: any) {
      throw new Error(handleFirebaseError(error));
    }
  });
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return withRetry(async () => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(handleFirebaseError(error));
    }
  });
};

// Music track functions with retry logic
export const addTrack = async (trackData: Omit<Track, 'id'>) => {
  return withRetry(async () => {
    try {
      const tracksRef = collection(db, 'tracks');
      const docRef = await addDoc(tracksRef, {
        ...trackData,
        createdAt: serverTimestamp(),
        plays: 0,
        likes: 0
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(handleFirebaseError(error));
    }
  });
};

export const getTracks = async (filters?: { genre?: string; mood?: string }) => {
  return withRetry(async () => {
    try {
      const tracksRef = collection(db, 'tracks');
      let q = query(tracksRef);

      if (filters?.genre) {
        q = query(q, where('genre', '==', filters.genre));
      }
      if (filters?.mood) {
        q = query(q, where('mood', '==', filters.mood));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      throw new Error(handleFirebaseError(error));
    }
  });
};

// Types
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  bio: string;
  avatar: string;
  theme: 'dark' | 'light' | 'cyberpunk';
  stats: {
    totalPlays: number;
    favoriteSongs: number;
    playlists: number;
    listeningTime: string;
  };
  createdAt: any;
  updatedAt?: any;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  audioUrl: string;
  coverUrl: string;
  plays: number;
  likes: number;
  createdAt: any;
}

export { auth, db }; 