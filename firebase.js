// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pantry-tracker-17bbf.firebaseapp.com",
  projectId: "pantry-tracker-17bbf",
  storageBucket: "pantry-tracker-17bbf.appspot.com",
  messagingSenderId: "384214227358",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-THLW5JB5TN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
