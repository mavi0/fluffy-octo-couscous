<?php
//setting header to json
header('Content-Type: application/json');

//database
include_once("constants.php");

$peername = $_POST['peername'];
$as = $_POST['as'];

//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}

//query to get data from the table
$query = sprintf("SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00')) AS Updates FROM v_routes_history WHERE PeerName='$peername' AND Origin_AS=$as GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00') ASC;");

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
