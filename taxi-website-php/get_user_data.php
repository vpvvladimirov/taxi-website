<?php
session_start();
include_once 'headers.php';
include_once 'db_connection.php';

$userID = $_SESSION['userID'];
$profileType = $_SESSION['profileType'];
$username = $_SESSION['username'];


$response = [
    'success' => true,
    'username' => $username,
    'profileType' => $profileType,
];

switch ($profileType) {
    case 'client':
    case 'admin':
        $query = "SELECT * FROM clients WHERE userID = $userID";
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $firstName = $row['firstName'];
            $lastName = $row['lastName'];
            $email = $row['email'];
            $dateOfBirth = $row['dateOfBirth'];
            $gender = $row['gender'];
        }
        $response += [
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'dateOfBirth' => $dateOfBirth,
            'gender' => $gender
        ];
        break;
    case 'driver':
        $query = "SELECT * FROM drivers WHERE userID = $userID";
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $driverID = $row['driverID'];
            $firstName = $row['firstName'];
            $lastName = $row['lastName'];
            $email = $row['email'];
            $dateOfBirth = $row['dateOfBirth'];
            $gender = $row['gender'];
        }

        $query = "SELECT * FROM vehicles WHERE driverID IN (SELECT driverID FROM drivers WHERE userID = $userID)";
        $result = $conn->query($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $licensePlate = $row['licensePlate'];
            $model = $row['model'];
            $year = $row['year'];
            $currentStatus = $row['currentStatus'];
        }

        $response += [
            'driverID' => $driverID,
            'firstName' => $firstName,
            'lastName' => $lastName,
            'email' => $email,
            'dateOfBirth' => $dateOfBirth,
            'gender' => $gender,
            'licensePlate' => $licensePlate,
            'model' => $model,
            'year' => $year,
            'currentStatus' => $currentStatus
        ];
        break;
    default:
        break;
}

echo json_encode($response);

$conn->close();
