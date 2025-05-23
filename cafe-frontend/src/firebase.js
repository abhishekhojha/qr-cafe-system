import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  projectId: "firestore-native-460620",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MSG_SENDER_ID>",
  appId: "<YOUR_APP_ID>",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
