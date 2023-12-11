<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Methods: POST, OPTIONS');

$servername = 'localhost';
$mysqlusername = "root";
$userpassword = "20051607";
$dbname = "taxi_website_db";

$conn = new mysqli($servername, $mysqlusername, $userpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

echo $_SERVER["REQUEST_METHOD"];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $username = $_POST['username'];
  $email = $_POST['email'];
  $confirmedPassword = $_POST['confirmedPassword'];
  $dateOfBirth = $_POST['dateOfBirth'];
  $gender = $_POST['gender'];
  $profileType = $_POST['profileType'];

  $sql = "INSERT INTO users (firstName, lastName, username, email, confirmedPassword, dateOfBirth, gender, profileType) VALUES ('$firstName', '$lastName', '$username', '$email', '$confirmedPassword', '$dateOfBirth', '$gender', '$profileType')";

  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $conn->error;
  }
}

$conn->close();
