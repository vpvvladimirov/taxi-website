<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $userID = $requestData['userID'];

  $query = "UPDATE drivers SET status = 'offline' WHERE userID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $userID);

  if ($stmt->execute() === TRUE) {
    $response = ['success' => true, 'message' => 'Login successful', 'userID' => $userID, 'username' => $username, 'profileType' => $profileType];
  }

  echo json_encode($response);

  $stmt->close();
}

$conn->close();
