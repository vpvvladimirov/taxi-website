<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $firstName = $requestData['firstName'];
  $lastName = $requestData['lastName'];
  $username = $requestData['username'];
  $email = $requestData['email'];
  $hashedPwd = password_hash($requestData['pwd'], PASSWORD_DEFAULT);
  $dateOfBirth = $requestData['dateOfBirth'];
  $gender = $requestData['gender'];
  $profileType = $requestData['profileType'];

  $insertUserQuery = "INSERT INTO users (username, pwd, profileType) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($insertUserQuery);
  $stmt->bind_param("sss", $username, $hashedPwd, $profileType);
  $stmt->execute();

  if ($stmt->affected_rows > 0) {
    $userID = $stmt->insert_id;

    if (strpos($email, '@vvtaxi.net') !== false) {
      $driverID = generateRandomDriverID();
      $insertDriverQuery = "INSERT INTO drivers (driverID, userID, status, firstName, lastName, email, dateOfBirth, gender) VALUES (?, ?, 'offline', ?, ?, ?, ?, ?)";
      $stmt = $conn->prepare($insertDriverQuery);
      $stmt->bind_param("iisssss", $driverID, $userID, $firstName, $lastName, $email, $dateOfBirth, $gender);
      $stmt->execute();

      if ($stmt->affected_rows > 0) {
        $insertVehicleQuery = "INSERT INTO vehicles (driverID) VALUES (?)";
        $stmt = $conn->prepare($insertVehicleQuery);
        $stmt->bind_param("i", $driverID);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
          $vehicleID = $stmt->insert_id;
          $updateDriverQuery = "UPDATE drivers SET vehicleID = ? WHERE driverID = ?";
          $stmt = $conn->prepare($updateDriverQuery);
          $stmt->bind_param("ii", $vehicleID, $driverID);
          $stmt->execute();

          if ($stmt->affected_rows > 0) {
            $response = ['success' => true, 'message' => 'New driver, vehicle, and associated records created successfully'];
          } else {
            $response = ['success' => false, 'message' => 'Error updating driver with vehicleID: ' . $stmt->error];
          }
        } else {
          $response = ['success' => false, 'message' => 'Error inserting vehicle: ' . $stmt->error];
        }
      } else {
        $response = ['success' => false, 'message' => 'Error inserting driver: ' . $stmt->error];
      }
    } else {
      $insertClientQuery = "INSERT INTO clients (firstName, userID, lastName, email, dateOfBirth, gender) VALUES (?, ?, ?, ?, ?, ?)";
      $stmt = $conn->prepare($insertClientQuery);
      $stmt->bind_param("sissis", $firstName, $userID, $lastName, $email, $dateOfBirth, $gender);
      $stmt->execute();

      if ($stmt->affected_rows > 0) {
        $response = ['success' => true, 'message' => 'New client record created successfully'];
      } else {
        $response = ['success' => false, 'message' => 'Error inserting client: ' . $stmt->error];
      }
    }
  } else {
    $response = ['success' => false, 'message' => 'Error inserting user: ' . $stmt->error];
  }

  echo json_encode($response);
}

$conn->close();

function generateRandomDriverID()
{
  $characters = '0123456789';
  $driverID = '';
  $length = 4;

  for ($i = 0; $i < $length; $i++) {
    $driverID .= $characters[rand(0, strlen($characters) - 1)];
  }

  return (int)$driverID;
}
