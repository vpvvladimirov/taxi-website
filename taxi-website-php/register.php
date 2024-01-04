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

  $firstName = $requestData['firstName'];
  $lastName = $requestData['lastName'];
  $username = $requestData['username'];
  $email = $requestData['email'];
  $pwd = password_hash($requestData['pwd'], PASSWORD_DEFAULT);
  $dateOfBirth = $requestData['dateOfBirth'];
  $gender = $requestData['gender'];
  $profileType = $requestData['profileType'];

  $stmt = $conn->prepare("INSERT INTO users (username, pwd, profileType) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $username, $pwd, $profileType);

  if ($stmt->execute()) {
    $userID = $conn->insert_id;

    if (strpos($email, '@vvtaxi.net') !== false) {
      $stmtDrivers = $conn->prepare("INSERT INTO drivers (firstName, lastName, email, dateOfBirth, gender, userID) VALUES (?, ?, ?, ?, ?, ?)");
      $stmtDrivers->bind_param("sssssi", $firstName, $lastName, $email, $dateOfBirth, $gender, $userID);
      $stmtDrivers->execute();
    } else {
      $stmtClients = $conn->prepare("INSERT INTO clients (firstName, lastName, email, dateOfBirth, gender, userID) VALUES (?, ?, ?, ?, ?, ?)");
      $stmtClients->bind_param("sssssi", $firstName, $lastName, $email, $dateOfBirth, $gender, $userID);
      $stmtClients->execute();
    }

    $response = ['success' => true, 'message' => 'New record created successfully'];
  } else {
    $response = ['success' => false, 'message' => 'Error: ' . $conn->error];
  }

  $stmt->close();
  if (isset($stmtDrivers)) $stmtDrivers->close();
  if (isset($stmtClients)) $stmtClients->close();

  echo json_encode($response);
}

$conn->close();
