
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-b8ef8.firebaseapp.com",
  projectId: "reactchat-b8ef8",
  storageBucket: "reactchat-b8ef8.appspot.com",
  messagingSenderId: "924189227024",
  appId: "1:924189227024:web:b8793e4dd2875c156a7295"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()