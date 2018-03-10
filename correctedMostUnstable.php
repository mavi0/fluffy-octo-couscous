<?php
//setting header to json
header('Content-Type: application/json');

//database
include_once("constants.php");

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT Prefix, COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%%Y-%%m-%%d %%H:%%i:%%s')) AS Prefix_Count FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY Prefix ORDER BY COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%%Y-%%m-%%d %%H:%%i:%%s')) DESC LIMIT 10;");

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
