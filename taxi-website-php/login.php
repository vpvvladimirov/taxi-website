<?php
include_once 'headers.php';
include_once 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $requestData = json_decode(file_get_contents("php://input"), true);

  $username = $requestData['username'];
  $pwd = $requestData['pwd'];

  $query = "SELECT userID, pwd, profileType FROM users WHERE username = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashedPwdFromDB = $row['pwd'];

    if (password_verify($pwd, $hashedPwdFromDB)) {
      $userID = $row['userID'];
      $profileType = $row['profileType'];

      if ($profileType === 'driver') {
        $query = 'SELECT driverID FROM drivers WHERE userID = ?';
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $userID);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          $driverID = $row['driverID'];

          $query = "UPDATE drivers SET status = 'active' WHERE driverID = ?";
          $stmt = $conn->prepare($query);
          $stmt->bind_param("i", $driverID);
          $stmt->execute();
          $result = $stmt->get_result();
        }
      }

      $response = ['success' => true, 'message' => 'Login successful', 'userID' => $userID, 'username' => $username, 'profileType' => $profileType];
    } else {
      $response = ['success' => false, 'message' => 'Invalid password'];
    }
  } else {
    $response = ['success' => false, 'message' => 'Invalid username'];
  }

  echo json_encode($response);

  $stmt->close();
}

$conn->close();
