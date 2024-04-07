<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  if (isset($requestData['username']) && isset($requestData['email']) && isset($requestData['newPassword']) && isset($requestData['confirmPassword'])) {
    $username = $requestData['username'];
    $email = $requestData['email'];
    $newPassword = $requestData['newPassword'];
    $confirmPassword = $requestData['confirmPassword'];

    if ($newPassword === $confirmPassword) {
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
            echo json_encode(['success' => true, 'message' => 'Password updated successfully']);
          } else {
            echo json_encode(['success' => false, 'error' => 'Error updating password: ' . $conn->error]);
          }
        } else {
          echo json_encode(['success' => false, 'error' => 'Email does not match']);
        }
      } else {
        echo json_encode(['success' => false, 'error' => 'User not found']);
      }
      $stmt->close();
    } else {
      echo json_encode(['success' => false, 'error' => 'Passwords do not match']);
    }
  } else {
    echo json_encode(['success' => false, 'error' => 'Incomplete data provided']);
  }
} else {
  echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}

$conn->close();
