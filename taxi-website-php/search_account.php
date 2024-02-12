<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include 'db_connection.php';

if (isset($_GET['username'])) {
  $username = mysqli_real_escape_string($conn, $_GET['username']);

  $query = "SELECT * FROM users WHERE username = '$username'";

  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $account = $result->fetch_assoc();
    echo json_encode(['success' => true, 'account' => $account]);
  } else {
    echo json_encode(['success' => false, 'message' => 'Account not found']);
  }
} else {
  echo json_encode(['success' => false, 'message' => 'Username parameter is missing']);
}
