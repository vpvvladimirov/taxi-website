<?php
include_once 'headers.php';
include_once 'db_connection.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$tripID = $requestData['tripID'];
$driverID = $requestData['driverID'];

$query = "UPDATE trips SET driverID = $driverID, currentStatus = 'in progress' WHERE tripID = $tripID AND currentStatus = 'active'";
$conn->query($query);

$query1 = "DELETE FROM active_trips WHERE tripID = $tripID";
$conn->query($query1);

$conn->close();
