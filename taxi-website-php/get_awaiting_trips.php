<?php
include_once 'db_connection.php';
include_once 'headers.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$userID = $requestData['userID'];

$query = "SELECT clientID FROM clients WHERE userID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $clientID = $row['clientID'];

  $query = "SELECT * FROM trips WHERE clientID = ? AND currentStatus = 'active'";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $clientID);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $trips = array();

    while ($row = $result->fetch_assoc()) {
      $trips[] = $row;
    }

    echo json_encode($trips);
  } else {
    echo json_encode(array('message' => 'No trips found for this user'));
  }
} else {
  echo json_encode(array('message' => 'ClientID not found for this user'));
}

$stmt->close();
$conn->close();
