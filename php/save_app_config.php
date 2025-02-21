<?php
header('Content-Type: application/json');
require '../vendor/autoload.php'; // Ensure correct path to Composer autoload

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
