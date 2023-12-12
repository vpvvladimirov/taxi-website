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
  $password = mysqli_real_escape_string($conn, $password);

  $sql = "SELECT * FROM users WHERE username = '$username' AND pwd = '$password'";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    $response = ['success' => true, 'message' => 'Login successful'];
  } else {
    $response = ['success' => false, 'message' => 'Invalid username or password'];
  }

  echo json_encode($response);
}

$conn->close();
