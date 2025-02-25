paypal.Buttons({
  // Set up the transaction by calling your server to create the order
  createOrder: function(data, actions) {
    return fetch('/create-order', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      // You can include order details from the page if needed:
      body: JSON.stringify({
        // Optionally pass billing info, order total, etc.
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
      method: 'post',
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
      // Optionally, show a success message to your buyer
    });
  },

  // Optionally handle errors
  onError: function(err) {
    console.error('PayPal Buttons error', err);
  }
}).render('#paypal-button-container');
