<?php
include_once 'session_handler.php';
include_once 'db_connection.php';
include_once 'headers.php';

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if (mysqli_num_rows($result) > 0) {
  $users = array();

  while ($row = $result->fetch_assoc()) {
    $users[] = $row;
  }

  echo json_encode($users);
} else {
  echo json_encode(array('message' => 'No active trips found'));
}

$conn->close();
