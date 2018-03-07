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
$query = sprintf("SELECT Prefix,AS_Path,ASPath_Count,LastModified FROM v_routes_history WHERE PeerName='$peername' AND Origin_AS=$as");

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
