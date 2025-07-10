let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
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

  const upiID = "vmtamilnadu1-1@okaxis"; // Change this to your shop's UPI ID
  const payeeName = "Bhavani Catering Service";
  const orderCode = generateOrderCode();
  const amount = total.toFixed(2);
  const upiUrl = `upi://pay?pa=${upiID}&pn=${payeeName}&am=${amount}&cu=INR&tn=Order%20${orderCode}`;

  const notify = document.getElementById('notify-msg');
  const orderDetails = cart.map(c => `${c.item} (₹${c.price})`).join(', ');

  notify.innerHTML = `✅ Customer: Your order is placed with total ₹${amount}.<br>
                      🧾 Your Order Code: <strong>${orderCode}</strong><br>
                      🔗 <a href="${upiUrl}" target="_blank">Click here to complete UPI Payment</a><br><br>
                      ✅ Shopkeeper: New order received for ₹${amount}.<br>
                      🧾 Order Code: <strong>${orderCode}</strong><br>
                      🍽 Ordered Items: ${orderDetails}`;

  document.getElementById('notification').style.display = 'block';
  cart = [];
  total = 0;
  updateCart();
}
