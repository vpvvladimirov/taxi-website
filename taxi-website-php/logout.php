<?php
session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['userID'])) {
  // Unset all session variables
  session_unset();

  // Destroy the session
  session_destroy();

  echo json_encode(['success' => true, 'message' => 'Logout successful']);
} else {
  echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
