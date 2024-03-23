<?php
include_once 'db_connection.php';
include_once 'headers.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$userID = $requestData['userID'];

$query = "SELECT driverID FROM drivers WHERE userID = '$userID'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $driverID = $row['driverID'];

  $query = "SELECT t.*, c.*
            FROM trips t
            LEFT JOIN active_trips act ON t.tripID = act.tripID AND act.driverID = '$driverID'
            LEFT JOIN clients c ON t.clientID = c.clientID
            WHERE t.currentStatus = 'active' AND (act.driverID != '$driverID' OR act.driverID IS NULL)";
  $result = $conn->query($query);

  if (mysqli_num_rows($result) > 0) {
    $trips = array();

    while ($row = $result->fetch_assoc()) {
      $trips[] = $row;
    }

    echo json_encode($trips);
  } else {
    echo json_encode(array('message' => 'No active trips found'));
  }
} else {
  echo json_encode(array('message' => 'No driverID found'));
}

$conn->close();
