<?php
session_start();
include 'headers.php';
include 'db_connection.php';

if (isset($_SESSION['userID'])) {
    $userID = $_SESSION['userID'];

    $query = "SELECT username, profileType FROM users WHERE userID = $userID";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $userRow = $result->fetch_assoc();
        $username = $userRow['username'];
        $profileType = $userRow['profileType'];

        $response = [
            'success' => true,
            'username' => $username,
            'profileType' => $profileType,
        ];

        // Check profile type and fetch additional information accordingly
        switch ($profileType) {
            case 'client':
            case 'admin':
                // Fetch client/admin specific info
                $querySpecific = "SELECT firstName, lastName, email, dateOfBirth, gender FROM clients WHERE userID = $userID";
                $resultSpecific = $conn->query($querySpecific);
                if ($resultSpecific->num_rows > 0) {
                    $specificRow = $resultSpecific->fetch_assoc();
                    $response['specificInfo'] = $specificRow;
                }
                break;
            case 'driver':
                // Fetch driver specific info
                $querySpecific = "SELECT driverID, firstName, lastName, email, dateOfBirth, gender FROM drivers WHERE userID = $userID";
                $resultSpecific = $conn->query($querySpecific);
                if ($resultSpecific->num_rows > 0) {
                    $specificRow = $resultSpecific->fetch_assoc();
                    $response['specificInfo'] = $specificRow;

                    // Fetch vehicle info for driver
                    $vehicleQuery = "SELECT licensePlate, model, year, currentStatus FROM vehicles WHERE driverID IN (SELECT driverID FROM drivers WHERE userID = $userID)";
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
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
