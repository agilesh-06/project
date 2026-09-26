// ==========================================================================
// SkillTree.AI - Unified Authentication & Database Service
// Seamlessly delegates to Cloud Firestore & Firebase Auth when configured,
// or uses the WebCrypto Secure Vault (PBKDF2-100K) as an encrypted local engine.
// ==========================================================================
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';
import * as vault from './secureVault';

const listeners = new Set();

/**
 * Returns current active authentication engine
 */
export function getAuthMode() {
  return isFirebaseConfigured() && auth && db ? 'firebase' : 'vault';
}

/**
 * Register a new user in the secure database
 */
export async function registerUser({
  name,
  email,
  password,
  role = 'Software Developer',
  college = '',
  graduationYear = '2026'
}) {
  // Input Sanitation & Validation
  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim().toLowerCase();
  
  if (trimmedName.length < 2) {
    throw new Error('Full Name must be at least 2 characters.');
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) {
    throw new Error('Please provide a valid email address.');
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long.');
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
  }

  // Path 1: Cloud Firestore & Firebase Auth
  if (getAuthMode() === 'firebase') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const firebaseUser = userCredential.user;

      // Update Auth Profile
      await updateProfile(firebaseUser, { displayName: trimmedName });

      // Store in Cloud Firestore users collection
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userProfileData = {
        uid: firebaseUser.uid,
        name: trimmedName,
        email: trimmedEmail,
        role,
        roleTier: 'L1',
        college: (college || '').trim(),
        graduationYear: graduationYear || '2026',
        level: 1,
        title: 'Novice',
        xp: 150,
        targetXp: 1000,
        streak: 1,
        streakActive: true,
        interests: [],
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      };

      await setDoc(userDocRef, userProfileData);
      notifyAuthChange(userProfileData);
      return userProfileData;
    } catch (fbErr) {
      // If Firebase Auth has not been initialized in Firebase Console (configuration-not-found)
      if (
        fbErr.code === 'auth/configuration-not-found' || 
        fbErr.message?.includes('configuration-not-found') ||
        fbErr.code === 'auth/operation-not-allowed'
      ) {
        console.warn('[SkillTree Auth] Firebase Authentication is not yet enabled in Firebase Console. Gracefully saving to Secure WebCrypto Vault.');
        const vaultUser = await vault.registerLocalUser({
          name: trimmedName,
          email: trimmedEmail,
          password,
          role,
          college,
          graduationYear
        });
        vaultUser._isFallback = true;
        vaultUser._fallbackNotice = 'Account registered securely in local cryptographic vault. (To enable Cloud Firebase Auth, click "Get started" under Authentication in Firebase Console).';
        notifyAuthChange(vaultUser);
        return vaultUser;
      }

      // Friendly Firebase error mapping
      if (fbErr.code === 'auth/email-already-in-use') {
        throw new Error('An account with this email address already exists. Please sign in instead.');
      } else if (fbErr.code === 'auth/invalid-email') {
        throw new Error('The email address format is invalid.');
      } else if (fbErr.code === 'auth/weak-password') {
        throw new Error('The password is too weak. Please use at least 8 characters with letters and numbers.');
      }
      throw fbErr;
    }
  }

  // Path 2: WebCrypto Secure Vault (PBKDF2 with 100,000 rounds + SHA-256)
  const vaultUser = await vault.registerLocalUser({
    name: trimmedName,
    email: trimmedEmail,
    password,
    role,
    college,
    graduationYear
  });

  notifyAuthChange(vaultUser);
  return vaultUser;
}

/**
 * Log in an existing user
 */
export async function loginUser(email, password) {
  const trimmedEmail = (email || '').trim().toLowerCase();
  if (!trimmedEmail || !password) {
    throw new Error('Please enter both email and password.');
  }

  // Path 1: Firebase Auth & Cloud Firestore
  if (getAuthMode() === 'firebase') {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      const firebaseUser = userCredential.user;

      // Fetch user document from Cloud Firestore
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(userDocRef);

      let profileData;
      if (snap.exists()) {
        profileData = snap.data();
        // Update last login
        await updateDoc(userDocRef, { lastLoginAt: serverTimestamp() }).catch(() => {});
      } else {
        // Fallback profile if document hasn't been initialized
        profileData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'Student',
          email: firebaseUser.email,
          role: 'Software Developer',
          roleTier: 'L1',
          level: 1,
          title: 'Novice',
          xp: 150,
          targetXp: 1000,
          streak: 1,
          streakActive: true
        };
        await setDoc(userDocRef, { ...profileData, createdAt: serverTimestamp() });
      }

      notifyAuthChange(profileData);
      return profileData;
    } catch (fbErr) {
      if (
        fbErr.code === 'auth/configuration-not-found' || 
        fbErr.message?.includes('configuration-not-found') ||
        fbErr.code === 'auth/operation-not-allowed'
      ) {
        console.warn('[SkillTree Auth] Firebase Auth not initialized in console. Checking Secure WebCrypto Vault.');
        try {
          const vaultUser = await vault.authenticateLocalUser(trimmedEmail, password);
          vaultUser._isFallback = true;
          notifyAuthChange(vaultUser);
          return vaultUser;
        } catch {
          throw new Error('Account not found. Please register first, or enable Email/Password Authentication in your Firebase Console.');
        }
      }

      if (fbErr.code === 'auth/invalid-credential' || fbErr.code === 'auth/wrong-password' || fbErr.code === 'auth/user-not-found') {
        throw new Error('Invalid email or password. Please verify your credentials.');
      }
      throw fbErr;
    }
  }

  // Path 2: WebCrypto Secure Vault
  const vaultUser = await vault.authenticateLocalUser(trimmedEmail, password);
  notifyAuthChange(vaultUser);
  return vaultUser;
}

/**
 * Log out user and destroy active session
 */
export async function logoutUser() {
  if (getAuthMode() === 'firebase' && auth) {
    await signOut(auth);
  } else {
    vault.clearLocalSession();
  }
  notifyAuthChange(null);
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  if (getAuthMode() === 'firebase' && auth?.currentUser) {
    const firebaseUser = auth.currentUser;
    const snap = await getDoc(doc(db, 'users', firebaseUser.uid)).catch(() => null);
    if (snap && snap.exists()) {
      return snap.data();
    }
    return {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || 'Student',
      email: firebaseUser.email,
      role: 'Software Developer',
      roleTier: 'L1',
      level: 1,
      title: 'Novice',
      xp: 150,
      targetXp: 1000,
      streak: 1,
      streakActive: true
    };
  }

  return vault.getLocalSession();
}

/**
 * Update user document fields (XP, role, streak, etc.)
 */
export async function updateUserProfile(uid, updates) {
  if (!uid) return null;

  if (getAuthMode() === 'firebase' && db) {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
    const snap = await getDoc(userDocRef);
    const updated = snap.data();
    notifyAuthChange(updated);
    return updated;
  }

  const updated = vault.updateLocalUser(uid, updates);
  notifyAuthChange(updated);
  return updated;
}

/**
 * Subscribe to authentication and profile state changes
 */
export function subscribeToAuthChanges(callback) {
  listeners.add(callback);

  // Set up Firebase listener if active
  if (getAuthMode() === 'firebase' && auth) {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const snap = await getDoc(doc(db, 'users', firebaseUser.uid)).catch(() => null);
        if (snap && snap.exists()) {
          callback(snap.data());
        } else {
          callback({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || 'Student',
            email: firebaseUser.email,
            role: 'Software Developer',
            roleTier: 'L1',
            level: 1,
            title: 'Novice',
            xp: 150,
            targetXp: 1000,
            streak: 1,
            streakActive: true
          });
        }
      } else {
        callback(null);
      }
    });

    return () => {
      listeners.delete(callback);
      unsubscribe();
    };
  }

  // Vault initial state
  const initial = vault.getLocalSession();
  callback(initial);

  return () => {
    listeners.delete(callback);
  };
}

function notifyAuthChange(user) {
  listeners.forEach(cb => {
    try {
      cb(user);
    } catch (err) {
      console.error('[SkillTree Auth] Error in subscriber:', err);
    }
  });
}
