<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['userID'])) {
  $userID = $_SESSION['userID'];
  $username = $_SESSION['username'];
  $profileType = $_SESSION['profileType'];

  echo json_encode(['success' => true, 'userID' => $userID, 'username' => $username, 'profileType' => $profileType]);
} else {
  echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
