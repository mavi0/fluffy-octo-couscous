<?php

$command = 'whois -h whois.cymru.com " -f -n '.$_POST['ip'].'"';
// print $command;
$escaped_command = escapeshellcmd($command);
// print
$res = exec($escaped_command);
// print $res;
$whois = substr($res, 0, 8);
// print $whois;
// $command = 'whois -h whois.cymru.com " -f -n AS15169"';
$command = 'whois -h whois.cymru.com " -f -n AS'.$whois.'"';

$escaped_command1 = escapeshellcmd($command);

system($escaped_command1);
