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
$query = sprintf("SELECT Origin_AS, COUNT(DISTINCT Prefix) AS prefixes FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY Origin_AS ORDER BY COUNT(DISTINCT Prefix) DESC LIMIT 20;");

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
