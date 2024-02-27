<?php
include_once 'session_handler.php';
include_once 'db_connection.php';
include_once 'headers.php';

if (session_status() == PHP_SESSION_NONE) {
  session_start();
}

if (isset($_SESSION['userID'])) {
  $userID = $_SESSION['userID'];

  $query = "SELECT profileType FROM users WHERE userID = $userID";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $profileType = $row['profileType'];

    echo json_encode(['success' => true, 'profileType' => $profileType]);
  } else {
    echo json_encode(['success' => false, 'message' => 'User not found']);
  }

  $conn->close();
} else {
  echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
