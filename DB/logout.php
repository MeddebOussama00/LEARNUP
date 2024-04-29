<?php
session_start();
require('connect.php');

$_SESSION = array();

session_destroy();
exit;
?>