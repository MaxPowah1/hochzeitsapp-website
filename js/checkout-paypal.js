paypal.Buttons({
  // Set up the transaction by calling your server's create-order endpoint.
  createOrder: function(data, actions) {
    return fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Additional order details can be included here if needed.
      })
    })
    .then(response => response.json())
    .then(orderData => orderData.id);
  },

  // When the buyer approves the payment, first create a pending order then capture the payment.
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
    const orderID = data.orderID;

    // First, create a pending order record.
    return fetch('/create-pending-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID, billing, config })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(pendingResponse => {
      console.log("Pending order created:", pendingResponse);
      // Now capture the order.
      return fetch('/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID, billing, config })
      });
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(captureData => {
      console.log('Capture result', captureData);
      // Redirect to the success page with order details.
      window.location.href = `/html/success.html?orderID=${encodeURIComponent(captureData.id)}&status=${encodeURIComponent(captureData.status)}`;
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
