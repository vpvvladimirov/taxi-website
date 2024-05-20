<?php
include_once 'db_connection.php';
include_once 'headers.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $userID = $requestData['userID'];
  $rating = $requestData['rating'];
  $comment = $requestData['comment'];

  $query = "SELECT clientID FROM clients WHERE userID = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("i", $userID);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $clientID = $row['clientID'];

    $query = "SELECT * FROM trips WHERE clientID = ? AND currentStatus = 'in progress'";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $clientID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $driverID = $row['driverID'];
      $tripID = $row['tripID'];

      $query = "INSERT INTO reviews (tripID, rating, comment) VALUES (?, ?, ?)";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("ids", $tripID, $rating, $comment);
      $stmt->execute();

      if ($stmt->affected_rows > 0) {
        $reviewID = $stmt->insert_id;

        $query = "UPDATE trips SET reviewID = ?, currentStatus = 'reviewed' WHERE tripID = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("ii", $reviewID, $tripID);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
          $query = "UPDATE drivers SET status = 'active', tripCount = tripCount + 1, averageRating = (averageRating + ?) / tripCount WHERE driverID = ?";
          $stmt = $conn->prepare($query);
          $stmt->bind_param("di", $rating, $driverID);
          $stmt->execute();

          if ($stmt->affected_rows > 0) {
            $response = ['success' => true, 'message' => 'New review record created successfully'];
          } else {
            $response = ['success' => false, 'message' => 'Error updating driver average rating: ' . $conn->error];
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
}

$conn->close();
