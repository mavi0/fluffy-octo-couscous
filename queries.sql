
SELECT DISTINCT Origin, Origin_AS FROM v_routes_history LIMIT 5;
SELECT Prefix, Origin_AS FROM v_routes_history LIMIT 5;
SELECT DISTINCT Origin_AS, ASPath_Count FROM v_routes_history LIMIT 5;
SELECT DISTINCT Origin_AS, ASPath_Count FROM v_routes_history ORDER BY ASPath_Count DESC LIMIT 5;

SELECT Prefix,Origin_AS,LastModified,AS_Path FROM v_routes_history WHERE PeerName='10.0.2.2' AND Prefix='185.239.144.0' ORDER BY LastModified;

SELECT Prefix, COUNT(Prefix) AS Prefix_Count FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY Prefix ORDER BY COUNT(Prefix) DESC LIMIT 10;

--correctedMostUnstable
SELECT Prefix, COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%Y-%m-%d %H:%i:%s')) AS Prefix_Count FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY Prefix ORDER BY COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%Y-%m-%d %H:%i:%s')) DESC LIMIT 10;
SELECT Prefix, COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%%Y-%%m-%d %%H:%%i:%%s')) AS Prefix_Count FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY Prefix ORDER BY COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%%Y-%%m-%%d %%H:%%i:%%s')) DESC LIMIT 10;
SELECT Prefix, COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%Y-%m-%d %H:%i:%s')) AS Prefix_Count FROM v_routes_history WHERE PeerName='10.0.2.2' AND COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%Y-%m-%d %H:%i:%s')) > 1 GROUP BY Prefix ORDER BY COUNT(DISTINCT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 SECOND),'%Y-%m-%d %H:%i:%s')) ASC LIMIT 100;



SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00') ASC LIMIT 20;
--Same as prev w/ escaped %
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00') ASC LIMIT 5;
SELECT UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 0 HOUR)) AS Timestamp, COUNT(UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 0 HOUR))) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 0 HOUR)) ORDER BY UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 0 HOUR)) ASC LIMIT 20;
--round to 1 min
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00');
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '2018-02-22 02:00:00' AND '2018-02-22 02:59:59.998' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%Y-%m-%d %H:%i:00');
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d %%H:%%i:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d %%H:%%i:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '2018-02-22 02:00:00' AND '2018-02-22 02:59:59.998' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d %%H:%%i:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 MINUTE),'%%Y-%%m-%%d-%%H:%%i:00');
--1 sec
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 SECOND),'%Y-%m-%d %H:%i:%s') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 SECOND),'%Y-%m-%d %H:%i:%s')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '2018-02-22 02:17:00' AND '2018-02-22 02:17:59.998' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 SECOND),'%Y-%m-%d %H:%i:%s') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 1 SECOND),'%Y-%m-%d %H:%i:%s');
SELECT DATE_FORMAT(LastModified,'%Y-%m-%d %H:%i:%s') AS Timestamp, COUNT(DATE_FORMAT(LastModified,'%Y-%m-%d %H:%i:%s')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '2018-02-22 02:17:00' AND '2018-02-22 02:17:59.998' GROUP BY DATE_FORMAT(LastModified,'%Y-%m-%d %H:%i:%s') ORDER BY DATE_FORMAT(LastModified,'%Y-%m-%d %H:%i:%s');
SELECT LastModified AS Timestamp, COUNT(LastModified) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '2018-02-22 02:17:00' AND '2018-02-22 02:17:59.998' GROUP BY LastModified ORDER BY LastModified;
SELECT LastModified AS Timestamp, COUNT(LastModified) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified BETWEEN '2018-02-22 02:17:00' AND '2018-02-22 02:17:59.998' GROUP BY LastModified ORDER BY LastModified;

--time table
SELECT Prefix,Origin_AS,AS_Path,ASPath_Count FROM v_routes_history WHERE PeerName='10.0.2.2' AND LastModified="2018-02-22 02:17:34.000000" ORDER BY LastModified;
SELECT Prefix,Origin_AS,AS_Path,ASPath_Count FROM v_routes_history WHERE PeerName='$peername' AND LastModified="$timestamp" ORDER BY LastModified;

--updates over time AS
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' AND Origin_AS="109" GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%Y-%m-%d %H:00:00') ASC;
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00')) AS Updates FROM v_routes_history WHERE PeerName='$peername' AND Origin_AS="$as" GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 0 HOUR),'%%Y-%%m-%%d %%H:00:00') ASC;
--updates table AS
SELECT Prefix,AS_Path,ASPath_Count,LastModified FROM v_routes_history WHERE PeerName="10.0.2.2" AND Origin_AS=15169 ORDER BY LastModified;

--top by Prefix
SELECT Origin_AS, COUNT(DISTINCT Prefix) AS prefixes FROM v_routes_history WHERE PeerName="10.0.2.2" GROUP BY Origin_AS ORDER BY COUNT(DISTINCT Prefix) DESC LIMIT 10;
