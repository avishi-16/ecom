// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWLwZNYU9AKzUmlzL9h3NaH42zVZUjOcU",
  authDomain: "shopnshine-644ba.firebaseapp.com",
  projectId: "shopnshine-644ba",
  storageBucket: "shopnshine-644ba.firebasestorage.app",
  messagingSenderId: "407379957217",
  appId: "1:407379957217:web:ba27afcfbfc601a06faea0",
  measurementId: "G-29FPG3EKHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);