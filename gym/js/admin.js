// /js/admin.js
import { db } from '../firebase/firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("addMemberForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const age = parseInt(document.getElementById("age").value);
  const feePackage = document.getElementById("feePackage").value;

  try {
    await addDoc(collection(db, "members"), {
      name,
      email,
      phone,
      age,
      feePackage,
      joinDate: serverTimestamp()
    });

    alert("✅ Member added successfully!");
    document.getElementById("addMemberForm").reset();
  } catch (error) {
    console.error("❌ Error adding member:", error);
    alert("Failed to add member. Check console for errors.");
  }
});
