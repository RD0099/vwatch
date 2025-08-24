<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "connection.php";

$sql = "SELECT * FROM watches WHERE gender='women' AND status='active'";
$result = $conn->query($sql);

$watches = [];
while($row = $result->fetch_assoc()) {
    $watches[] = $row;
}

echo json_encode($watches);
$conn->close();
