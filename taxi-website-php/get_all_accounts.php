<?php
include_once 'db_connection.php';
include_once 'headers.php';

$sql = "SELECT * FROM users";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  $users = array();

  while ($row = $result->fetch_assoc()) {
    $users[] = $row;
  }

  echo json_encode($users);
} else {
  echo json_encode(array('message' => 'No active trips found'));
}

$stmt->close();
$conn->close();
