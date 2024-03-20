<?php
include_once 'db_connection.php';
include_once 'headers.php';

$requestData = json_decode(file_get_contents("php://input"), true);

$userID = $requestData['userID'];
$rating = $requestData['rating'];
$comment = $requestData['comment'];

$query = "SELECT clientID FROM clients WHERE userID = '$userID'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $clientID = $row['clientID'];

  $query = "SELECT * FROM trips WHERE clientID = '$clientID' AND currentStatus = 'in progress'";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $driverID = $row['driverID'];
    $tripID = $row['tripID'];

    $query = "INSERT INTO reviews (clientID, driverID, tripID, rating, comment) VALUES ($clientID, $driverID, $tripID, $rating, '$comment')";

    if ($conn->query($query) === TRUE) {
      $reviewID = $conn->insert_id;

      $query = "UPDATE trips SET reviewID = '$reviewID', currentStatus = 'reviewed' WHERE tripID = '$tripID'";

      if ($conn->query($query) === TRUE) {
        $query = "UPDATE drivers SET tripCount = tripCount + 1 WHERE driverID = '$driverID'";

        if ($conn->query($query) === TRUE) {
          $query = "UPDATE drivers SET averageRating = (averageRating * (tripCount - 1) + $rating) / tripCount WHERE driverID = '$driverID'";

          if ($conn->query($query) === TRUE) {
            $response = ['success' => true, 'message' => 'New review record created successfully'];
          } else {
            $response = ['success' => false, 'message' => 'Error updating driver average rating: ' . $conn->error];
          }
        } else {
          $response = ['success' => false, 'message' => 'Error updating trip count: ' . $conn->error];
        }
      } else {
        $response = ['success' => false, 'message' => 'Error updating trip status: ' . $conn->error];
      }
    } else {
      $response = ['success' => false, 'message' => 'Error inserting review record: ' . $conn->error];
    }
  } else {
    $response = ['success' => false, 'message' => 'No in-progress trip found for the user'];
  }
} else {
  $response = ['success' => false, 'message' => 'User not found'];
}

echo json_encode($response);
$conn->close();
