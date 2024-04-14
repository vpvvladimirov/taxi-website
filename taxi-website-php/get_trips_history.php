<?php
include_once 'db_connection.php';
include_once 'headers.php';

$query = "SELECT trips.*, reviews.*, drivers.driverID, clients.clientID 
          FROM trips 
          LEFT JOIN reviews ON trips.reviewID = reviews.reviewID 
          LEFT JOIN drivers ON trips.driverID = drivers.driverID 
          LEFT JOIN clients ON trips.clientID = clients.clientID 
          WHERE trips.currentStatus = 'reviewed'";
$stmt = $conn->prepare($query);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $trips = array();

  while ($row = $result->fetch_assoc()) {
    $trips[] = $row;
  }

  echo json_encode($trips);
} else {
  echo json_encode(array('message' => 'No trips found' . $conn->error));
}

$stmt->close();
$conn->close();
