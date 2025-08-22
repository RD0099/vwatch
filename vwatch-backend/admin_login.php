<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "connection.php"; // your DB connection

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Email and Password required"]);
    exit;
}

$stmt = $conn->prepare("SELECT * FROM admin WHERE email=? AND password=? LIMIT 1");
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $admin = $result->fetch_assoc();
    echo json_encode(["success" => true, "admin" => $admin]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
