<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $requestData = json_decode(file_get_contents("php://input"), true);

  if (isset($requestData['userID']) && isset($requestData['tripID']) && isset($requestData['pickupAddress']) && isset($requestData['dropoffAddress']) && isset($requestData['waitingTime'])) {
    $userID = $requestData['userID'];
    $tripID = $requestData['tripID'];
    $pickupAddress = $requestData['pickupAddress'];
    $dropoffAddress = $requestData['dropoffAddress'];
    $waitingTime = $requestData['waitingTime'];

    $query = "SELECT driverID FROM drivers WHERE userID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userID);
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

        $query = "INSERT INTO active_trips (tripID, clientID, driverID, pickupAddress, dropoffAddress, waitingTime) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("iiissi", $tripID, $clientID, $driverID, $pickupAddress, $dropoffAddress, $waitingTime);
        if ($stmt->execute()) {
          if ($stmt->affected_rows > 0) {
            echo "Driver ID inserted successfully for trip $tripID";
          } else {
            echo "Error inserting driver ID for trip $tripID: " . $conn->error;
          }
        } else {
          echo "Error executing query: " . $stmt->error;
        }
        $stmt->close();
      } else {
        echo "Client ID not provided";
      }
    } else {
      echo "Trip ID or Driver ID not provided";
    }
  } else {
    echo "Incomplete data provided.";
  }
} else {
  echo "Invalid request method.";
}

$conn->close();
