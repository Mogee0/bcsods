let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartBox = document.getElementById('cart');
  cartBox.innerHTML = "";

  if (cart.length === 0) {
    cartBox.innerText = "🛒 Your cart is empty.";
    return;
  }

  const list = document.createElement("ul");
  let total = 0;

  cart.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.item} - ₹${entry.price}`;
    list.appendChild(li);
    total += entry.price;
  });

  cartBox.appendChild(list);

  const summary = document.createElement("p");
  summary.innerHTML = `<strong>Total Items:</strong> ${cart.length} <br><strong>Total Price:</strong> ₹${total}`;
  cartBox.appendChild(summary);
}

function generateOrderCode() {
  const now = new Date();
  return 'ORD' + now.getTime().toString().slice(-6);
}

function checkoutOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const orderCode = generateOrderCode();
  const upiID = 'vmtamilnadu1-1@okaxis'; // 🔁 Replace with your actual UPI ID (e.g. mogesh@ybl)
  const name = 'BCS';
  const note = `Order ${orderCode}`;

 const upiURL = `upi://pay?pa=vmtamilnadu1-1@okaxis&pn=BCS&am=${total}&cu=INR&tn=${note}`;
const qrEncoded = encodeURIComponent(upiURL);
const qrURL = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${qrEncoded}`;


  const paymentMethod = confirm("How would you like to pay?\n\nOK = Show QR Code\nCancel = Open UPI App");

  if (paymentMethod) {
    // Show QR
    document.getElementById('upiQR').src = qrURL;
    document.getElementById('orderCodeText').innerText = `🧾 Order Code: ${orderCode}`;
document.getElementById('upiQR').style.display = 'block';  } 
  
  else {
    // Open UPI App
    window.open(upiURL, '_blank');
  }

  console.log(`📩 Notify Shopkeeper & Customer: Order ${orderCode}, ₹${total}`);
  cart = [];
  updateCartDisplay();
}
