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
  const selected = document.querySelector('input[name="payment"]:checked');
  if (!selected) {
    alert('Please select a payment method.');
    return;
  }

  const method = selected.value;
  const orderCode = generateOrderCode();
  const notify = document.getElementById('notify-msg');
  const orderDetails = cart.map(c => `${c.item} (₹${c.price})`).join(', ');

  notify.innerHTML = `✅ Customer: Your order is placed with total ₹${total} via <strong>${method}</strong>.<br>
                      🧾 Your Order Code: <strong>${orderCode}</strong><br><br>
                      ✅ Shopkeeper: New order received for ₹${total}.<br>
                      🧾 Order Code: <strong>${orderCode}</strong><br>
                      🍽 Ordered Items: ${orderDetails}`;

  document.getElementById('notification').style.display = 'block';
  cart = [];
  total = 0;
  updateCart();
  document.querySelectorAll('input[name="payment"]').forEach(el => el.checked = false);
}
