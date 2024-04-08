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
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if (isset($data['id']) && isset($data['nblike']) && isset($data['nbdislike'])) {
        $id = $data['id'];
        $nblike = $data['nblike'];
        $nbdislike = $data['nbdislike'];
        $stmt=$conn->prepare("update document set nblike=? and nbdislike=? where id_d=?");
        $stmt->bind_param("iii", $nblike, $nbdislike, $id);

    }
    $stmt->execute()
}
$c = 2;
$stmt = $conn->prepare("SELECT id_d, title, dataD, type, date, nblike, nbdislike, id_U, subject_id2 FROM document WHERE type='cour' AND subject_id2=?
");
$stmt->bind_param("i", $c);
$stmt->execute();
$stmt->bind_result($id_d,$title,$dataD,$type,$date,$nblike,$nbdislike,$id_U,$subject_id2);
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
    $cour[] = ['id_d
    ' => $id_d, 'title' => $title, 'dataD' => $base64_data, 'type' => $type,'date' => $date,'nblike' => $nblike, 'nbdislike' => $nbdislike,'id_U' => $id_U, 'subject_id2' => $subject_id2];
}

echo json_encode($cour);