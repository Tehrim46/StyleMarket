// FIREBASE SETUP

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAC9kLhIHXqMQqAUWCtiC4qEux_CojNydI",
  authDomain: "stylemarket.firebaseapp.com",
  projectId: "stylemarket",
  storageBucket: "stylemarket.firebasestorage.app",
  messagingSenderId: "235765371221",
  appId: "1:235765371221:web:0db3644959d56bd5319fdc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
console.log("Firebase Connected");
