<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

echo json_encode([
    "success" => true,
    "stats" => [
        "users" => 12,
        "watches" => 35,
        "orders" => 7,
        "categories" => 4
    ]
]);
?>
