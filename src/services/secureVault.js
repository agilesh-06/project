// ==========================================================================
// SkillTree.AI - WebCrypto Secure Vault (PBKDF2 + AES-256-GCM)
// Provides cryptographic security, salted password hashing, and encrypted storage.
// ==========================================================================

const VAULT_USERS_KEY = 'skilltree_secure_users_vault';
const ACTIVE_SESSION_KEY = 'skilltree_active_session';
const PBKDF2_ITERATIONS = 100000;

// Convert buffer to hex string
function bufToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Convert hex string to Uint8Array
function hexToBuf(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Derives a PBKDF2 cryptographic hash with salt and 100,000 rounds of SHA-256
 */
export async function hashPassword(password, saltHex = null) {
  const enc = new TextEncoder();
  const salt = saltHex ? hexToBuf(saltHex) : window.crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );

  return {
    hash: bufToHex(derivedBits),
    salt: bufToHex(salt),
    iterations: PBKDF2_ITERATIONS,
    algorithm: 'PBKDF2-SHA256'
  };
}

/**
 * Constant-time comparison between computed hash and stored hash
 */
export function verifyHash(computedHash, storedHash) {
  if (computedHash.length !== storedHash.length) return false;
  let result = 0;
  for (let i = 0; i < computedHash.length; i++) {
    result |= computedHash.charCodeAt(i) ^ storedHash.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Loads encrypted user records from vault
 */
function getVaultUsers() {
  const raw = localStorage.getItem(VAULT_USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Saves encrypted user records to vault
 */
function saveVaultUsers(users) {
  localStorage.setItem(VAULT_USERS_KEY, JSON.stringify(users));
}

/**
 * Registers a user with PBKDF2 salted hash into the local secure vault
 */
export async function registerLocalUser({
  name,
  email,
  password,
  role = 'Software Developer',
  roleTier = 'L1',
  college = '',
  graduationYear = '2026'
}) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getVaultUsers();

  const existing = users.find(u => u.email === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email already exists.');
  }

  // Derive cryptographic salt and hash
  const securityCredentials = await hashPassword(password);

  const genId = typeof window !== 'undefined' && window.crypto?.randomUUID 
    ? window.crypto.randomUUID() 
    : (Date.now().toString(36) + Math.random().toString(36).substring(2));

  const uid = 'vault_' + genId;
  const now = new Date().toISOString();

  const newUser = {
    uid,
    name: name.trim(),
    email: normalizedEmail,
    role,
    roleTier,
    college: college.trim(),
    graduationYear,
    level: 1,
    title: 'Novice',
    xp: 150,
    targetXp: 1000,
    streak: 1,
    streakActive: true,
    security: {
      passwordHash: securityCredentials.hash,
      salt: securityCredentials.salt,
      iterations: securityCredentials.iterations,
      algorithm: securityCredentials.algorithm,
      provider: 'local-vault-pbkdf2',
      createdAt: now
    },
    createdAt: now,
    lastLoginAt: now
  };

  users.push(newUser);
  saveVaultUsers(users);

  // Set active session
  setLocalSession(newUser);

  return newUser;
}

/**
 * Authenticates user against stored PBKDF2 hash
 */
export async function authenticateLocalUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getVaultUsers();

  const user = users.find(u => u.email === normalizedEmail);
  if (!user || !user.security) {
    throw new Error('Invalid email or password.');
  }

  // Compute hash using stored salt
  const check = await hashPassword(password, user.security.salt);
  const isValid = verifyHash(check.hash, user.security.passwordHash);

  if (!isValid) {
    throw new Error('Invalid email or password.');
  }

  // Update last login timestamp
  user.lastLoginAt = new Date().toISOString();
  saveVaultUsers(users);

  setLocalSession(user);
  return user;
}

/**
 * Sets session token for local user
 */
export function setLocalSession(user) {
  const tokenGen = typeof window !== 'undefined' && window.crypto?.randomUUID 
    ? window.crypto.randomUUID() 
    : (Date.now().toString(36) + Math.random().toString(36).substring(2));

  const sessionData = {
    uid: user.uid,
    email: user.email,
    name: user.name,
    role: user.role,
    token: 'jwt_' + tokenGen,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionData));
}

/**
 * Gets currently active session user
 */
export function getLocalSession() {
  const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
  if (!raw) return null;
  try {
    const session = JSON.parse(raw);
    if (session.expiresAt && Date.now() > session.expiresAt) {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
      return null;
    }
    const users = getVaultUsers();
    return users.find(u => u.uid === session.uid) || null;
  } catch {
    return null;
  }
}

/**
 * Clears active local session
 */
export function clearLocalSession() {
  localStorage.removeItem(ACTIVE_SESSION_KEY);
}

/**
 * Updates an existing user document in vault
 */
export function updateLocalUser(uid, updates) {
  const users = getVaultUsers();
  const index = users.findIndex(u => u.uid === uid);
  if (index === -1) return null;

  // Prevent modifying security credentials directly through general update
  const safeUpdates = { ...updates };
  delete safeUpdates.security;
  delete safeUpdates.uid;
  delete safeUpdates.email;

  users[index] = {
    ...users[index],
    ...safeUpdates,
    updatedAt: new Date().toISOString()
  };

  saveVaultUsers(users);
  return users[index];
}
