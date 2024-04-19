<?php
require('connect.php');


if(isset($_GET['query'])){
    $query=$_GET['query'];
    switch ($query) {
        case 'level':
            $stmt = $conn->prepare("SELECT * FROM level");
            $stmt->execute();
            $res= $stmt->get_result();
            if($stmt->execute()){
                $levels = [];
                while ($row = $res->fetch_assoc()) {
                    $levels[] = $row;
                }
                echo json_encode($levels);
            }else
            {
                http_response_code(404);
            }
            break;
            case 'specialty':
                $level = $_GET['s'];
                $stmt = $conn->prepare("SELECT idspe, namespe FROM  speciality WHERE idlevel = ?");
                $stmt->bind_param("i", $level);
                 $stmt->execute();

                if($stmt->execute()){
                        $res = $stmt->get_result();
                        $specs = [];
                        while ($row = $res->fetch_assoc()) {
                            $specs[] = $row; 
                        }
                        echo json_encode($specs);
                }else{
                    http_response_code(404);
                }
                break;
                case 'class':
                    $spe = $_GET['s'];
                    $stmt = $conn->prepare("SELECT idclass,nameclass FROM class WHERE idspe=?");
                    $stmt->bind_param("i", $spe);
                     $stmt->execute();
    
                    if($stmt->execute()){
                            $res = $stmt->get_result();
                            $class = [];
                            while ($row = $res->fetch_assoc()) {
                                $class[] = $row; 
                            }
                            echo json_encode($class);
                    }else{
                        http_response_code(404);
                    }
                    break;        
                    case 'cour':
                        $class = $_GET['s'];
                        $stmt = $conn->prepare("SELECT idSubject,nameSub FROM SUBJECT WHERE idclass=?");
                        $stmt->bind_param("i", $class);
                         $stmt->execute();
        
                        if($stmt->execute()){
                                $res = $stmt->get_result();
                                $cour = [];
                                while ($row = $res->fetch_assoc()) {
                                    $cour[] = $row; 
                                }
                                echo json_encode($cour);
                        }else{
                            http_response_code(404);
                        }
                        break; 
        default:
    }
}