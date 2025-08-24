<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data["name"]) {
    echo json_encode(["success" => false, "message" => "Category name required"]);
    exit;
}

$name = $conn->real_escape_string($data["name"]);

$sql = "INSERT INTO categories (name) VALUES ('$name')";
if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Category added"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}
