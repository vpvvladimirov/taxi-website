<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $userID = $requestData['userID'];
  $email = $requestData['email'];
  $profileType = $requestData['profileType'];
  $username = $requestData['username'];
  $firstName = $requestData['firstName'];
  $lastName = $requestData['lastName'];
  $dateOfBirth = $requestData['dateOfBirth'];
  $gender = $requestData['gender'];

  // Prepare UPDATE query for users table
  $query = "UPDATE users SET username = ? WHERE userID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("si", $username, $userID);
  $stmt->execute();
  $stmt->close();

  switch ($profileType) {
    case 'client':
    case 'admin':
      $query = "UPDATE clients SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, gender = ? WHERE userID = ?";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("sssssi", $firstName, $lastName, $email, $dateOfBirth, $gender, $userID);
      $stmt->execute();
      $stmt->close();
      break;
    case 'driver':
      $query = "UPDATE drivers SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, gender = ? WHERE userID = ?";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("sssssi", $firstName, $lastName, $email, $dateOfBirth, $gender, $userID);
      $stmt->execute();
      $stmt->close();

      $query = "SELECT driverID FROM drivers WHERE userID = ?";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("i", $userID);
      $stmt->execute();
      $result = $stmt->get_result();
      $stmt->close();

      if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $driverID = $row['driverID'];

        $licensePlate = $requestData['licensePlate'];
        $model = $requestData['model'];
        $brand = $requestData['brand'];
        $year = $requestData['year'];
        $currentStatus = $requestData['currentStatus'];

        $query = "UPDATE vehicles SET licensePlate = ?, model = ?, brand = ?, year = ?, currentStatus = ? WHERE driverID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssisi", $licensePlate, $model, $brand, $year, $currentStatus, $driverID);
        $stmt->execute();
        $stmt->close();
      }
      break;
    default:
      break;
  }
}

$conn->close();
