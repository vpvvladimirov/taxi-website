<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $requestData = json_decode(file_get_contents("php://input"), true);

  if (isset($requestData['tripID']) && isset($requestData['driverID'])) {
    $tripID = $requestData['tripID'];
    $driverID = $requestData['driverID'];

    $query = "UPDATE trips SET driverID = ?, currentStatus = 'in progress' WHERE tripID = ? AND currentStatus = 'active'";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $driverID, $tripID);
    if ($stmt->execute()) {
      echo json_encode(array("success" => true, "message" => "Trip updated successfully."));
    } else {
      echo json_encode(array("success" => false, "message" => "Failed to update trip."));
    }

    $stmt->close();

    $stmt = $conn->prepare("UPDATE drivers SET status = 'busy' WHERE driverID = ?");
    $stmt->bind_param("i", $driverID);
    if ($stmt->execute()) {
      echo json_encode(array("success" => true, "message" => "Driver status set to busy."));
    } else {
      echo json_encode(array("success" => false, "message" => "Failed to update driver status."));
    }

    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM active_trips WHERE driverID = ?");
    $stmt->bind_param("i", $driverID);
    if ($stmt->execute()) {
      echo json_encode(array("success" => true, "message" => "Active trips records for driver deleted."));
    } else {
      echo json_encode(array("success" => false, "message" => "Failed to delete active trips records for driver."));
    }

    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM active_trips WHERE tripID = ?");
    $stmt->bind_param("i", $tripID);
    if ($stmt->execute()) {
      echo json_encode(array("success" => true, "message" => "Active trips records for trip deleted."));
    } else {
      echo json_encode(array("success" => false, "message" => "Failed to delete active trips records for trip."));
    }

    $stmt->close();
  } else {
    echo json_encode(array("success" => false, "message" => "Incomplete data provided."));
  }
} else {
  echo json_encode(array("success" => false, "message" => "Invalid request method."));
}

$conn->close();
