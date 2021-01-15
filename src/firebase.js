import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHkHIYaLLB2EaxgbPwaDG3cjS-qNzXKW4",
    authDomain: "checipe-7d4fd.firebaseapp.com",
    projectId: "checipe-7d4fd",
    storageBucket: "checipe-7d4fd.appspot.com",
    messagingSenderId: "379392033966",
    appId: "1:379392033966:web:baa8ae098171cfb9f6593f",
    measurementId: "G-8P27P5XJC7"
  };

  firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
 