
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF-DUXqnGeV_cU3fMFMAmFphHlWDw9fLA",
  authDomain: "otp-verify-65e93.firebaseapp.com",
  projectId: "otp-verify-65e93",
  storageBucket: "otp-verify-65e93.appspot.com",
  messagingSenderId: "313297295995",
  appId: "1:313297295995:web:405a9ee1c7a9febdaa20de"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const authentification = getAuth(app);
