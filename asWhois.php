<?php

$command = 'whois -h whois.cymru.com " -f -n AS'.$_POST['as'].'"';
system(escapeshellcmd($command));
