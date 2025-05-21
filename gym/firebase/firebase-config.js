// /firebase/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCx-cYO8T8HTYoUp_dgMMu_f5MPQ_pPaPY",
  authDomain: "gym-management-system-93b41.firebaseapp.com",
  projectId: "gym-management-system-93b41",
  storageBucket: "gym-management-system-93b41.appspot.com",
  messagingSenderId: "867992243172",
  appId: "1:867992243172:web:9eec66c8f18ac5e5bb6175"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
