<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $username = $requestData['username'];
  $email = $requestData['email'];
  $newPassword = $requestData['newPassword'];
  $confirmPassword = $requestData['confirmPassword'];

  $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

  $query = "SELECT users.userID, users.profileType, clients.email FROM users LEFT JOIN clients ON users.userID = clients.userID WHERE username = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $userID = $row['userID'];
    $profileType = $row['profileType'];
    $dbEmail = $row['email'];

    if ($email === $dbEmail) {
      $query = "UPDATE users SET pwd = ? WHERE username = ?";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("ss", $hashedNewPassword, $username);
      if ($stmt->execute()) {
        $response = ['success' => true];
      } else {
        $response = ['success' => false, 'error' => $conn->error];
      }
      echo json_encode($response);
    } else {
      echo json_encode(['success' => false, 'error' => 'Email does not match']);
    }
  } else {
    echo json_encode(['success' => false, 'error' => 'User not found']);
  }
  $stmt->close();
}
$conn->close();
