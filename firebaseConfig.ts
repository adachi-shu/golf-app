// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG3uUuMxH14nOpaj5c8Ae6ao6xa-vNi1k",
  authDomain: "golf-score-app-76ca7.firebaseapp.com",
  projectId: "golf-score-app-76ca7",
  storageBucket: "golf-score-app-76ca7.firebasestorage.app",
  messagingSenderId: "4318045569",
  appId: "1:4318045569:web:268396cab62bfc9e9a7480",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
