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

  $query = "UPDATE users SET username = ? WHERE userID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("si", $username, $userID);
  if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = "User profile updated successfully";
  } else {
    $response['success'] = false;
    $response['message'] = "Failed to update user profile";
  }
  $stmt->close();

  switch ($profileType) {
    case 'client':
    case 'admin':
      $query = "UPDATE clients SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, gender = ? WHERE userID = ?";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("sssssi", $firstName, $lastName, $email, $dateOfBirth, $gender, $userID);
      if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Client/Admin profile updated successfully";
      } else {
        $response['success'] = false;
        $response['message'] = "Failed to update client/admin profile";
      }
      $stmt->close();
      break;
    case 'driver':
      $query = "UPDATE drivers SET firstName = ?, lastName = ?, email = ?, dateOfBirth = ?, gender = ? WHERE userID = ?";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("sssssi", $firstName, $lastName, $email, $dateOfBirth, $gender, $userID);
      if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Driver profile updated successfully";

        $vehicleID = $requestData['vehicleID'];
        $licensePlate = $requestData['licensePlate'];
        $brand = $requestData['brand'];
        $model = $requestData['model'];
        $year = $requestData['year'];
        $currentStatus = $requestData['currentStatus'];

        $query = "UPDATE vehicles SET licensePlate = ?, brand = ?, model = ?, year = ?, currentStatus = ? WHERE vehicleID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sssisi", $licensePlate, $brand, $model, $year, $currentStatus, $vehicleID);

        if ($stmt->execute()) {
          $response['success'] = true;
          $response['message'] = "Vehicle updated successfully";
        } else {
          $response['success'] = false;
          $response['message'] = "Failed to update vehicle";
        }
      } else {
        $response['success'] = false;
        $response['message'] = "Failed to update driver profile";
      }
      $stmt->close();

      break;
    default:
      break;
  }
}

$conn->close();

echo json_encode($response);
