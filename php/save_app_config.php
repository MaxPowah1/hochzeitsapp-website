<?php
header("Access-Control-Allow-Origin: *"); // Allow all origins (or specify a particular origin)
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow the Content-Type header

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');
require __DIR__ . '/../vendor/autoload.php';


try {
    // Connect to MongoDB
    $client = new MongoDB\Client("mongodb://localhost:27017");
    $db = $client->weddingApp;
    $collection = $db->configurations;

    // Read JSON from request body
    $jsonData = file_get_contents("php://input");
    $data = json_decode($jsonData, true);

    if (!$data) {
        echo json_encode(["status" => "error", "message" => "Invalid JSON data"]);
        exit;
    }

    // Add timestamp for tracking
    $data["created_at"] = new MongoDB\BSON\UTCDateTime();

    // Insert into MongoDB
    $result = $collection->insertOne($data);

    // Respond with success
    echo json_encode([
        "status" => "success",
        "message" => "Configuration saved",
        "id" => $result->getInsertedId()
    ]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
