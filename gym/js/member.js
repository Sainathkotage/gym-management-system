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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// User ID (replace with auth ID if available)
const userId = "member123";

// Save health metrics
document.getElementById('metrics-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const bmi = parseFloat(document.getElementById('bmi').value);
  const bodyFat = parseFloat(document.getElementById('bodyFat').value);

  // Validation
  if (weight < 30 || weight > 300) {
    alert("Weight must be between 30kg and 300kg.");
    return;
  }
  if (bmi < 10 || bmi > 50) {
    alert("BMI should be between 10 and 50.");
    return;
  }
  if (bodyFat < 5 || bodyFat > 50) {
    alert("Body Fat % should be between 5 and 50.");
    return;
  }

  try {
    await db.collection("members").doc(userId).collection("metrics").add({
      weight,
      bmi,
      bodyFat,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    document.getElementById('save-status').textContent = "Metrics saved!";
    setTimeout(() => document.getElementById('save-status').textContent = "", 3000);

    loadChart(); // Refresh chart
  } catch (error) {
    console.error("Error saving metrics:", error);
  }
});

// Load Chart
async function loadChart() {
  const metricsRef = db.collection("members").doc(userId).collection("metrics").orderBy("timestamp");
  const snapshot = await metricsRef.get();

  const labels = [];
  const weights = [];

  snapshot.forEach(doc => {
    const data = doc.data();
    const date = data.timestamp?.toDate().toLocaleDateString() || "Unknown";
    labels.push(date);
    weights.push(data.weight);
  });

  const ctx = document.getElementById('metrics-chart').getContext('2d');
  if (window.metricsChart) window.metricsChart.destroy(); // avoid duplicate charts

  window.metricsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Weight Over Time',
        data: weights,
        fill: false,
        borderColor: 'blue',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      }
    }
  });
}

// Load on page
loadChart();
