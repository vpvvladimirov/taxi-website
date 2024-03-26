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
  $stmt->close();

  $query = "DELETE FROM trips WHERE clientID = ? AND currentStatus = 'active'";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $clientID);
  if ($stmt->execute()) {
    echo "Trip cancelled successfully";
  } else {
    echo "Error cancelling trip: " . $conn->error;
  }
  $stmt->close();
}

$conn->close();
