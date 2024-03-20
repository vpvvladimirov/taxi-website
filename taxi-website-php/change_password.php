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

  $username = mysqli_real_escape_string($conn, $username);

  $query = "SELECT * FROM users WHERE username = '$username'";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $userID = $row['userID'];
    $profileType = $row['profileType'];

    switch ($profileType) {
      case 'client':
      case 'admin':
        $query = "SELECT email FROM clients WHERE userID = '$userID'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          $dbEmail = $row['email'];

          if ($email === $dbEmail) {
            $query = "UPDATE users SET pwd = '$hashedNewPassword' WHERE username = '$username'";
            $conn->query($query);
          }
        }
        break;
      case 'driver':
        $query = "SELECT email FROM clients WHERE userID = '$userID'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          $dbEmail = $row['email'];

          if ($email === $dbEmail) {
            $query = "UPDATE users SET pwd = '$hashedNewPassword' WHERE username = '$username'";
            $conn->query($query);
          }
        }
        break;
      default:
        break;
    }
    if ($conn->query($query) === TRUE) {
      $response = ['success' => true];
    } else {
      $response = ['success' => false, 'Error:' . $conn->error];
    }
    echo json_encode($response);
  }
}
$conn->close();
