<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $requestData = json_decode(file_get_contents("php://input"), true);

    $userID = $requestData['userID'];
    $profileType = $requestData['profileType'];
    $username = $requestData['username'];

    $response = [
        'success' => true,
        'userID' => $userID,
        'username' => $username,
        'profileType' => $profileType
    ];

    switch ($profileType) {
        case 'client':
        case 'admin':
            $query = "SELECT * FROM clients WHERE userID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $userID);
            $stmt->execute();
            $result = $stmt->get_result();
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
            $stmt->close();
            break;
        case 'driver':
            $query = "SELECT * FROM drivers WHERE userID = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $userID);
            $stmt->execute();
            $result = $stmt->get_result();
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

                $query = "SELECT * FROM vehicles WHERE driverID = ?";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $driverID);
                $stmt->execute();
                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $response += [
                        'licensePlate' => $row['licensePlate'],
                        'brand' => $row['brand'],
                        'model' => $row['model'],
                        'year' => $row['year'],
                        'currentStatus' => $row['currentStatus']
                    ];
                }
                $stmt->close();
            }
            break;
        default:
            break;
    }

    echo json_encode($response);
}

$conn->close();
