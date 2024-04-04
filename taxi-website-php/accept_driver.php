<?php
include_once 'headers.php';
include_once 'db_connection.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$tripID = $requestData['tripID'];
$driverID = $requestData['driverID'];

$query = "UPDATE trips SET driverID = ?, currentStatus = 'in progress' WHERE tripID = ? AND currentStatus = 'active'";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $driverID, $tripID);
$stmt->execute();
$stmt->close();

$query2 = "UPDATE drivers SET status = 'busy' WHERE driverID = ?";
$stmt2 = $conn->prepare($query2);
$stmt2->bind_param("i", $driverID);
$stmt2->execute();
$stmt2->close();

$query3 = "DELETE FROM active_trips WHERE driverID = ?";
$stmt3 = $conn->prepare($query3);
$stmt3->bind_param("i", $driverID);
$stmt3->execute();
$stmt3->close();

$query1 = "DELETE FROM active_trips WHERE tripID = ?";
$stmt1 = $conn->prepare($query1);
$stmt1->bind_param("i", $tripID);
$stmt1->execute();
$stmt1->close();

$conn->close();
