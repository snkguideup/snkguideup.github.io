// SNK Ai Academy - Firebase সংযোগ
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkmm36ljujSTOSh-4ZILHO1AD3JUafSGs",
  authDomain: "snkaiacademy.firebaseapp.com",
  projectId: "snkaiacademy",
  storageBucket: "snkaiacademy.firebasestorage.app",
  messagingSenderId: "608509210164",
  appId: "1:608509210164:web:72ab5be5ae6f6f57cca461"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
