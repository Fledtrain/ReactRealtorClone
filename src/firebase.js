// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const API_KEY = import.meta.env.VITE_APP_FIREBASECONFIG_API_KEY;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "realtorreactclone.firebaseapp.com",
  projectId: "realtorreactclone",
  storageBucket: "realtorreactclone.appspot.com",
  messagingSenderId: "1077850780443",
  appId: "1:1077850780443:web:44777a169222d86253d9be",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();