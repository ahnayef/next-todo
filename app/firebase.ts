// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId
};

// console.log(firebaseConfig.apiKey);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const analytics =
  app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

export { auth, db, storage }