<?php
$conn = new mysqli("localhost", "root", "", "taskdb");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>