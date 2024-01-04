<?php
require './vendor/autoload.php';

use Firebase\JWT\JWT;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$servername = 'localhost';
$mysqlusername = "root";
$userpassword = "20051607";
$dbname = "taxi_website_db";

$conn = new mysqli($servername, $mysqlusername, $userpassword, $dbname);

if ($conn->connect_error) {
  die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $rawData = file_get_contents("php://input");
  $requestData = json_decode($rawData, true);

  $username = mysqli_real_escape_string($conn, $requestData['username']);
  $pwd = $requestData['pwd'];

  $stmt = $conn->prepare("SELECT userID, pwd FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashedPwdFromDB = $row['pwd'];

    if (password_verify($pwd, $hashedPwdFromDB)) {
      $userID = $row['userID'];

      function generateRandomString($length = 32)
      {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
          $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
      }

      $key = generateRandomString();
      $payload = [
        "iss" => "http://localhost/taxi-website-project/taxi-website-php",
        "aud" => "http://localhost/taxi-website-project/taxi-website-project-react",
        "iat" => time(),
        "exp" => time() + (60 * 60),
        "userID" => $userID,
      ];
      $jwt = JWT::encode($payload, $key, 'HS256');

      echo json_encode(['success' => true, 'token' => $jwt, 'message' => 'Login successful']);
    } else {
      echo json_encode(['success' => false, 'message' => 'Invalid password']);
    }
  } else {
    echo json_encode(['success' => false, 'message' => 'Invalid username']);
  }

  $stmt->close();
  $conn->close();
}
