<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

include "connection.php";

$data = json_decode(file_get_contents("php://input"), true);

$watch_name = $data['watch_name'] ?? '';
$price = $data['price'] ?? 0;
$discount = $data['discount'] ?? 0;
$stock = $data['stock'] ?? 0;
$status = $data['status'] ?? 'active';
$category = $data['category'] ?? '';

if (!$watch_name || !$category) {
    echo json_encode(["success" => false, "message" => "Watch name and category are required"]);
    exit;
}

$sql = "INSERT INTO watches (watch_name, price, discount, stock, status, category) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdiiss", $watch_name, $price, $discount, $stock, $status, $category);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Watch added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

$conn->close();
