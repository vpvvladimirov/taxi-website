<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $userID = $requestData['userID'];

  // Prepare SELECT query to retrieve user information
  $query = "SELECT profileType, username FROM users WHERE userID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $userID);
  $stmt->execute();
  $result = $stmt->get_result();

  $response = [
    'success' => true,
    'userID' => $userID
  ];

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $profileType = $row['profileType'];
    $username = $row['username'];
    $response['username'] = $username;
    $response['profileType'] = $profileType;

    switch ($profileType) {
      case 'client':
      case 'admin':
        $query = "SELECT * FROM clients WHERE userID = ?";
        break;
      case 'driver':
        $query = "SELECT d.*, v.licensePlate, v.model, v.brand, v.year, v.currentStatus 
                          FROM drivers d 
                          LEFT JOIN vehicles v ON d.driverID = v.driverID 
                          WHERE d.userID = ?";
        break;
      default:
        break;
    }

    if (isset($query)) {
      $stmt = $conn->prepare($query);
      $stmt->bind_param("i", $userID);
      $stmt->execute();
      $result = $stmt->get_result();

      if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response += $row;
      }
    }
  } else {
    $response = [
      'success' => false,
      'message' => 'User not found'
    ];
  }

  echo json_encode($response);

  $stmt->close();
}

$conn->close();
