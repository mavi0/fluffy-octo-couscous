<?php
//setting header to json
header('Content-Type: application/json');

//database
define('DB_HOST', '127.0.0.1');
define('DB_USERNAME', 'openbmp');
define('DB_PASSWORD', 'openbmp');
define('DB_NAME', 'openbmp');

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT DISTINCT Origin_AS, ASPath_Count FROM v_routes_history LIMIT 5;");

//execute query
$result = $mysqli->query($query);

//loop through the returned data
$data = array();
foreach ($result as $row) {
	$data[] = $row;
}

//free memory associated with result
$result->close();

//close connection
$mysqli->close();

//now print the data
print json_encode($data);
