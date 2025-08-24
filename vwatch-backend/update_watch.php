<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $watch_id = $_POST['watch_id'];
    $watch_name = $_POST['watch_name'];
    $brand_id = $_POST['brand_id'];
    $price = $_POST['price'];
    $gender = $_POST['gender'];
    $description = $_POST['description'];
    $stock = $_POST['stock'];

    $updateImg = "";
    if (!empty($_FILES["image"]["name"])) {
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) mkdir($targetDir);
        $fileName = time() . "_" . basename($_FILES["image"]["name"]);
        $targetFilePath = $targetDir . $fileName;
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            $updateImg = ", image_url='$targetFilePath'";
        }
    }

    $sql = "UPDATE watches SET watch_name='$watch_name', brand_id='$brand_id', price='$price',
            gender='$gender', description='$description', stock='$stock' $updateImg
            WHERE watch_id='$watch_id'";

    if (mysqli_query($conn, $sql)) {
        echo json_encode(["success" => true, "message" => "Watch updated"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . mysqli_error($conn)]);
    }
}
?>
