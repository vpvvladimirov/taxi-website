<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $userID = $requestData['userID'];
  $tripID = $requestData['tripID'];
  $pickupAddress = $requestData['pickupAddress'];
  $dropoffAddress = $requestData['dropoffAddress'];

  $query = "SELECT driverID FROM drivers WHERE userID = $userID";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $driverID = $row['driverID'];

    $query = "SELECT clientID FROM trips WHERE tripID = $tripID";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $clientID = $row['clientID'];
      $sql = "INSERT INTO active_trips (tripID, clientID, driverID, pickupAddress, dropoffAddress) VALUES ('$tripID', '$clientID', '$driverID', '$pickupAddress', '$dropoffAddress')";

      if ($conn->query($sql) === TRUE) {
        echo "Driver ID inserted successfully for trip $tripID";
      } else {
        echo "Error updating trip: " . $conn->error;
      }
    } else {
      echo "Client ID not provided";
    }
  }
  echo "Trip ID or Driver ID not provided";
}

$conn->close();
