import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, getFireStore} from "firebase/firestore";
// Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyBjYj0UUm1toDx3AOzEhT8dHeV0p1Pdkfg",
  authDomain: "albummatchup.firebaseapp.com",
  projectId: "albummatchup",
  storageBucket: "albummatchup.appspot.com",
  messagingSenderId: "682865695072",
  appId: "1:682865695072:web:33c21e3371bf8698ce2605",
  measurementId: "G-593TSCGJZV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);