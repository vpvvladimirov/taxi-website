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
  $oldPassword = $requestData['oldPassword'];
  $newPassword = $requestData['newPassword'];
  $confirmPassword = $requestData['confirmPassword'];

  $username = mysqli_real_escape_string($conn, $username);

  $stmt = $conn->prepare("SELECT pwd FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashedPwdFromDB = $row['pwd'];

    if (password_verify($oldPassword, $hashedPwdFromDB)) {
      $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

      $updateStmt = $conn->prepare("UPDATE users SET pwd = ? WHERE username = ?");
      $updateStmt->bind_param("ss", $hashedNewPassword, $username);

      if ($updateStmt->execute() === TRUE) {
        $response = ['success' => true, 'message' => 'Password changed successfully'];
      } else {
        $response = ['success' => false, 'message' => 'Error updating password: ' . $conn->error];
      }

      $updateStmt->close();
    } else {
      $response = ['success' => false, 'message' => 'Invalid old password'];
    }
  } else {
    $response = ['success' => false, 'message' => 'Invalid username'];
  }

  echo json_encode($response);

  $stmt->close();
}

$conn->close();
