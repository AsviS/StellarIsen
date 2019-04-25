<?php
define("USER", "x");
define("PASSWORD", "x");
define("DNS","mysql:host=x;dbname=stellarisen");
try 
{
	$pdo = new PDO (DNS, USER, PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
}

catch (PDOException $e) 
{
	die($e->getMessage());
}


?>
