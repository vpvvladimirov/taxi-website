<?php
session_start();
header('Content-Type: application/json');

$allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if (isset($_SESSION['userID'])) {
    $userID = $_SESSION['userID'];

    include('db_connection.php');

    $query = "SELECT * FROM users WHERE userID = $userID";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $userRow = $result->fetch_assoc();

        $username = $userRow['username'];
        $profileType = $userRow['profileType'];

        $specificTable = ($profileType === 'client' || $profileType === 'admin') ? 'clients' : 'drivers';
        $querySpecific = "SELECT * FROM $specificTable WHERE userID = $userID";
        $resultSpecific = $conn->query($querySpecific);

        if ($resultSpecific->num_rows > 0) {
            $specificRow = $resultSpecific->fetch_assoc();

            $response = [
                'success' => true,
                'userID' => $userID,
                'username' => $username,
                'profileType' => $profileType,
                'specificInfo' => $specificRow,
            ];

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
