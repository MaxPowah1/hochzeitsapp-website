// paypalClient.js
const paypal = require('@paypal/paypal-server-sdk');

function environment() {
  let clientId = "AS8CTzbNN0TnN1lwGxs_VRroGLV8B_pKIShgmi1og8jrj-AbmiAnHBGDCeIqCYO9YCifHeukLRz8znEc";
  let clientSecret = "EFNApXAXgpVDLUHKkTnX3G1JkTQS_UQCjd4ErGT1L8y1jm9ezQP8pZkLk1UakE-AC8fhCbnXk7oG5YU5";

  // Create a sandbox environment for testing
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

module.exports = { client };
