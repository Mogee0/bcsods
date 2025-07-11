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

  // Trigger UPI Payment (replace with your actual UPI ID)
 const upiLink = `upi://pay?pa=vmtamilnadu1-1@okaxis&pn=Bhavani Catering Service&am=${total}&cu=INR&tn=Order%20${orderCode}`;
  window.open(upiLink, '_blank');

  alert(`✅ Order Confirmed!\nOrder Code: ${orderCode}\nAmount: ₹${total}`);

  // Notify shopkeeper and customer (placeholder)
  console.log(`📨 Notification to Customer & Shopkeeper: Order ${orderCode}, Amount ₹${total}`);
  
  // Clear cart
  cart = [];
  updateCartDisplay();
}
