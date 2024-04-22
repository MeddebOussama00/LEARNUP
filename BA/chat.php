<?php
require('connect.php');
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
// Allow the GET method from any origin
header("Access-Control-Allow-Methods: GET");


if(isset($_GET["query"])) {
    $q = $_GET["query"];
    switch ($q) {
        case 'getaccount': 
            $id=$_GET["c"];
            $stmt = $conn->prepare("SELECT idMessage, msg, dateMessage, nblike, nbdislike, report, id FROM `message` where id=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $messages = [];
            while ($row = $result->fetch_assoc()) {
                $stmt3 = $conn->prepare("SELECT username FROM `user` where id_U=?");
                $stmt3->bind_param("i", $row["id"]);
                $stmt3->execute();
                $result3 = $stmt3->get_result();
                if ($result3->num_rows > 0) {
                    $username_row = $result3->fetch_assoc();
                    $username = $username_row["username"];
                } else {
                    $username = "Unknown";
                }
                $message = [
                    "idMessage" => $row["idMessage"],
                    "msg" => $row["msg"],
                    "dateMessage" => $row["dateMessage"],
                    "nblike" => $row["nblike"],
                    "nbdislike" => $row["nbdislike"],
                    "report" => $row["report"],
                    "id" => $row["id"],
                    "username" => $username
                ];
                $responses = [];
                $stmt2 = $conn->prepare("SELECT id_r, msg, dateMessage, id, idM FROM `reponse` WHERE idM=?");
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
            echo json_encode($messages);
             break;

        case 'putReport':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && isset($data['data'])) {
                $id = $data['id'];
                $d = $data['data'];
                $stmt = $conn->prepare("UPDATE message SET report = ? WHERE idMessage = ?");
                $stmt->bind_param("ii",$d,$id);
                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Report updated successfully']);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to update report status']);
                }
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'Missing or invalid data']);
            }
            break;

        case 'getreport':
            $stmt = $conn->prepare("SELECT idMessage, msg, dateMessage, nblike, nbdislike, report, id FROM `message` where report=1");
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
                    "report" => $row["report"],
                    "id" => $row["id"],
                    "username" => "admin"
                ];

                $responses = [];
                $stmt2 = $conn->prepare("SELECT id_r, msg, dateMessage, id, idM FROM `reponse` WHERE idM=?");
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
            echo json_encode($messages);
            break;

        case "addcomment":
            $newComment = json_decode(file_get_contents("php://input"), true);
            if(addComment($newMessage, $conn)) {
                echo json_encode(['message' => 'Message added successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to add message']);
            }
            break;
            
        case "get":
            $stmt = $conn->prepare("SELECT idMessage, msg, dateMessage, nblike, nbdislike, report, id FROM `message`");
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
                    "report" => $row["report"],
                    "id" => $row["id"],
                    "username" => "admin"
                ];

                $responses = [];
                $stmt2 = $conn->prepare("SELECT id_r, msg, dateMessage, id, idM FROM `reponse` WHERE idM=?");
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
            echo json_encode($messages);
            break;

        case 'addmessage':
            $newMessage = json_decode(file_get_contents("php://input"), true);
            if(addMessage($newMessage, $conn)) {
                echo json_encode(['message' => 'Message added successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to add message']);
            }
            break;

        case 'deleteMessage':
            $id = $_GET['c'];
            $stmt = $conn->prepare("DELETE FROM message WHERE idMessage = ?");
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Document deleted successfully']);
            } else {
                echo json_encode(['error' => 'Failed to delete document']);
            }                
            break;

        case 'like':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && isset($data['data'])) {
                $id = $data['id'];
                $d = $data['data'];
                $stmt = $conn->prepare("UPDATE message SET nblike = nblike + 1 WHERE id = ?");
                $stmt->bind_param("i", $id);
                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Like updated successfully']);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to update like status']);
                }
            } else {
                http_response_code(400); 
                echo json_encode(['error' => 'Missing or invalid data']);
            }
            break;

        case 'dislike':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && isset($data['data'])) {
                $id = $data['id'];
                $d = $data['data'];
                $stmt = $conn->prepare("UPDATE message SET nbdislike = nbdislike + 1 WHERE id = ?");
                $stmt->bind_param("i", $id);
                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Dislike updated successfully']);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to update dislike status']);
                }
            } else {
                http_response_code(400); // Bad request
                echo json_encode(['error' => 'Missing or invalid data']);
            }
            break;
    }
}
function addMessage($newMessage, $conn) {
    $stmt = $conn->prepare("INSERT INTO message (msg, dateMessage, nblike, nbdislike, report, id) VALUES (?, ?, 0, 0, 0, ?)");
    $stmt->bind_param("ssi", $newMessage['content'], $newMessage['date'], $newMessage['id_user']);
    return $stmt->execute();
}

function addComment($newComment, $conn) {
    $stmt = $conn->prepare("INSERT INTO reponse (msg, dateMessage, idM) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $newComment['msg'], $newComment['dateMessage'], $newComment['idM']);
    $stmt->execute();
    return $stmt->execute();
}
?>
