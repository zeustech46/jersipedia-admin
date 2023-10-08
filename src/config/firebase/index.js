import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyChmoBHnyW1hN33p13zDm9KkhFXgVb1ZW0",
  authDomain: "jersipedia-45ca7.firebaseapp.com",
  databaseURL: "https://jersipedia-45ca7-default-rtdb.firebaseio.com",
  projectId: "jersipedia-45ca7",
  storageBucket: "jersipedia-45ca7.appspot.com",
  messagingSenderId: "37507972971",
  appId: "1:37507972971:web:a1bc8c0f8a081b037ed62e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
