<?php
session_start();
include 'headers.php';
include 'db_connection.php';

function handleLogin($requestData)
{
  global $conn;

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

      $_SESSION['userID'] = $userID;
      $_SESSION['username'] = $username;
      $_SESSION['profileType'] = $profileType;

      return ['success' => true, 'message' => 'Login successful', 'userID' => $userID, 'username' => $username, 'profileType' => $profileType];
    } else {
      return ['success' => false, 'message' => 'Invalid password'];
    }
  } else {
    return ['success' => false, 'message' => 'Invalid username'];
  }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $response = handleLogin($requestData);

  echo json_encode($response);
}

$conn->close();
