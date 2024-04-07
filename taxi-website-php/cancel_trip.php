<?php
include_once 'db_connection.php';
include_once 'headers.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $requestData = json_decode(file_get_contents("php://input"), true);

  if (isset($requestData['userID'])) {
    $userID = $requestData['userID'];

    $query = "SELECT clientID FROM clients WHERE userID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $clientID = $row['clientID'];
      $stmt->close();

      $query = "DELETE FROM trips WHERE clientID = ? AND currentStatus = 'active'";
      $stmt = $conn->prepare($query);
      $stmt->bind_param("i", $clientID);
      if ($stmt->execute()) {
        echo json_encode(array("message" => "Trip cancelled successfully"));
      } else {
        echo json_encode(array("message" => "Error cancelling trip: " . $conn->error));
      }
      $stmt->close();
    } else {
      echo json_encode(array("message" => "No client found for the given user ID."));
    }
  } else {
    echo json_encode(array("message" => "Incomplete data provided."));
  }
} else {
  echo json_encode(array("message" => "Invalid request method."));
}

$conn->close();
