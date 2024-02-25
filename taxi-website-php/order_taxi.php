<?php
session_start();
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $pickupAddress = $requestData['pickupAddress'];
  $dropoffAddress = $requestData['dropoffAddress'];

  $insertTripsQuery = "INSERT INTO trips (pickupAddress, dropoffAddress, currentStatus) VALUES ('$pickupAddress', '$dropoffAddress', 'active')";

  if ($conn->query($insertTripsQuery) === TRUE) {
    $response = ['success' => true, 'message' => 'New trips record created successfully'];
  } else {
    $response = ['success' => false, 'message' => 'Error creating trip: ' . $conn->error];
  }

  echo json_encode($response);
}

$conn->close();
