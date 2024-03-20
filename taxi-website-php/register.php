<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $firstName = $requestData['firstName'];
  $lastName = $requestData['lastName'];
  $username = $requestData['username'];
  $email = $requestData['email'];
  $pwd = password_hash($requestData['pwd'], PASSWORD_DEFAULT);
  $dateOfBirth = $requestData['dateOfBirth'];
  $gender = $requestData['gender'];
  $profileType = $requestData['profileType'];

  $insertUserQuery = "INSERT INTO users (username, pwd, profileType) VALUES ('$username', '$pwd', '$profileType')";

  if ($conn->query($insertUserQuery) === TRUE) {
    $userID = $conn->insert_id;

    if (strpos($email, '@vvtaxi.net') !== false) {
      $characters = '0123456789';
      $driverID = '';
      $length = 4;

      for ($i = 0; $i < $length; $i++) {
        $driverID .= $characters[rand(0, strlen($characters) - 1)];
      }

      $insertDriverQuery = "INSERT INTO drivers (driverID, userID, firstName, lastName, email, dateOfBirth, gender) VALUES ($driverID, $userID, '$firstName', '$lastName', '$email', '$dateOfBirth', '$gender')";

      if ($conn->query($insertDriverQuery) === TRUE) {
        $insertVehicleQuery = "INSERT INTO vehicles (driverID) VALUES ($driverID)";

        if ($conn->query($insertVehicleQuery) === TRUE) {
          $vehicleID = $conn->insert_id;

          $updateDriverQuery = "UPDATE drivers SET vehicleID = $vehicleID WHERE driverID = $driverID";

          if ($conn->query($updateDriverQuery) === TRUE) {
            $response = ['success' => true, 'message' => 'New driver, vehicle, and associated records created successfully'];
          } else {
            $response = ['success' => false, 'message' => 'Error updating driver with vehicleID: ' . $conn->error];
          }
        } else {
          $response = ['success' => false, 'message' => 'Error inserting vehicle: ' . $conn->error];
        }
      } else {
        $response = ['success' => false, 'message' => 'Error inserting driver: ' . $conn->error];
      }
    } else {
      $insertClientQuery = "INSERT INTO clients (firstName, userID, lastName, email, dateOfBirth, gender) VALUES ('$firstName', $userID, '$lastName','$email', '$dateOfBirth', '$gender')";
      if ($conn->query($insertClientQuery) === TRUE) {
        $response = ['success' => true, 'message' => 'New client record created successfully'];
      } else {
        $response = ['success' => false, 'message' => 'Error inserting client: ' . $conn->error];
      }
    }
  } else {
    $response = ['success' => false, 'message' => 'Error inserting user: ' . $conn->error];
  }

  echo json_encode($response);
}

$conn->close();
