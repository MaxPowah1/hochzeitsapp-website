paypal.Buttons({
  // Set up the transaction by calling your server to create the order
  createOrder: function(data, actions) {
    return fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Optionally include order details from your checkout form
      })
    })
    .then(response => response.json())
    .then(orderData => orderData.id);
  },

  // Finalize the transaction after payer approval by capturing the order on the server
  onApprove: function(data, actions) {
    // Optionally display a loading indicator here
    return fetch('/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
    .then(response => response.json())
    .then(captureData => {
      console.log('Capture result', captureData);
      // Redirect the user to a success page with order summary
      // Pass order details via query parameters or localStorage as needed
      window.location.href = `/success.html?orderID=${encodeURIComponent(captureData.id)}&status=${encodeURIComponent(captureData.status)}`;
    })
    .catch(err => {
      console.error("Capture error:", err);
      alert("An error occurred while processing your payment.");
    });
  },

  onError: function(err) {
    console.error('PayPal Buttons error:', err);
    alert('An error occurred with PayPal. Please try again.');
  }
}).render('#paypal-button-container');
