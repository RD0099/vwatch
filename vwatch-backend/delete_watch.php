<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'connection.php';

$id = $_POST['id'];

$sql = "DELETE FROM watches WHERE watch_id='$id'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(["success" => true, "message" => "Watch deleted"]);
} else {
    echo json_encode(["success" => false, "message" => "Error: " . mysqli_error($conn)]);
}
?>
