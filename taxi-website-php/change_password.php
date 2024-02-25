<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $username = $requestData['username'];
  $newPassword = $requestData['newPassword'];
  $confirmPassword = $requestData['confirmPassword'];

  $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

  $username = mysqli_real_escape_string($conn, $username);

  $query = "UPDATE users SET pwd = '$hashedNewPassword' WHERE username = '$username'";

  if ($conn->query($query) === TRUE) {
    $response = ['success' => true];
  } else {
    $response = ['success' => false];
  }

  echo json_encode($response);
}

$conn->close();
