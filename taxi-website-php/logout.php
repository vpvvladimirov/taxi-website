<?php
session_start();
include 'headers.php';

if (isset($_SESSION['userID'])) {
  session_unset();

  session_destroy();

  echo json_encode(['success' => true, 'message' => 'Logout successful']);
} else {
  echo json_encode(['success' => false, 'message' => 'User session data not found']);
}
