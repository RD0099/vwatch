<?php
include 'db.php';

$id = $_GET['id'];
$sql = "SELECT * FROM watches WHERE watch_id='$id' LIMIT 1";
$result = mysqli_query($conn, $sql);
$watch = mysqli_fetch_assoc($result);

echo json_encode($watch);
?>
