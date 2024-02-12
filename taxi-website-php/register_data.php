<?php
include('db_connection.php');

function generateDriverID()
{
    $characters = '0123456789';
    $driverID = '';
    $length = 4;

    for ($i = 0; $i < $length; $i++) {
        $driverID .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $driverID;
}

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
            $driverID = generateDriverID();

            $insertDriverQuery = "INSERT INTO drivers (driverID, userID, firstName, lastName, email, dateOfBirth, gender) VALUES ($driverID, $userID, '$firstName', '$lastName', '$email', '$dateOfBirth', '$gender')";

            if ($conn->query($insertDriverQuery) === TRUE) {
                $insertVehicleQuery = "INSERT INTO vehicles (driverID) VALUES ($driverID)";

                if ($conn->query($insertVehicleQuery) === TRUE) {
                    $vehicleID = $conn->insert_id;

                    $updateDriverQuery = "UPDATE drivers SET vehicleID = $vehicleID WHERE driverID = $driverID";

                    if ($conn->query($updateDriverQuery) === TRUE) {
                        return ['success' => true, 'message' => 'New driver, vehicle, and associated records created successfully'];
                    } else {
                        return ['success' => false, 'message' => 'Error updating driver with vehicleID: ' . $conn->error];
                    }
                } else {
                    return ['success' => false, 'message' => 'Error inserting vehicle: ' . $conn->error];
                }
            } else {
                return ['success' => false, 'message' => 'Error inserting driver: ' . $conn->error];
            }
        } else {
            $insertClientQuery = "INSERT INTO clients (firstName, userID, lastName, email, dateOfBirth, gender) VALUES ('$firstName', $userID, '$lastName', '$email', '$dateOfBirth', '$gender')";
            if ($conn->query($insertClientQuery) === TRUE) {
                return ['success' => true, 'message' => 'New client record created successfully'];
            } else {
                return ['success' => false, 'message' => 'Error inserting client: ' . $conn->error];
            }
        }
    } else {
        return ['success' => false, 'message' => 'Error inserting user: ' . $conn->error];
    }
}
