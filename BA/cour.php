<?php
require('connect.php');
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}
$query=$_GET['query'];
switch ($query) {
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
} 


?>