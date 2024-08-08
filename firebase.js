// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO0A1zMplReuLVX25fxtFDbLe4TLbwBXM",
  authDomain: "pantry-tracker-17bbf.firebaseapp.com",
  projectId: "pantry-tracker-17bbf",
  storageBucket: "pantry-tracker-17bbf.appspot.com",
  messagingSenderId: "384214227358",
  appId: "1:384214227358:web:51622a0998440f18995e8f",
  measurementId: "G-THLW5JB5TN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
