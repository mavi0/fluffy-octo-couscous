
SELECT DISTINCT Origin, Origin_AS FROM v_routes_history LIMIT 5;
SELECT Prefix, Origin_AS FROM v_routes_history LIMIT 5;
SELECT DISTINCT Origin_AS, ASPath_Count FROM v_routes_history LIMIT 5;
SELECT DISTINCT Origin_AS, ASPath_Count FROM v_routes_history ORDER BY ASPath_Count DESC LIMIT 5;
SELECT Prefix, COUNT(Prefix) AS Prefix_Count FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY Prefix ORDER BY COUNT(Prefix) DESC LIMIT 5;
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%Y-%m-%d %H:00:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%Y-%m-%d %H:00:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%Y-%m-%d %H:00:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%Y-%m-%d %H:00:00') ASC LIMIT 20;
--Same as prev w/ escaped %
SELECT DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00') AS Timestamp, COUNT(DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00')) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00') ORDER BY DATE_FORMAT(DATE_ADD(LastModified, INTERVAL 30 MINUTE),'%%Y-%%m-%%d %%H:00:00') ASC LIMIT 5;
SELECT UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 30 MINUTE)) AS Timestamp, COUNT(UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 30 MINUTE))) AS Updates FROM v_routes_history WHERE PeerName='10.0.2.2' GROUP BY UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 30 MINUTE)) ORDER BY UNIX_TIMESTAMP(DATE_ADD(LastModified, INTERVAL 30 MINUTE)) ASC LIMIT 20;
