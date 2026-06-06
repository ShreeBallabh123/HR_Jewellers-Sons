import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Standard Web App Configuration for 'hr-jewellery' project.
// Real environment credentials should be specified in the production environment variables (.env.local or Vercel settings).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDa374dd6f813a482c0a5954b7a1e6a4d7ab4b",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hr-jewellery.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hr-jewellery",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hr-jewellery.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "29247600174",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:29247600174:web:da374dd6f813a482c0a595",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };
