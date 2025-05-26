document.getElementById("payButton").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  try {
    // Step 1: Register the user
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const uid = userCredential.user.uid;

    // Step 2: Open Razorpay Payment popup
    const options = {
      key: "rzp_test_q52QNVvtC9T2Nr", // Replace with your Razorpay test key
      amount: 50000, // 500.00 INR in paise
      currency: "INR",
      name: "Gym Membership",
      description: "Monthly Subscription",
      handler: async function (response) {
        // Step 3: On successful payment, update Firestore role
        await firebase.firestore().collection("users").doc(uid).set({
          name: name,
          email: email,
          role: "member",
          paymentId: response.razorpay_payment_id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Payment successful! You're now a member.");
        window.location.href = "/member/dashboard.html";
      },
      prefill: {
        name: name,
        email: email
      },
      theme: {
        color: "#0f172a"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (error) {
    alert("Registration or Payment Error: " + error.message);
    console.error(error);
  }
});
