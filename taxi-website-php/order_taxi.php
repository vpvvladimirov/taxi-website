<?php
session_start();
include 'headers.php';
include 'db_connection.php';

function handleOrder($data)
{
  global $conn;

  $pickupAddress = $data['pickupAddress'];
  $dropoffAddress = $data['dropoffAddress'];

  $insertTripsQuery = "INSERT INTO trips (pickupAddress, dropoffAddress, currentStatus) VALUES ('$pickupAddress', '$dropoffAddress', 'active')";

  if ($conn->query($insertTripsQuery) === TRUE) {
    return ['success' => true, 'message' => 'New trips record created successfully'];
  } else {
    return ['success' => false, 'message' => 'Error creating trip: ' . $conn->error];
  }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $response = handleOrder($requestData);

  echo json_encode($response);
}

$conn->close();
