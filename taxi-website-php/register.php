<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = 'localhost';
$mysqlusername = "root";
$userpassword = "";
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
  $pwd = password_hash($requestData['pwd'], PASSWORD_DEFAULT);
  $dateOfBirth = $requestData['dateOfBirth'];
  $gender = $requestData['gender'];
  $profileType = $requestData['profileType'];

  $insertUserQuery = "INSERT INTO users (username, pwd, profileType) VALUES ('$username', '$pwd', '$profileType')";

  if ($conn->query($insertUserQuery) === TRUE) {
    $userID = $conn->insert_id;

    if (strpos($email, '@vvtaxi.net') !== false) {
      $insertDriverQuery = "INSERT INTO drivers (firstName, lastName, email, dateOfBirth, gender, userID) VALUES ('$firstName', '$lastName', '$email', '$dateOfBirth', '$gender', $userID)";
      $conn->query($insertDriverQuery);
    } else {
      $insertClientQuery = "INSERT INTO clients (firstName, lastName, email, dateOfBirth, gender, userID) VALUES ('$firstName', '$lastName', '$email', '$dateOfBirth', '$gender', $userID)";
      $conn->query($insertClientQuery);
    }

    $response = ['success' => true, 'message' => 'New record created successfully'];
  } else {
    $response = ['success' => false, 'message' => 'Error: ' . $conn->error];
  }

  echo json_encode($response);
}

$conn->close();
