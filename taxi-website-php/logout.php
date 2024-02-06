<?php
session_start();

header('Content-Type: application/json');

$allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}


header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['userID'])) {
  session_unset();

  session_destroy();

  echo json_encode(['success' => true, 'message' => 'Logout successful']);
} else {
  echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
