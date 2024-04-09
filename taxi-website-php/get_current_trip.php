<?php
include_once 'db_connection.php';
include_once 'headers.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$userID = $requestData['userID'];

$query = "SELECT driverID FROM drivers WHERE userID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $driverID = $row['driverID'];

  $query = "SELECT * FROM trips WHERE driverID = ? AND currentStatus = 'in progress'";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $driverID);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $clientID = $row['clientID'];
    $query = "SELECT * FROM clients WHERE clientID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $clientID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $row += $result->fetch_assoc();
      echo json_encode($row);
    }
  } else {
    echo json_encode(array('message' => 'No trips found for this user'));
  }
} else {
  echo json_encode(array('message' => 'DriverID not found for this user'));
}

$stmt->close();
$conn->close();
