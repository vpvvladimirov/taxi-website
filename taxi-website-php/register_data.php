<?php
include('db_connection.php');

function handleRegistration($data)
{
    global $conn;

    $firstName = $data['firstName'];
    $lastName = $data['lastName'];
    $username = $data['username'];
    $email = $data['email'];
    $pwd = password_hash($data['pwd'], PASSWORD_DEFAULT);
    $dateOfBirth = $data['dateOfBirth'];
    $gender = $data['gender'];
    $profileType = $data['profileType'];

    $insertUserQuery = "INSERT INTO users (username, pwd, profileType) VALUES ('$username', '$pwd', '$profileType')";

    if ($conn->query($insertUserQuery) === TRUE) {
        $userID = $conn->insert_id;

        if (strpos($email, '@vvtaxi.net') !== false) {
            $insertDriverQuery = "INSERT INTO drivers (firstName, lastName, email, dateOfBirth, gender, userID) VALUES ('$firstName', '$lastName', '$email', '$dateOfBirth', '$gender', $userID)";
            $conn->query($insertDriverQuery);
        } else {
            $insertClientQuery = "INSERT INTO clients (firstName, lastName, email, dateOfBirth, gender, userID) VALUES ('$firstName', '$lastName', '$email', '$dateOfBirth', '$gender', $userID)";
            $conn->query($insertClientQuery);
        }

        return ['success' => true, 'message' => 'New record created successfully'];
    } else {
        return ['success' => false, 'message' => 'Error: ' . $conn->error];
    }
}
