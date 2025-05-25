import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAYyG1Im6WqWdWFytSH5kg0Ibn4fpmh24c",
  authDomain: "firestore-native-460620.firebaseapp.com",
  projectId: "firestore-native-460620",
  storageBucket: "firestore-native-460620.firebasestorage.app",
  messagingSenderId: "300894113598",
  appId: "1:300894113598:web:80fa09d7aee343ef27a66f",
  measurementId: "G-SMDQCMRJSL"
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider };
