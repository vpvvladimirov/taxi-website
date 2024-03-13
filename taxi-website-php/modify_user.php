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

  $query = "UPDATE users SET username = '$username' WHERE userID = $userID";
  $conn->query($query);

  switch ($profileType) {
    case 'client':
    case 'admin':
      $query = "UPDATE clients SET firstName = '$firstName', lastName = '$lastName', email = '$email', dateOfBirth = '$dateOfBirth', gender = '$gender' WHERE userID = $userID";
      $conn->query($query);
      break;
    case 'driver':
      $query = "UPDATE drivers SET firstName = '$firstName', lastName = '$lastName', email = '$email', dateOfBirth = '$dateOfBirth', gender = '$gender' WHERE userID = $userID";
      $conn->query($query);

      $query1 = "SELECT driverID FROM drivers WHERE userID = $userID";
      $result = $conn->query($query1);
      if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $driverID = $row['driverID'];

        $licensePlate = $requestData['licensePlate'];
        $model = $requestData['model'];
        $brand = $requestData['brand'];
        $year = $requestData['year'];
        $currentStatus = $requestData['currentStatus'];

        $query2 = "UPDATE vehicles SET licensePlate = '$licensePlate', model = '$model', brand = '$brand', year = $year, currentStatus = '$currentStatus' WHERE driverID = $driverID";
        $conn->query($query2);
      }
      break;
    default:
      break;
  }
}

$conn->close();
