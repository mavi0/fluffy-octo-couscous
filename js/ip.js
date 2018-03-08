$('#ipSearch').keypress(function (e) {
  if (e.which == 13) {
    autonomousSystem($( "input:first" ).val());
    return false;    //<---- Add this line
  }
});


$('#ipSearchBtn').click(function(){
  autonomousSystem($( "input:first" ).val());
});

function autonomousSystem(ip) {
  if (ValidateIPaddress(ip)) {
    console.log(ip);
    window.location.href = `iplookup.html?ip=${ip}`;
  }
}

function ValidateIPaddress(ipaddress) {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return (true);
  }
  alert("Please enter a valid IP address");
  return (false);
}
