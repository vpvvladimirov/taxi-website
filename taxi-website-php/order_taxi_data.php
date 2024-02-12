<?php
include('db_connection.php');

function handleOrder($data)
{
  global $conn;

  $pickupAddress = $data['pickupAddress'];
  $dropoffAddress = $data['dropoffAddress'];

  $insertTripsQuery = "INSERT INTO trips (pickupAddress, dropoffAddress) VALUES ('$pickupAddress', '$dropoffAddress')";

  if ($conn->query($insertTripsQuery) === TRUE) {
    return ['success' => true, 'message' => 'New trips record created successfully'];
  } else {
    return ['success' => false, 'message' => 'Error creating trip: ' . $conn->error];
  }
}
