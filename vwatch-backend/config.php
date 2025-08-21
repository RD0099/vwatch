<?php
$host = "localhost";
$user = "root"; // default in XAMPP
$pass = "";     // default in XAMPP
$db   = "vwatch"; // make sure this database exists

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>
