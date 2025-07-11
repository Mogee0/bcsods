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

function generateOrderCode() {
  return 'ORD' + Math.floor(1000 + Math.random() * 9000);
}

function checkoutOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const orderCode = generateOrderCode();

  // Trigger UPI Payment (replace with your actual UPI ID)
   const upiID = "vmtamilnadu1-1@okaxis"; // Update with your UPI
  const payeeName = "Bhavani Catering Service";
  const orderCode = generateOrderCode();
  const amount = total.toFixed(2);
  const upiUrl = upi://pay?pa=${upiID}&pn=${payeeName}&am=${amount}&cu=INR&tn=Order%20${orderCode};

  // Redirect to UPI link
  window.open(upiUrl, "_blank");

  alert(`✅ Order Confirmed!\nOrder Code: ${orderCode}\nAmount: ₹${total}`);

  // Notify shopkeeper and customer (placeholder)
  console.log(`📨 Notification to Customer & Shopkeeper: Order ${orderCode}, Amount ₹${total}`);
  
  // Clear cart
  cart = [];
  updateCartDisplay();
}
