let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  updateCartDisplay();
  alert(`${item} added to cart.`);
}

function updateCartDisplay() {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  document.getElementById('cart').innerText = `🛒 Items in cart: ${cart.length}, Total: ₹${total}`;
}

function generateOrderCode()  {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
function checkoutOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const orderCode = generateOrderCode();
  const upiID = 'vmtamilnadu1-1@okaxis'; // 🔁 Replace with your real UPI ID

  // Generate UPI Payment URL
  const upiURL = `upi://pay?pa=${vmtamilnadu1-1@okaxis}&pn=Bhavani Catering Service&am=${total}&cu=INR&tn=Order%20${orderCode}`;
  const qrImageURL = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(upiURL)}`;

  // Show QR
  document.getElementById('upiQR').src = qrImageURL;
  document.getElementById('orderCodeText').innerText = `🧾 Order Code: ${orderCode}`;
  document.getElementById('qr-section').style.display = 'block';

  // Notification logs
  alert(`✅ Order Confirmed!\nScan the QR to pay ₹${total}`);
  console.log(`📩 Notify Shopkeeper & Customer: Order ${orderCode}, Amount ₹${total}`);

  // Clear cart
  cart = [];
  updateCartDisplay();
}
