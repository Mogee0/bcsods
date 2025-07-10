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

  const paymentMethod = prompt("Choose your payment option:\n1. GPay\n2. PhonePe\n3. Paytm\n4. Enter UPI ID", "1");
  let paymentOption;

  switch (paymentMethod) {
    case "1":
      paymentOption = "GPay";
      window.open("https://pay.google.com", "_blank");
      break;
    case "2":
      paymentOption = "PhonePe";
      window.open("https://www.phonepe.com", "_blank");
      break;
    case "3":
      paymentOption = "Paytm";
      window.open("https://paytm.com", "_blank");
      break;
    case "4":
      const upiID = prompt("Enter your UPI ID:");
      if (!upiID) {
        alert("Invalid UPI ID");
        return;
      }
      paymentOption = `Custom UPI - ${upiID}`;
      break;
    default:
      alert("Invalid payment option selected");
      return;
  }

  const orderCode = generateOrderCode();
  const notify = document.getElementById('notify-msg');
  const orderDetails = cart.map(c => `${c.item} (₹${c.price})`).join(', ');

  notify.innerHTML = `✅ Customer: Your order is placed with total ₹${total} via <strong>${paymentOption}</strong>.<br>
                      🧾 Your Order Code: <strong>${orderCode}</strong><br><br>
                      ✅ Shopkeeper: New order received for ₹${total}.<br>
                      🧾 Order Code: <strong>${orderCode}</strong><br>
                      🍽 Ordered Items: ${orderDetails}`;

  document.getElementById('notification').style.display = 'block';
  cart = [];
  total = 0;
  updateCart();
}
