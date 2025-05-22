import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
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
  serverTimestamp
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth functions
export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName });

    // Create user document in Firestore
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
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// User profile functions
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    throw error;
  }
};

// Music track functions
export const addTrack = async (trackData: Omit<Track, 'id'>) => {
  try {
    const tracksRef = collection(db, 'tracks');
    const docRef = await addDoc(tracksRef, {
      ...trackData,
      createdAt: serverTimestamp(),
      plays: 0,
      likes: 0
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getTracks = async (filters?: { genre?: string; mood?: string }) => {
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
  } catch (error) {
    throw error;
  }
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