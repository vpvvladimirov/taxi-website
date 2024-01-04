<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = 'localhost';
$mysqlusername = "root";
$userpassword = "20051607";
$dbname = "taxi_website_db";

$conn = new mysqli($servername, $mysqlusername, $userpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $username = $requestData['username'];
  $newPassword = $requestData['newPassword'];
  $confirmPassword = $requestData['confirmPassword'];

  $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

  $username = mysqli_real_escape_string($conn, $username);

  $updateStmt = $conn->prepare("UPDATE users SET pwd = ? WHERE username = ?");
  $updateStmt->bind_param("ss", $hashedNewPassword, $username);

  if ($updateStmt->execute() === TRUE) {
    $response = ['success' => true, 'message' => 'Password changed successfully'];
  } else {
    $response = ['success' => false, 'message' => 'Error updating password: ' . $conn->error];
  }

  echo json_encode($response);

  $updateStmt->close();
}

$conn->close();
