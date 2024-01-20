<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$servername = 'localhost';
$mysqlusername = "root";
$userpassword = "";
$dbname = "taxi_website_db";

$conn = new mysqli($servername, $mysqlusername, $userpassword, $dbname);

if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

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

      echo json_encode(['success' => true, 'message' => 'Login successful', 'userID' => $userID, 'username' => $username, 'profileType' => $profileType]);
    } else {
      echo json_encode(['success' => false, 'message' => 'Invalid password']);
    }
  } else {
    echo json_encode(['success' => false, 'message' => 'Invalid username']);
  }

  $conn->close();
}
