<?php
session_start();

function setSessionData($userID, $username, $profileType)
{
  $_SESSION['userID'] = $userID;
  $_SESSION['username'] = $username;
  $_SESSION['profileType'] = $profileType;
}

function logout()
{
  setcookie(session_name(), '', time() - 3600, '/');
  session_unset();
  session_destroy();
}
