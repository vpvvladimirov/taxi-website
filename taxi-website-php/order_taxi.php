<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $pickupAddress = $requestData['pickupAddress'];
  $dropoffAddress = $requestData['dropoffAddress'];
  $userID = $requestData['userID'];

  $query = "SELECT * FROM clients WHERE userID = $userID";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $clientID = $row['clientID'];

    $insertTripsQuery = "INSERT INTO trips (clientID, pickupAddress, dropoffAddress, currentStatus) VALUES ('$clientID', '$pickupAddress', '$dropoffAddress', 'active')";

    if ($conn->query($insertTripsQuery) === TRUE) {
      $response = ['success' => true, 'message' => 'New trips record created successfully'];
    } else {
      $response = ['success' => false, 'message' => 'Error creating trip: ' . $conn->error];
    }
    echo json_encode($response);
  }
}

$conn->close();
