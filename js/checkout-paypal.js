paypal.Buttons({
  // Set up the transaction by calling your server's create-order endpoint.
  createOrder: function(data, actions) {
    return fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Additional order details from your checkout form can be included here if needed.
      })
    })
    .then(response => response.json())
    .then(orderData => orderData.id);
  },

  // When the buyer approves the payment, capture the order and send billing & config data.
  onApprove: function(data, actions) {
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

    const config = document.getElementById('config-json').value;

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
      // Redirect to the success page with query parameters for orderID and status.
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
