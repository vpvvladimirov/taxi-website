<?php
session_start();
header('Content-Type: application/json');

$allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include('login_data.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $response = handleLogin($requestData);

  echo json_encode($response);
}

$conn->close();
