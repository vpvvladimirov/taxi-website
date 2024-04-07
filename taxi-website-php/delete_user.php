<?php
include_once 'db_connection.php';
include_once 'headers.php';

if (isset($_GET['userID'])) {
  $userID = $_GET['userID'];



  $query = "DELETE FROM users WHERE userID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $userID);
  if ($stmt->execute()) {
    echo "User deleted successfully";
  } else {
    echo "Error deleting user: " . $conn->error;
  }
  $stmt->close();
} else {
  echo "User ID not provided";
}

$conn->close();
