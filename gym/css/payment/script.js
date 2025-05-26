





document.getElementById('payment-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const plan = document.getElementById('plan').value;

  const priceMap = {
    monthly: 500,
    quarterly: 1350,
    yearly: 4800
  };

  const amount = priceMap[plan];

  // Simulate payment success (replace this with real payment gateway)
  const receiptDetails = `
    Name: ${name}<br/>
    Email: ${email}<br/>
    Plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)}<br/>
    Amount Paid: ₹${amount}<br/>
    Payment ID: ${"PMT" + Math.floor(Math.random() * 10000000)}
  `;

  document.getElementById('receipt-details').innerHTML = receiptDetails;
  document.getElementById('receipt').classList.remove('hidden');
});

// Download receipt
function downloadReceipt() {
  const receiptText = document.getElementById('receipt-details').innerText;
  const blob = new Blob([receiptText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Gym_Receipt.txt';
  link.click();
}
