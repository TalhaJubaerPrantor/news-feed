// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzn8WvVLFVc4E15fXHveqcnSklM9Or6QA",
  authDomain: "hud-news.firebaseapp.com",
  projectId: "hud-news",
  storageBucket: "hud-news.firebasestorage.app",
  messagingSenderId: "428192348253",
  appId: "1:428192348253:web:edb7bef1b5267f092775b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);