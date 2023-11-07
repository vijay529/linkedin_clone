import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCdgVuf7IdNp-Ddr8kc6OkecxGEXRH7axk",
  authDomain: "linkedin-clone-b8669.firebaseapp.com",
  projectId: "linkedin-clone-b8669",
  storageBucket: "linkedin-clone-b8669.appspot.com",
  messagingSenderId: "250335019812",
  appId: "1:250335019812:web:bb49685c8063eb6ce1e9b1",
  measurementId: "G-BQ0VW8H8LT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default db;