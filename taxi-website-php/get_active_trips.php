<?php
include_once 'db_connection.php';
include_once 'headers.php';

$sql = "SELECT * FROM trips WHERE currentStatus = 'active'";
$result = $conn->query($sql);

if (mysqli_num_rows($result) > 0) {
  $trips = array();

  while ($row = $result->fetch_assoc()) {
    $trips[] = $row;
  }

  echo json_encode($trips);
} else {
  echo json_encode(array('message' => 'No active trips found'));
}

$conn->close();
