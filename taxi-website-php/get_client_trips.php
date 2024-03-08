<?php
include_once 'db_connection.php';
include_once 'headers.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$userID = $requestData['userID'];

$query = "SELECT clientID FROM clients WHERE userID = '$userID'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $clientID = $row['clientID'];

  $query = "SELECT * FROM active_trips WHERE clientID = '$clientID'";
  $result = $conn->query($query);

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

$conn->close();
