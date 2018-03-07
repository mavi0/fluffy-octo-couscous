$('#asSearch').keypress(function (e) {
  if (e.which == 13) {
    autonomousSystem($( "input:first" ).val());
    return false;    //<---- Add this line
  }
});


$('#asSearchBtn').click(function(){
  autonomousSystem($( "input:first" ).val());
});

function autonomousSystem(as) {
  if ($.isNumeric(as)) {
    // console.log(as);
    window.location.href = `aslookup.html?as=${as}`;
    // console.log(as);
  } else {
    alert("Plese enter a valid number");
  }
}
