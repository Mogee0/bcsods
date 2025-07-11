<script>
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

    alert(`✅ Order Confirmed!\nOrder Code: ${orderCode}\nAmount: ₹${total}`);

    // Notify shopkeeper and customer (placeholder)
    console.log(`📨 Notification to Customer & Shopkeeper: Order ${orderCode}, Amount ₹${total}`);

    // Trigger UPI Payment
    const upiLink = `upi://pay?pa=yourupi@bank&pn=Your%20Shop&am=${total}&cu=INR&tn=Order%20${orderCode}`;
    window.open(upiLink, '_blank');

    // Clear cart after order (optional)
    cart = [];
    updateCartDisplay();
  }
</script>

  // Reset
  cart = [];
  total = 0;
  updateCart();
  document.getElementById('payment').style.display = 'none';
}
