<?php
//setting header to json
header('Content-Type: application/json');

//database
include_once("constants.php");

$peername = $_POST['peername'];
$ip = $_POST['ip'];
$timestamp = $_POST['timestamp'];
$endTimeStamp = substr($timestamp, 0, 14);
$endTimeStamp = $endTimeStamp . "59:59.998";
//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT Origin_AS, AS_Path, ASPath_Count FROM v_routes_history WHERE PeerName='$peername' AND Prefix='$ip' AND LastModified BETWEEN '$timestamp' AND '$endTimeStamp' ORDER BY LastModified;");

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
