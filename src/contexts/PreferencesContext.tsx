import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';

type Theme = 'cyberpunk' | 'shadow' | 'light';

interface UserPreferences {
  theme: Theme;
  lastLogin: any;
  accentColor: string;
  glowIntensity: 'low' | 'medium' | 'high';
  animationsEnabled: boolean;
}

interface PreferencesContextType {
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => Promise<void>;
}

const defaultPreferences: UserPreferences = {
  theme: 'cyberpunk',
  lastLogin: null,
  accentColor: 'violet',
  glowIntensity: 'medium',
  animationsEnabled: true
};

const PreferencesContext = createContext<PreferencesContextType>({
  preferences: null,
  loading: true,
  error: null,
  updatePreferences: async () => {}
});

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load preferences when user changes
  useEffect(() => {
    const loadPreferences = async () => {
      if (!currentUser) {
        setPreferences(null);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPreferences({
            ...defaultPreferences,
            ...data,
            lastLogin: serverTimestamp()
          });
        } else {
          // Create default preferences for new users
          const newPreferences = {
            ...defaultPreferences,
            lastLogin: serverTimestamp()
          };
          await setDoc(doc(db, 'users', currentUser.uid), newPreferences);
          setPreferences(newPreferences);
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
        setError('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [currentUser]);

  // Update preferences in Firestore
  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    if (!currentUser) return;

    try {
      const updatedPreferences = {
        ...preferences,
        ...newPreferences,
        lastLogin: serverTimestamp()
      };

      await setDoc(doc(db, 'users', currentUser.uid), updatedPreferences, { merge: true });
      setPreferences(updatedPreferences as UserPreferences);
    } catch (err) {
      console.error('Error updating preferences:', err);
      setError('Failed to update preferences');
    }
  };

  return (
    <PreferencesContext.Provider value={{ preferences, loading, error, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}; 