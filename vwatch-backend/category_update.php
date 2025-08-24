<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data["id"] || !$data["name"]) {
    echo json_encode(["success" => false, "message" => "ID and Name required"]);
    exit;
}

$id = intval($data["id"]);
$name = $conn->real_escape_string($data["name"]);

$sql = "UPDATE categories SET name='$name' WHERE id=$id";
if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Category updated"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}
