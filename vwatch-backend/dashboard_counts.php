<?php
header("Content-Type: application/json");
include "db.php";

// Count queries
$userCount = $conn->query("SELECT COUNT(*) as total FROM users")->fetch_assoc()['total'];
$watchCount = $conn->query("SELECT COUNT(*) as total FROM watches")->fetch_assoc()['total'];
$orderCount = $conn->query("SELECT COUNT(*) as total FROM orders")->fetch_assoc()['total'];
$categoryCount = $conn->query("SELECT COUNT(*) as total FROM categories")->fetch_assoc()['total'];

echo json_encode([
    "success" => true,
    "counts" => [
        "users" => $userCount,
        "watches" => $watchCount,
        "orders" => $orderCount,
        "categories" => $categoryCount
    ]
]);
?>
