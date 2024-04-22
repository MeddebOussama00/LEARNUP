<?php
require('connect.php');


if(isset($_GET["query"])){
    $q = $_GET["query"];
    switch ($q) {
        case 'getaccountDoc': 
            $id = $_GET['c'];
            $stmt = $conn->prepare("SELECT id_d, title, date, nblike,nbdislike,subject_id2, id_U FROM document WHERE id_U=?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->bind_result($id_d, $title, $date,$nblike,$nbdislike,$subject_id2,$id_U);
            $rep = [];
            while ($stmt->fetch()) {
                $rep[] = ['id_d' => $id_d, 'title' => $title, 'date' => $date,'nblike'=>$nblike,'nbdislike'=>$nbdislike,'subject_id2' => $subject_id2,'id_U' => $id_U];
            }
            echo json_encode($rep);
             break;
        case 'putReport':
            $data = json_decode(file_get_contents("php://input"), true);
            if (isset($data['id']) && isset($data['data'])) {
                $id = $data['id'];
                $d = $data['data'];
                $stmt = $conn->prepare("UPDATE document SET report = ? WHERE id_d = ?");
                $stmt->bind_param("ii", $d, $id);
                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Report updated successfully']);
                } else {
                    http_response_code(500);
                    echo json_encode(['error' => 'Failed to update report status']);
                }
            } else {
                http_response_code(400); // Bad request
                echo json_encode(['error' => 'Missing or invalid data']);
            }
            break;
    
        case 'deleteCour':
                $id = $_GET['c'];
                $stmt = $conn->prepare("DELETE FROM document WHERE id_d = ?");
                $stmt->bind_param("i", $id);
                if ($stmt->execute()) {
                    echo json_encode(['message' => 'Document deleted successfully']);
                } else {
                    echo json_encode(['error' => 'Failed to delete document']);
                }                
                break;
        case 'report':
                $stmt = $conn->prepare("SELECT id_d, title, date, id_U, subject_id2 FROM document WHERE report=1");
                $stmt->execute();
                $stmt->bind_result($id_d, $title, $date, $id_U, $subject_id2);
                $rep = [];
                while ($stmt->fetch()) {
                    $rep[] = ['id_d' => $id_d, 'title' => $title, 'date' => $date, 'id_U' => $id_U, 'subject_id2' => $subject_id2];
                }
                echo json_encode($rep);
            break; 
        case 'cour':
                $c = 2;
                $stmt = $conn->prepare("SELECT id_d, title, dataD, type, date, nblike, nbdislike, report, id_U, subject_id2 FROM document WHERE type='cour' AND subject_id2=?");
                $stmt->bind_param("i", $c);
                $stmt->execute();
                $stmt->bind_result($id_d, $title, $dataD, $type, $date, $nblike, $nbdislike, $report, $id_U, $subject_id2);
                $cour = [];
    
                while ($stmt->fetch()) {
                    $data = '';
                    $chunk_size = 1024 * 1024;
                    $stream = fopen('php://memory', 'r+');
                    fwrite($stream, $dataD);
                    rewind($stream);
    
                    while (!feof($stream)) {
                        $data .= fread($stream, $chunk_size);
                    }
    
                    fclose($stream);
    
                    $base64_data = base64_encode($data);
                    $cour[] = ['id_d' => $id_d, 'title' => $title, 'dataD' => $base64_data, 'type' => $type, 'date' => $date, 'nblike' => $nblike, 'nbdislike' => $nbdislike, 'report' => $report, 'id_U' => $id_U, 'subject_id2' => $subject_id2];
                }
    
                echo json_encode($cour);
                break;
        case 'exman':
                    $c = 2;
                    $stmt = $conn->prepare("SELECT id_d, title, dataD, type, date, nblike, nbdislike, report, id_U, subject_id2 FROM document WHERE type='examn' AND subject_id2=?");
                    $stmt->bind_param("i", $c);
                    $stmt->execute();
                    $stmt->bind_result($id_d, $title, $dataD, $type, $date, $nblike, $nbdislike, $report, $id_U, $subject_id2);
                    $cour = [];
        
                    while ($stmt->fetch()) {
                        $data = '';
                        $chunk_size = 1024 * 1024;
                        $stream = fopen('php://memory', 'r+');
                        fwrite($stream, $dataD);
                        rewind($stream);
        
                        while (!feof($stream)) {
                            $data .= fread($stream, $chunk_size);
                        }
        
                        fclose($stream);
        
                        $base64_data = base64_encode($data);
                        $cour[] = ['id_d' => $id_d, 'title' => $title, 'dataD' => $base64_data, 'type' => $type, 'date' => $date, 'nblike' => $nblike, 'nbdislike' => $nbdislike, 'report' => $report, 'id_U' => $id_U, 'subject_id2' => $subject_id2];
                    }
        
                    echo json_encode($cour);
                    break;
        case 'getCour':
                $courseId = isset($_GET['id']) ? (int)$_GET['id'] : 0; 
                $stmt = $conn->prepare("SELECT id_d, title, dataD, type, date, nblike, nbdislike, report, id_U, subject_id2 FROM document WHERE id_d=?");
                $stmt->bind_param("i", $courseId);
                $stmt->execute();
                $stmt->bind_result($id_d, $title, $dataD, $type, $date, $nblike, $nbdislike, $report, $id_U, $subject_id2);
                $cour = [];
    
                while ($stmt->fetch()) {
                    $data = '';
                    $chunk_size = 1024 * 1024;
                    $stream = fopen('php://memory', 'r+');
                    fwrite($stream, $dataD);
                    rewind($stream);
    
                    while (!feof($stream)) {
                        $data .= fread($stream, $chunk_size);
                    }
    
                    fclose($stream);
    
                    $base64_data = base64_encode($data);
                    $cour[] = ['id_d' => $id_d, 'title' => $title, 'dataD' => $base64_data, 'type' => $type, 'date' => $date, 'nblike' => $nblike, 'nbdislike' => $nbdislike, 'report' => $report, 'id_U' => $id_U, 'subject_id2' => $subject_id2];
                }    
                echo json_encode($cour);
                break;    
        case 'addCour':
                    $data = json_decode(file_get_contents("php://input"), true);
                    if (isset($data['title']) && isset($data['data']) && isset($data['type']) && isset($data['date']) && isset($data['id_U']) && isset($data['id_sub'])) {
                        $title = $data['title'];
                        $fileContent = base64_decode($data['data']);
                        $type = $data['type'];
                        $date = $data['date'];
                        $id_U = $data['id_U'];
                        $id_sub = $data['id_sub'];
                        $stmt = $conn->prepare("INSERT INTO document (title, dataD, type, date, nblike, nbdislike, report, id_U, subject_id2) VALUES (?, ?, ?, ?, 0, 0, 0, ?, ?)");
                        $stmt->bind_param("sbssii", $title, $fileContent,$type, $date, $id_U, $id_sub);
                        
                
                        if ($stmt->execute()) {
                            echo json_encode(['message' => 'Course added successfully']);
                        } else {
                            http_response_code(500);
                            echo json_encode(['error' => 'Failed to add course']);
                        }
                    } else {
                        http_response_code(400); // Bad request
                        echo json_encode(['error' => 'Missing or invalid data']);
                    }
    
                 break;
                 case 'like':
                    $data = json_decode(file_get_contents("php://input"), true);
                    if (isset($data['id']) && isset($data['data'])) {
                        $id = $data['id'];
                        $d = $data['data'];
                        $stmt = $conn->prepare("UPDATE document SET nblike = nblike + ? WHERE id_d = ?");
                        $stmt->bind_param("ii", $d, $id);
                        if ($stmt->execute()) {
                            echo json_encode(['message' => 'Like updated successfully']);
                        } else {
                            http_response_code(500);
                            echo json_encode(['error' => 'Failed to update like status']);
                        }
                    } else {
                        http_response_code(400); // Bad request
                        echo json_encode(['error' => 'Missing or invalid data']);
                    }
                    break;
                
                case 'dislike':
                    $data = json_decode(file_get_contents("php://input"), true);
                    if (isset($data['id']) && isset($data['data'])) {
                        $id = $data['id'];
                        $d = $data['data'];
                        $stmt = $conn->prepare("UPDATE document SET nblike = nblike - 1 WHERE id_d = ?");
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


?>
 