<?php
include_once 'db_connection.php';
include_once 'headers.php';

$query = "SELECT * FROM drivers ORDER BY averageRating DESC";
$result = $conn->query($query);

if ($result->num_rows > 0) {
  $drivers = array();

  while ($row = $result->fetch_assoc()) {
    $drivers[] = $row;
  }

  echo json_encode($drivers);
} else {
  echo json_encode(array('message' => 'No drivers found'));
}

$conn->close();
