<?php
require('connect.php');

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); 
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}
if (isset($_GET["query"])) {
    $q = $_GET["query"];
    switch ($q):
        case "addcomment":
            $newComment = json_decode(file_get_contents("php://input"), true);
            echo json_encode(addComment($newComment, $conn));
            break;        
        case "get": 
            $stmt = $conn->prepare("SELECT idMessage, msg, dateMessage, nblike, nbdislike, id FROM `message`");
            $stmt->execute();
            $result = $stmt->get_result();
            $messages = [];
            while ($row = $result->fetch_assoc()) {
                $message = [
                    "idMessage" => $row["idMessage"],
                    "msg" => $row["msg"],
                    "dateMessage" => $row["dateMessage"],
                    "nblike" => $row["nblike"],
                    "nbdislike" => $row["nbdislike"],
                    "id" => $row["id"],
                    "username" => "admin"
                ];

                $responses = [];
                $stmt2 = $conn->prepare("SELECT id_r, msg, dateMessage, id,idM FROM `reponse` WHERE idM=?");
                $stmt2->bind_param("i", $row["idMessage"]);
                $stmt2->execute();
                $result2 = $stmt2->get_result();
                while ($row2 = $result2->fetch_assoc()) {
                    $responses[] = [
                        "id_r" => $row2["id_r"],
                        "msg" => $row2["msg"],
                        "dateMessage" => $row2["dateMessage"],
                        "id" => $row2["id"],
                        "idM" => $row2["idM"] 
                    ];
                }

                $message["responses"] = $responses;
                $messages[] = $message;
            }
            header('Content-Type: application/json');
            echo json_encode($messages, JSON_PRETTY_PRINT);
            break;
        case 'addmessage':
            $newMessage = json_decode(file_get_contents("php://input"), true);
            echo json_encode(addMessage($newMessage, $conn)); 
            break; 
    endswitch;
}

header('Content-Type: application/json');
function addMessage($newMessage, $conn) {

    $stmt = $conn->prepare("INSERT INTO message (msg,idMessage,dateMessage, nblike, nbdislike,id) VALUES (?, ?, ?, ?,?,?)");
    $stmt->bind_param("ssssis", $newMessage['content'], $newMessage['id'], $newMessage['date'], $newMessage['nblike'], $newMessage['nbdislike'], $newMessage['id_user']);
    $stmt->execute();
    return $newMessage;
}
function addComment($newComment, $conn) {
    $stmt = $conn->prepare("INSERT INTO reponse (id_r, msg, dateMessage, id, idM) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issii", $newComment['id_r'], $newComment['msg'], $newComment['dateMessage'], $newComment['id_user'], $newComment['idM']);
    $stmt->execute();
    
    return $newComment;
}

?>
