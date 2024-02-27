<?php
include_once 'session_handler.php';
include_once 'db_connection.php';
include_once 'headers.php';

if (isset($_GET['tripID'])) {
  $userID = $_SESSION['userID'];
  $query = "SELECT driverID FROM drivers WHERE userID = $userID";
  $result = $conn->query($query);
  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $driverID = $row['driverID'];
    $tripID = $_GET['tripID'];

    $sql = "UPDATE trips SET driverID = '$driverID' WHERE tripID = '$tripID'";

    if ($conn->query($sql) === TRUE) {
      echo "Driver ID inserted successfully for trip $tripID";
    } else {
      echo "Error updating trip: " . $conn->error;
    }
  }
} else {
  echo "Trip ID or Driver ID not provided";
}

$conn->close();
