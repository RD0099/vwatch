<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// include DB connection
include "connection.php";

$brands = [];

$sql = "SELECT brand_id, brand_name FROM brands ORDER BY brand_name ASC";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $brands[] = $row;
    }
}

echo json_encode($brands);

$conn->close();
?>
