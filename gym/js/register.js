import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAC_rB59GyLYOnIStRkIQB0YICYI3rrqG0",
  authDomain: "gym-management-system-93b41.firebaseapp.com",
  projectId: "gym-management-system-93b41",
  storageBucket: "gym-management-system-93b41.firebasestorage.app",
  messagingSenderId: "470904155110",
  appId: "1:470904155110:web:f70ffa9feb4f2f2af40427",
  measurementId: "G-J0CB5S02CX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Form handler
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Save user info in Firestore
    await setDoc(doc(db, "users", uid), {
      email,
      role,
      createdAt: new Date()
    });

    alert("User registered and saved to Firestore!");
    window.location.href = "index.html"; // or dashboard redirect
  } catch (error) {
    console.error("Error:", error);
    alert("Error: " + error.message);
  }
});
