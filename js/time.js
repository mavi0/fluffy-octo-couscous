$(document).ready(function(){
  var timestamp = $.getUrlVar('timestamp');
  timestamp = decodeURIComponent(timestamp);
  $('#tableName').html(`<i class="fa fa-table"></i> Updates on: ${timestamp.substring(0, 19)}`);
  console.log(timestamp);
  //print results
  $.ajax({
		url: "time.php",
		type: "POST",
		data: {peername: '10.0.2.2', timestamp: timestamp},
		success: function(data) {
      console.log(data);
      var Prefix = [];
      var Origin = [];
      var Path = [];
      var Count = [];
      var dataTable = $('#dataTable').DataTable();
      for (var i in data) {
        console.log(i);
        Prefix.push(data[i].Prefix);
        Origin.push(data[i].Origin_AS);
        Path.push(data[i].AS_Path);
        Count.push(data[i].ASPath_Count);
        dataTable.row.add([Prefix[i], Origin[i], Path[i], Count[i]]).draw();
        // $('#dataTable').append('<tr><td>'+Prefix[i]+'</td><td>'+Origin[i]+'</td><td>'+Path[i]+'</td><td>'+Count[i]+'</td></tr>');
      }
      error: function(data) {
  			console.log(data);
  		}
    }
  });
});

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
