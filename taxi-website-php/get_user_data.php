<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['userID'])) {
    $userID = $_SESSION['userID'];

    include('db_connection.php');

    $query = "SELECT username, profileType FROM users WHERE userID = $userID";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $userRow = $result->fetch_assoc();

        $username = $userRow['username'];
        $profileType = $userRow['profileType'];

        if ($profileType === 'client' || $profileType === 'admin') {
            $querySpecific = "SELECT firstName, lastName, email, dateOfBirth, gender FROM clients WHERE userID = $userID";
            $resultSpecific = $conn->query($querySpecific);
        } else if ($profileType === 'driver') {
            $querySpecific = "SELECT driverID, firstName, lastName, email, dateOfBirth, gender FROM drivers WHERE userID = $userID";
            $resultSpecific = $conn->query($querySpecific);
            $vehicleQuery = "SELECT licensePlate, model, year, currentStatus FROM vehicles WHERE driverID IN (SELECT driverID FROM drivers WHERE userID = $userID)";
            $vehicleResult = $conn->query($vehicleQuery);
            $vehicleInfo = $vehicleResult->fetch_assoc();
        }

        if ($resultSpecific->num_rows > 0) {
            $specificRow = $resultSpecific->fetch_assoc();

            $response = [
                'success' => true,
                'username' => $username,
                'profileType' => $profileType,
                'specificInfo' => $specificRow,
            ];

            if ($profileType === 'driver') {
                $response['vehicleInfo'] = $vehicleInfo;
            }

            echo json_encode($response);
        } else {
            echo json_encode(['success' => false, 'message' => 'No additional data found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }

    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
}
