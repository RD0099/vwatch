<?php
header("Content-Type: application/json");
require "connection.php"; // include your db connection

$response = ["success" => false, "stats" => []];

// Users
$users = $conn->query("SELECT COUNT(*) as total FROM users")->fetch_assoc();

// Watches
$watches = $conn->query("SELECT COUNT(*) as total FROM watches")->fetch_assoc();

// Orders
$orders = $conn->query("SELECT COUNT(*) as total FROM orders")->fetch_assoc();

// Categories count
$categories = [];
$cats = ["men", "women", "couple", "kids", "smart"];
foreach ($cats as $c) {
    $q = $conn->query("SELECT COUNT(*) as total FROM watches WHERE gender='$c'");
    $row = $q->fetch_assoc();
    $categories[$c] = $row["total"];
}

$response["success"] = true;
$response["stats"] = [
    "users" => $users["total"],
    "watches" => $watches["total"],
    "orders" => $orders["total"],
    "categories" => $categories
];

echo json_encode($response);
