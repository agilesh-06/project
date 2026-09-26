// ==========================================================================
// SkillTree.AI - Firebase & Cloud Firestore Client Initialization
// ==========================================================================
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const STORAGE_KEY = 'skilltree_firebase_config';

/**
 * Resolves Firebase configuration from environment variables or custom local storage.
 */
export function getFirebaseConfig() {
  // 1. Check custom configured credentials in localStorage
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    } catch {
      // Fall through to env
    }
  }

  // 2. Check Vite environment variables
  const envConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  if (envConfig.apiKey && envConfig.projectId) {
    return envConfig;
  }

  return null;
}

/**
 * Checks whether active Firebase credentials are provided.
 */
export function isFirebaseConfigured() {
  // 1. Check custom configured credentials in localStorage (configured via UI Database tab)
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.apiKey && parsed.projectId) {
          return true;
        }
      } catch {
        // Fall through
      }
    }
  }

  // 2. Only enable cloud Firebase if explicitly flagged in environment
  if (import.meta.env.VITE_ENABLE_FIREBASE === 'true') {
    const cfg = getFirebaseConfig();
    return Boolean(cfg && cfg.apiKey && cfg.projectId);
  }

  return false;
}

/**
 * Allows the user or admin to set and persist their Firebase project keys in-app.
 */
export function saveFirebaseConfig(config) {
  if (!config || !config.apiKey || !config.projectId) {
    throw new Error('Invalid Firebase config. apiKey and projectId are mandatory.');
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  // Reload app to reinitialize Firebase instance cleanly
  window.location.reload();
}

/**
 * Clears custom saved Firebase config.
 */
export function clearFirebaseConfig() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

// Initialize Firebase App only when configured and enabled
let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured()) {
  const activeConfig = getFirebaseConfig();
  if (activeConfig) {
    try {
      app = getApps().length === 0 ? initializeApp(activeConfig) : getApp();
      auth = getAuth(app);
      db = getFirestore(app);
    } catch (err) {
      console.warn('[SkillTree Firebase] Failed to initialize Firebase SDK:', err);
    }
  }
}

export { app, auth, db };
