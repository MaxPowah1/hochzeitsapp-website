// checkout-paypal.js
paypal.Buttons({
  // Set up the transaction by calling your server to create the order
  createOrder: function(data, actions) {
    return fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // You can include order details from your checkout form if needed:
      body: JSON.stringify({
        // e.g., orderTotal: document.getElementById('total-price').innerText,
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(orderData) {
      // Use the order ID returned by your server
      return orderData.id;
    });
  },

  // Finalize the transaction after payer approval by capturing the order on the server
  onApprove: function(data, actions) {
    return fetch('/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(captureData) {
      console.log('Capture result', captureData);
      // Optionally, update the UI to show success, redirect the user, etc.
      alert('Payment successful!');
    });
  },

  // Optionally handle errors
  onError: function(err) {
    console.error('PayPal Buttons error:', err);
    alert('An error occurred with PayPal. Please try again.');
  }
}).render('#paypal-button-container');
