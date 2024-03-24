<?php
include_once 'db_connection.php';
include_once 'headers.php';

if (isset($_GET['userID'])) {
  $userID = $_GET['userID'];

  $query = "DELETE FROM users WHERE userID = $userID";

  if ($conn->query($query) === TRUE) {
    echo "User deleted successfully";
  } else {
    echo "Error deleting user: " . $conn->error;
  }
} else {
  echo "User ID not provided";
}

$conn->close();
