import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Each of these must be defined in the root `.env` file (see `.env.example`).
// Missing values previously surfaced as a cryptic "auth/invalid-api-key" FirebaseError.
const userFirebaseConfig = {
  apiKey: import.meta.env.VITE_USER_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_USER_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_USER_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_USER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_USER_FIREBASE_APP_ID,
};

const missingVars = [];
if (!userFirebaseConfig.apiKey) missingVars.push("VITE_USER_FIREBASE_API_KEY");
if (!userFirebaseConfig.authDomain) missingVars.push("VITE_USER_FIREBASE_AUTH_DOMAIN");
if (!userFirebaseConfig.projectId) missingVars.push("VITE_USER_FIREBASE_PROJECT_ID");
if (!userFirebaseConfig.storageBucket) missingVars.push("VITE_USER_FIREBASE_STORAGE_BUCKET");
if (!userFirebaseConfig.messagingSenderId) missingVars.push("VITE_USER_FIREBASE_MESSAGING_SENDER_ID");
if (!userFirebaseConfig.appId) missingVars.push("VITE_USER_FIREBASE_APP_ID");

if (missingVars.length > 0) {
  throw new Error(
    `[Firebase] Missing environment variable(s): ${missingVars.join(", ")}. ` +
      "Copy .env.example to .env and fill in your Firebase project credentials."
  );
}

// Initialize user Firebase app separately
const userApp = getApps().find(app => app.name === "user-app")
  ? getApp("user-app")
  : initializeApp(userFirebaseConfig, "user-app");
export const auth = getAuth(userApp); // This is userAuth
export const db = getFirestore(userApp); // This is userDB
export const storage = getStorage(userApp); // This is userStorage
