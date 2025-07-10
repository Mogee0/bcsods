let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();

  // Enable payment section
  document.getElementById('payment').style.display = 'block';
}

function updateCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  cart.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.item} - ₹${c.price}`;
    list.appendChild(li);
  });
  document.getElementById('total').textContent = total;
}

function generateOrderCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function makePayment() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const upiID = "vmtamilnadu1-1@okaxis";
  const payeeName = "Bhavani Catering Service";
  const orderCode = generateOrderCode();
  const amount = total.toFixed(2);
  const upiUrl = `upi://pay?pa=${upiID}&pn=${payeeName}&am=${amount}&cu=INR&tn=Order%20${orderCode}`;

  window.open(upiUrl, "_blank");

  // Save temp data for use on confirm
  window.pendingOrder = {
    orderCode,
    amount,
    orderDetails: cart.map(c => `${c.item} (₹${c.price})`).join(', ')
  };

  // Show confirm button
  document.getElementById('confirm-btn').style.display = 'inline-block';
}


 // Redirect to UPI link
window.open(upiUrl, "_blank");

// Show confirm button
document.getElementById('confirm-btn').style.display = 'inline-block';


  // Show customer-only notification
  const customerNote = document.getElementById('notify-msg');
  customerNote.innerHTML = `✅ <strong>Customer:</strong><br>
    Order Code: <strong>${orderCode}</strong><br>
    Total Amount: ₹${amount}<br>
    Items: ${orderDetails}<br>
    Thank you! Please show this to the shopkeeper after payment.`;

  document.getElementById('notification').style.display = 'block';

  // Show shopkeeper notification separately (example: log it for now)
  console.log(`📦 Shopkeeper Notification:
Order Code: ${orderCode}
Amount: ₹${amount}
Items: ${orderDetails}`);

  // Reset
  cart = [];
  total = 0;
  updateCart();
  document.getElementById('payment').style.display = 'none';
}
