// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDR2DU56ArHq_oTThN26BzpfIc8AvxIxE4",
  authDomain: "devine-170bc.firebaseapp.com",
  projectId: "devine-170bc",
  storageBucket: "devine-170bc.appspot.com",
  messagingSenderId: "578300974050",
  appId: "1:578300974050:web:921ea217604fa6e8c75fbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, firebaseConfig };
