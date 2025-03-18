// web/js/checkout-paypal.js

// Use an absolute backend URL for production.
const backendUrl = "https://hochzeitsapp.com";

// Global function to receive billing info from Flutter.
window.setBillingInfo = function(info) {
  window.flutterBillingInfo = info;
};

// Global function to set the total cost from Flutter.
window.setTotalCost = function(total) {
  window.flutterTotalCost = Number(total);
};

function renderPayPalButtons() {
  paypal.Buttons({
    style: {
      shape: "pill",
      layout: "vertical",
      color: "white",
      label: "pay",
    },
    createOrder: function(data, actions) {
      return fetch(`${backendUrl}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: window.flutterTotalCost
        })
      })
      .then(response => response.json())
      .then(orderData => orderData.id);
    },
    onApprove: function(data, actions) {
      // Get billing info passed from Flutter; if not provided, use defaults.
      const billing = window.flutterBillingInfo
          ? JSON.parse(window.flutterBillingInfo)
          : {
              name: "Default Name",
              mobile: "0000000000",
              email: "default@example.com",
              city: "Default City",
              state: "Default State",
              zip: "00000",
              address: "Default Address"
            };

      // Use the configurationID exposed from Dart.
      const config = JSON.stringify({ configurationID: window.configurationID || "default" });
      const orderID = data.orderID;
      const idempotencyKey = generateIdempotencyKey();

      // Get the total price from Flutter (set via setTotalCost)
      // Default to 0 if not set.
      const price = window.flutterTotalCost || 0;

      // Create a pending order record.
      return fetch(`${backendUrl}/create-pending-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID, billing, config, idempotencyKey, price })
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(pendingResponse => {
        // Capture the PayPal order.
        return fetch(`${backendUrl}/capture-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID, billing, config })
        });
      })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
      })
      .then(captureData => {
        // Instead of redirecting to a new page, call a Flutter callback.
        // This callback should be defined in your Flutter code to display a "Thank you" screen.
        if (window.flutterPaymentSuccess) {
          window.flutterPaymentSuccess(captureData);
        } else {
          alert("Thank you for your purchase! Your order id is: " + captureData.id);
        }
      })
      .catch(err => {
        console.error("Error in onApprove:", err);
        alert("An error occurred while processing your payment.");
      });
    },
    onError: function(err) {
      console.error('PayPal Buttons error:', err);
      alert('An error occurred with PayPal. Please try again.');
    }
  }).render('#paypal-button-container');
}

function generateIdempotencyKey() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Expose the render function globally.
window.renderPayPalButtons = renderPayPalButtons;
