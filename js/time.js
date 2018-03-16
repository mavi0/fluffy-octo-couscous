$(document).ready(function(){
  var timestamp = $.getUrlVar('timestamp');
  timestamp = decodeURIComponent(timestamp);
  var dataTable;
  $('#tableName').html(`<i class="fa fa-table"></i> Updates on: ${timestamp.substring(0, 19)}`);
  console.log(timestamp);
  //print results
  $.ajax({
		url: "time.php",
		type: "POST",
		data: {peername: '10.0.2.2', timestamp: timestamp},
		success: function(data) {
      // console.log(data);
      var Prefix = [];
      var Origin = [];
      var Path = [];
      var Count = [];
      dataTable = $('#dataTable').DataTable();
      for (var i in data) {
        // console.log(i);
        Prefix.push(data[i].Prefix);
        Origin.push(data[i].Origin_AS);
        Path.push(data[i].AS_Path);
        Count.push(data[i].ASPath_Count);
        dataTable.row.add([Prefix[i], Origin[i], Path[i], Count[i]]);
      }
      dataTable.draw();
    },
    error: function(data) {
			console.log(data);
    }
  });

  $('#dataTable tbody').on('dblclick', 'tr', function () {
        console.log("click");
        var data = dataTable.row( this ).data();
        var ip = data[0];
        window.location.href = `iplookup.html?ip=${ip}`;
        // alert( 'You clicked on ' + data[1] );
    } );
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
