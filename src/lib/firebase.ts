import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Returns true only when all required Firebase config values are present.
 * This prevents Firebase from being initialized during SSR / static
 * prerendering when environment variables may not be injected yet.
 */
function isConfigValid(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

// Lazily-initialized singletons
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!isConfigValid()) {
    throw new Error(
      "Firebase config is incomplete. Make sure all NEXT_PUBLIC_FIREBASE_* variables are set in .env.local."
    );
  }
  if (!_app) {
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  }
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getFirebaseApp());
  }
  return _db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) {
    _storage = getStorage(getFirebaseApp());
  }
  return _storage;
}

// Convenience re-exports that match the old API surface so existing
// imports ( `import { auth, db, storage } from '@/lib/firebase'` ) keep
// working without changes.  They are evaluated lazily the first time
// they are accessed, not at module-evaluation time.
export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    return Reflect.get(getFirebaseAuth(), prop);
  },
});

export const db = new Proxy({} as Firestore, {
  get(_target, prop) {
    return Reflect.get(getFirebaseDb(), prop);
  },
});

export const storage = new Proxy({} as FirebaseStorage, {
  get(_target, prop) {
    return Reflect.get(getFirebaseStorage(), prop);
  },
});

export default { get app() { return getFirebaseApp(); } };
