import { auth, db } from '../firebase/firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 1. Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 2. Get role from Firestore
    const userDoc = await getDoc(doc(db, "users", uid)); // assumes a /users collection
    const userData = userDoc.data();

    if (!userDoc.exists()) {
      alert("User data not found.");
      return;
    }

    const role = userData.role;

    // 3. Redirect to appropriate dashboard
    if (role === "admin") {
      window.location.href = "/admin/admin.html";
    } else if (role === "member") {
      window.location.href = "/members/member.html";
    } else {
      window.location.href = "/users/user.html";
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Check your credentials.");
  }
});
