<?php
session_start();
require('connect.php');
header('Content-Type: application/json');

if (!isset($_POST['email'], $_POST['password'])) {
    http_response_code(400);
    echo json_encode(array("message" => "Missing email or password."));
    exit;
}

$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

$stmt = $conn->prepare("SELECT id_U, type, password FROM user WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result === false) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error."));
    exit;
}

if ($result->num_rows == 1) {
    $user = $result->fetch_assoc();

    if ($password === $user['password']) {
        $_SESSION['email'] = $email;
        $_SESSION['logged'] = true;

        http_response_code(200);
        echo json_encode(array("message" => "Login successful.", "id" => $user['id_U'], "type" => $user['type']));

    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid email or password."));
    }
} else {
    http_response_code(401);
    echo json_encode(array("message" => "Invalid email or password."));
}
?>