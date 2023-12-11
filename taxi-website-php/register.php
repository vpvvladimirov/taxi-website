<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000'); // Update with your React app URL
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

  $firstName = $requestData['firstName'];
  $lastName = $requestData['lastName'];
  $username = $requestData['username'];
  $email = $requestData['email'];
  $pwd = $requestData['pwd'];
  $dateOfBirth = $requestData['dateOfBirth'];
  $gender = $requestData['gender'];
  $profileType = $requestData['profileType'];


  $sql = "INSERT INTO users (firstName, lastName, username, email, pwd, dateOfBirth, gender, profileType) VALUES ('$firstName', '$lastName', '$username', '$email', '$pwd', '$dateOfBirth', '$gender', '$profileType')";

  if ($conn->query($sql) === TRUE) {
    $response = ['success' => true, 'message' => 'New record created successfully'];
  } else {
    $response = ['success' => false, 'message' => 'Error: ' . $conn->error];
  }

  echo json_encode($response);
}

$conn->close();
