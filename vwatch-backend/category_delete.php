<?php
header("Content-Type: application/json");
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data["id"]) {
    echo json_encode(["success" => false, "message" => "Category ID required"]);
    exit;
}

$id = intval($data["id"]);

$sql = "DELETE FROM categories WHERE id=$id";
if ($conn->query($sql)) {
    echo json_encode(["success" => true, "message" => "Category deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . $conn->error]);
}
