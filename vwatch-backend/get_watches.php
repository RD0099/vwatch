<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// include DB connection
include "connection.php";

$watches = [];

// ✅ Alias image_url AS image so React gets `watch.image`
$sql = "SELECT 
            w.watch_id, 
            w.watch_name, 
            w.price, 
            w.stock, 
            w.image_url AS image, 
            b.brand_name 
        FROM watches w
        LEFT JOIN brands b ON w.brand_id = b.brand_id";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $watches[] = $row;
    }
}

// Return watches as JSON
echo json_encode($watches);

$conn->close();
?>
