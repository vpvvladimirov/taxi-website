<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $username = mysqli_real_escape_string($conn, $requestData['username']);
  $pwd = $requestData['pwd'];

  $query = "SELECT userID, pwd, profileType FROM users WHERE username = '$username'";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashedPwdFromDB = $row['pwd'];

    if (password_verify($pwd, $hashedPwdFromDB)) {
      $userID = $row['userID'];
      $profileType = $row['profileType'];

      $response = ['success' => true, 'message' => 'Login successful', 'userID' => $userID, 'username' => $username, 'profileType' => $profileType];
    } else {
      $response = ['success' => false, 'message' => 'Invalid password'];
    }
  } else {
    $response = ['success' => false, 'message' => 'Invalid username'];
  }

  echo json_encode($response);
}

$conn->close();
