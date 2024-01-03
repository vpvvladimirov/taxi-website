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
  $password = $requestData['password'];

  $username = mysqli_real_escape_string($conn, $username);

  $stmt = $conn->prepare("SELECT pwd FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashedPwdFromDB = $row['pwd'];

    if (password_verify($password, $hashedPwdFromDB)) {
      $response = ['success' => true, 'message' => 'Login successful'];
    } else {
      $response = ['success' => false, 'message' => 'Invalid password'];
    }
  } else {
    $response = ['success' => false, 'message' => 'Invalid username'];
  }

  echo json_encode($response);

  $stmt->close();
}

$conn->close();
