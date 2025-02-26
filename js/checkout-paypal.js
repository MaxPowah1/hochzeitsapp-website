paypal.Buttons({
  // Set up the transaction by calling your server to create the order
  createOrder: function(data, actions) {
    // Optionally, you can add order details from your checkout form here if needed.
    return fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // You could include additional order details here if needed.
      })
    })
    .then(response => response.json())
    .then(orderData => orderData.id);
  },

  // Finalize the transaction after payer approval by capturing the order on the server
  onApprove: function(data, actions) {
    // Retrieve billing information from the checkout form
    const form = document.getElementById('checkout-form');
    const billing = {
      name: form.name.value,
      mobile: form.mobile.value,
      email: form.email.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      address: form.address.value
    };

    // Retrieve the configuration JSON from the hidden field
    const config = document.getElementById('config-json').value;

    // Optionally, display a loading indicator here

    return fetch('/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID,
        billing: billing,
        config: config
      })
    })
    .then(response => response.json())
    .then(captureData => {
      console.log('Capture result', captureData);
      // Redirect the user to a success page with order summary details.
      window.location.href = `/html/success.html?orderID=${encodeURIComponent(captureData.id)}&status=${encodeURIComponent(captureData.status)}`;
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
