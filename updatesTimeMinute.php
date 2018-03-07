<?php
//setting header to json
header('Content-Type: application/json');

//database
include_once("constants.php");

$timestamp = $_POST['timestamp'];
$endTimeStamp = substr($timestamp, 0, 17);
$endTimeStamp = $endTimeStamp . "59.998";


// print $timestamp;
//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT LastModified AS Timestamp, COUNT(LastModified) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '$timestamp' AND '$endTimeStamp' GROUP BY LastModified ORDER BY LastModified;");

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
