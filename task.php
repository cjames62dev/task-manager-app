<?php
include "db.php";

$action = $_POST['action'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if ($action === 'add') {
    $name = $conn->real_escape_string($_POST['name']);
    $conn->query("INSERT INTO tasks (name, status) VALUES ('$name', 'pending')");
  } elseif ($action === 'delete') {
    $id = (int)$_POST['id'];
    $conn->query("DELETE FROM tasks WHERE id=$id");
  } elseif ($action === 'done') {
    $id = (int)$_POST['id'];
    $conn->query("UPDATE tasks SET status='done' WHERE id=$id");
  }
  exit;
}

$result = $conn->query("SELECT * FROM tasks ORDER BY id DESC");
$tasks = [];
while ($row = $result->fetch_assoc()) {
  $tasks[] = $row;
}
echo json_encode($tasks);
?>