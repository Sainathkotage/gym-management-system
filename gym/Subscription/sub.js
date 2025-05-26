function subscribePlan(amount, planName) {
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("Please log in first to subscribe.");
    return;
  }

  const options = {
    key: "rzp_test_q52QNVvtC9T2Nr", // Replace with your Razorpay test key
    amount: amount, // in paise
    currency: "INR",
    name: "Gym Membership",
    description: `${planName} Subscription`,
    handler: async function (response) {
      const db = firebase.firestore();
      await db.collection("subscriptions").add({
        uid: user.uid,
        email: user.email,
        plan: planName,
        amount: amount / 100,
        paymentId: response.razorpay_payment_id,
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      // Optional: update user role
      await db.collection("users").doc(user.uid).update({
        role: "member",
        subscription: planName
      });

      alert(`Payment successful! You are now subscribed to the ${planName} plan.`);
    },
    prefill: {
      email: user.email,
      name: user.displayName || "Gym Member"
    },
    theme: {
      color: "#2563eb"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
