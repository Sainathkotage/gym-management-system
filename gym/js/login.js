import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// ✅ Your actual Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyAC_rB59GyLYOnIStRkIQB0YICYI3rrqG0",
  authDomain: "gym-management-system-93b41.firebaseapp.com",
  projectId: "gym-management-system-93b41",
  storageBucket: "gym-management-system-93b41.firebasestorage.app",
  messagingSenderId: "470904155110",
  appId: "1:470904155110:web:f70ffa9feb4f2f2af40427",
  measurementId: "G-J0CB5S02CX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 🔍 Fetch user role from Firestore
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const role = docSnap.data().role;

      // ✅ Redirect based on role
      if (role === "admin") {
        window.location.href = "/admin/admin-dashboard.html";
      } else if (role === "member") {
        window.location.href = "/member/member.html";
      } else if (role === "user") {
        window.location.href = "/users/metallic.html";
      } else {
        alert("Unknown role.");
      }
    } else {
      alert("No role found for this user.");
    }

  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
  }
});
