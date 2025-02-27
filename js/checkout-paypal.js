paypal.Buttons({
  // Erstelle die PayPal-Order über den /create-order Endpoint.
  createOrder: function(data, actions) {
    return fetch('/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // Zusätzliche Order-Details können hier mitgegeben werden.
      })
    })
    .then(response => response.json())
    .then(orderData => orderData.id);
  },

  // Beim Genehmigen der Zahlung:
  onApprove: function(data, actions) {
    const form = document.getElementById('checkout-form');
    // Billing-Daten aus den Formulareingaben auslesen und trimmen
    const billing = {
      name: form.name.value.trim(),
      mobile: form.mobile.value.trim(),
      email: form.email.value.trim(),
      city: form.city.value.trim(),
      zip: form.zip.value.trim(),
      address: form.address.value.trim()
    };

    // Prüfe, ob alle Felder ausgefüllt sind
    if (!billing.name || !billing.mobile || !billing.email || !billing.city || !billing.state || !billing.zip || !billing.address) {
      alert("Bitte füllen Sie alle erforderlichen Felder aus.");
      return; // Abbruch, wenn eines oder mehrere Felder leer sind
    }

    const config = document.getElementById('config-json').value;
    const orderID = data.orderID;
    const idempotencyKey = generateIdempotencyKey();

    console.log("Erstelle Pending Order mit:", { orderID, billing, config, idempotencyKey });

    // Schritt 1: Erstelle einen Pending Order-Eintrag.
    return fetch('/create-pending-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID, billing, config, idempotencyKey })
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
      }
      return response.json();
    })
    .then(pendingResponse => {
      console.log("Pending Order erstellt:", pendingResponse);
      // Schritt 2: Führe die Order-Capture durch.
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
      // Weiterleitung zur Success-Seite mit Order-Details in der URL.
      window.location.href = `/html/success.html?orderID=${encodeURIComponent(captureData.id)}&status=${encodeURIComponent(captureData.status)}`;
    })
    .catch(err => {
      console.error("Error in onApprove:", err);
      alert("Ein Fehler ist beim Verarbeiten Ihrer Zahlung aufgetreten.");
    });
  },

  onError: function(err) {
    console.error('PayPal Buttons error:', err);
    alert('Ein Fehler ist bei PayPal aufgetreten. Bitte versuchen Sie es erneut.');
  }
}).render('#paypal-button-container');

// Funktion zur Generierung eines einfachen UUID-basierten Idempotency-Keys.
function generateIdempotencyKey() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
