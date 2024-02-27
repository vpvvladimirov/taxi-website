<?php
include_once 'session_handler.php';
include_once 'headers.php';
include_once 'db_connection.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

if (isset($_SESSION['userID'], $_SESSION['profileType'], $_SESSION['username'])) {
    $userID = $_SESSION['userID'];
    $profileType = $_SESSION['profileType'];
    $username = $_SESSION['username'];

    $response = [
        'success' => true,
        'userID' => $userID,
        'username' => $username,
        'profileType' => $profileType
    ];

    switch ($profileType) {
        case 'client':
        case 'admin':
            $query = "SELECT * FROM clients WHERE userID = $userID";
            $result = $conn->query($query);
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $response += [
                    'firstName' => $row['firstName'],
                    'lastName' => $row['lastName'],
                    'email' => $row['email'],
                    'dateOfBirth' => $row['dateOfBirth'],
                    'gender' => $row['gender']
                ];
            }
            break;
        case 'driver':
            $query = "SELECT * FROM drivers WHERE userID = $userID";
            $result = $conn->query($query);
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $driverID = $row['driverID'];
                $response += [
                    'driverID' => $driverID,
                    'firstName' => $row['firstName'],
                    'lastName' => $row['lastName'],
                    'email' => $row['email'],
                    'dateOfBirth' => $row['dateOfBirth'],
                    'gender' => $row['gender']
                ];

                $query = "SELECT * FROM vehicles WHERE driverID = $driverID";
                $result = $conn->query($query);
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $response += [
                        'licensePlate' => $row['licensePlate'],
                        'model' => $row['model'],
                        'year' => $row['year'],
                        'currentStatus' => $row['currentStatus']
                    ];
                }
            }
            break;
        default:
            break;
    }

    echo json_encode($response);
}

$conn->close();
