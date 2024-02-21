<?php
session_start();
include 'headers.php';
include 'db_connection.php';

if (isset($_GET['username'])) {
  $username = mysqli_real_escape_string($conn, $_GET['username']);

  $query = "SELECT * FROM users WHERE username = '$username'";

  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $userRow = $result->fetch_assoc();
    $userID = $userRow['userID'];
    $profileType = $userRow['profileType'];

    $response = [
      'success' => true,
      'userID' => $userID,
      'profileType' => $profileType,
      'username' => $username
    ];

    switch ($profileType) {
      case 'admin':
      case 'client':
        $querySpecific = "SELECT * FROM clients WHERE userID = $userID";
        $resultSpecific = $conn->query($querySpecific);
        if ($resultSpecific->num_rows > 0) {
          $clientInfo = $resultSpecific->fetch_assoc();
          $response['clientInfo'] = $clientInfo;
        }
        break;
      case 'driver':
        $querySpecific = "SELECT * FROM drivers WHERE userID = $userID";
        $resultSpecific = $conn->query($querySpecific);
        if ($resultSpecific->num_rows > 0) {
          $clientInfo = $resultSpecific->fetch_assoc();
          $response['clientInfo'] = $clientInfo;

          // Fetch vehicle info for driver
          $vehicleQuery = "SELECT * FROM vehicles WHERE driverID IN (SELECT driverID FROM drivers WHERE userID = $userID)";
          $vehicleResult = $conn->query($vehicleQuery);
          if ($vehicleResult->num_rows > 0) {
            $vehicleInfo = $vehicleResult->fetch_assoc();
            $response['vehicleInfo'] = $vehicleInfo;
          }
        }
        break;
      default:
        break;
    }

    echo json_encode($response);
  } else {
    echo json_encode(['success' => false, 'message' => 'Account not found']);
  }

  $conn->close();
} else {
  echo json_encode(['success' => false, 'message' => 'Username parameter is missing']);
}
