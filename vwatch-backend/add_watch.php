<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect input safely
    $watch_name  = $_POST['watch_name'] ?? '';
    $brand_id    = $_POST['brand_id'] ?? '';
    $price       = $_POST['price'] ?? '';
    $gender      = $_POST['gender'] ?? '';
    $description = $_POST['description'] ?? '';
    $stock       = $_POST['stock'] ?? '';

    // Handle image upload
    $imagePath = "";
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $targetDir = "uploads/";

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = time() . "_" . basename($_FILES["image"]["name"]);
        $targetFilePath = $targetDir . $fileName;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)) {
            $imagePath = $targetFilePath;
        } else {
            echo json_encode(["success" => false, "message" => "Image upload failed"]);
            exit;
        }
    }

    // Insert into DB
    $stmt = $conn->prepare("INSERT INTO watches 
        (brand_id, watch_name, description, image_url, price, stock, gender, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 'active')");
    $stmt->bind_param("isssdss", $brand_id, $watch_name, $description, $imagePath, $price, $stock, $gender);

    if ($stmt->execute()) {
        $inserted_id = $stmt->insert_id;

        // Fetch inserted row with brand name
        $sql = "SELECT w.*, b.brand_name 
                FROM watches w 
                LEFT JOIN brands b ON w.brand_id = b.brand_id 
                WHERE w.id = $inserted_id";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        echo json_encode([
            "success" => true,
            "message" => "Watch added successfully",
            "data" => $row
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
}
?>
