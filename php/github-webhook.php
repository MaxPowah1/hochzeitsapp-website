<?php
// Webhook secret (set this to match the GitHub Webhook secret)
$secret = 'your-github-webhook-secret';

// Log the webhook trigger
file_put_contents("/var/www/html/hochzeitsapp-website/deploy.log", "Webhook received at " . date('Y-m-d H:i:s') . "\n", FILE_APPEND);

// Get the payload from GitHub
$payload = file_get_contents('php://input');
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';

// Validate the payload signature
function verify_github_signature($payload, $signature, $secret) {
    $hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    return hash_equals($hash, $signature);
}

if (!verify_github_signature($payload, $signature, $secret)) {
    http_response_code(403);
    echo json_encode(["error" => "Invalid signature"]);
    exit;
}

// Decode the JSON payload
$data = json_decode($payload, true);

// Ensure it's a push event to the main branch
if ($data['ref'] !== 'refs/heads/main') {
    http_response_code(200);
    echo json_encode(["message" => "Not a push to the main branch"]);
    exit;
}

// Execute the deployment script
$output = shell_exec("bash /var/www/html/hochzeitsapp-website/gitdeploy.sh 2>&1");
file_put_contents("/var/www/html/hochzeitsapp-website/deploy.log", "Deployment Output:\n" . $output . "\n", FILE_APPEND);

echo json_encode(["message" => "Deployment triggered"]);
?>
