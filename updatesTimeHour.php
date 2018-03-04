<?php
//setting header to json
header('Content-Type: application/json');

//database
include_once("constants.php");

$timestamp = $_POST['timestamp'];
$endTimeStamp = substr($timestamp, 0, 14);
$endTimeStamp = $endTimeStamp . "59:59.998";

// print $timestamp;
//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d %%H:%%i:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d %%H:%%i:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '$timestamp' AND '$endTimeStamp' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d %%H:%%i:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d-%%H:%%i:00');");

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
