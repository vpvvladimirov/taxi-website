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

  $query = "DELETE FROM trips WHERE clientID = $clientID AND currentStatus = 'active'";

  if ($conn->query($query) === TRUE) {
    echo "Trip cancelled successfully";
  } else {
    echo "Error cancelling trip: " . $conn->error;
  }
}

$conn->close();
