import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Simple validation to help debugging
const missingKeys = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value || value === 'your_' + _ || value.startsWith('your_'))
  .map(([key]) => key);

if (missingKeys.length > 0) {
  console.error(
    `Firebase Configuration Error: The following keys are missing or contain placeholders: ${missingKeys.join(", ")}. ` +
    "Please update your .env file with actual values from the Firebase Console."
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
