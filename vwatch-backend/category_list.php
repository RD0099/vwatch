<?php
header("Content-Type: application/json");
require "db.php";

$sql = "SELECT * FROM categories ORDER BY id DESC";
$result = $conn->query($sql);

$categories = [];
while ($row = $result->fetch_assoc()) {
    $categories[] = $row;
}

echo json_encode(["success" => true, "categories" => $categories]);
