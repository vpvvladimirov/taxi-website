<?php
include_once 'headers.php';
include_once 'db_connection.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$userID = $requestData['userID'];
$tripID = $requestData['tripID'];
$pickupAddress = $requestData['pickupAddress'];
$dropoffAddress = $requestData['dropoffAddress'];

// Prepare SELECT query to get driverID
$query = "SELECT driverID FROM drivers WHERE userID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userID); // Assuming userID is an integer
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
  $stmt->bind_result($driverID);
  $stmt->fetch();
  $stmt->close();

  $query = "SELECT clientID FROM trips WHERE tripID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $tripID);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows > 0) {
    $stmt->bind_result($clientID);
    $stmt->fetch();
    $stmt->close();

    $sql = "INSERT INTO active_trips (tripID, clientID, driverID, pickupAddress, dropoffAddress) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iiiss", $tripID, $clientID, $driverID, $pickupAddress, $dropoffAddress);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
      echo "Driver ID inserted successfully for trip $tripID";
    } else {
      echo "Error updating trip: " . $conn->error;
    }
    $stmt->close();
  } else {
    echo "Client ID not provided";
  }
} else {
  echo "Trip ID or Driver ID not provided";
}

$conn->close();
