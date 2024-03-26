<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $pickupAddress = $requestData['pickupAddress'];
  $dropoffAddress = $requestData['dropoffAddress'];
  $userID = $requestData['userID'];

  $query = "SELECT clientID FROM clients WHERE userID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $userID);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $clientID = $row['clientID'];

    $insertTripsQuery = "INSERT INTO trips (clientID, pickupAddress, dropoffAddress, currentStatus) VALUES (?, ?, ?, 'active')";
    $stmt = $conn->prepare($insertTripsQuery);
    $stmt->bind_param("iss", $clientID, $pickupAddress, $dropoffAddress);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      $response = ['success' => true, 'message' => 'New trip record created successfully'];
    } else {
      $response = ['success' => false, 'message' => 'Error creating trip'];
    }
    echo json_encode($response);
  } else {
    echo json_encode(['success' => false, 'message' => 'Client not found']);
  }
  $stmt->close();
}

$conn->close();
