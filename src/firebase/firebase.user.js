import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Each of these must be defined in the root `.env` file (see `.env.example`).
// Missing values previously surfaced as a cryptic "auth/invalid-api-key" FirebaseError.
const userConfig = {
  apiKey: import.meta.env.VITE_USER_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_USER_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_USER_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_USER_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_USER_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_USER_FIREBASE_APP_ID,
};

const missingVars = [];
if (!userConfig.apiKey) missingVars.push("VITE_USER_FIREBASE_API_KEY");
if (!userConfig.authDomain) missingVars.push("VITE_USER_FIREBASE_AUTH_DOMAIN");
if (!userConfig.projectId) missingVars.push("VITE_USER_FIREBASE_PROJECT_ID");
if (!userConfig.storageBucket) missingVars.push("VITE_USER_FIREBASE_STORAGE_BUCKET");
if (!userConfig.messagingSenderId) missingVars.push("VITE_USER_FIREBASE_MESSAGING_SENDER_ID");
if (!userConfig.appId) missingVars.push("VITE_USER_FIREBASE_APP_ID");

if (missingVars.length > 0) {
  throw new Error(
    `[Firebase] Missing environment variable(s): ${missingVars.join(", ")}. ` +
      "Copy .env.example to .env and fill in your Firebase project credentials."
  );
}

const userApp = getApps().find(app => app.name === "user-app")
  ? getApp("user-app")
  : initializeApp(userConfig, "user-app");
export const userAuth = getAuth(userApp);
export const userDB = getFirestore(userApp);
export const userStorage = getStorage(userApp);
