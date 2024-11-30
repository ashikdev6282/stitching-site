// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "peter-mason-90a53.firebasestorage.app",
  messagingSenderId: "1078258946543",
  appId: "1:1078258946543:web:178fd89cdc67534cff661a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Auth and Firestore services
export const auth= getAuth(app);

// Get a reference to Firestore
export const db = getFirestore(app);
export default app;