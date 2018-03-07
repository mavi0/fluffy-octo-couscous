$(document).ready(function(){
  const peername = "10.0.2.2";
  var as = $.getUrlVar('as');
  as = decodeURIComponent(as);
  console.log(as);

  $("#updatesHeader").html(`<i class="fa fa-area-chart"></i> Updates over time for AS${as}`);
  //
  $.ajax({
		url: "asUpdatesTime.php",
		type: "POST",
		data: {peername: peername, as: as},
		success: function(data) {
      console.log(data);
      var Timestamp = [];
			var Updates = [];

			for(var i in data) {
				Timestamp.push(data[i].Timestamp);
				Updates.push(data[i].Updates);
			}

			console.log(Timestamp);

			const ctx = $("#updatesTimeCanvas");

			var lineGraph = new Chart(ctx, {
				type: 'line',
				data: {
					labels: Timestamp,
					datasets : [{
							label: peername,
							borderColor: 'rgba(232, 65, 24,1.0)',
							hoverBackgroundColor: 'rgba(232, 65, 24,1.0)',
							hoverBorderColor: 'rgba(232, 65, 24,1.0)',
              pointRadius: 3,
							data: Updates
						}]
				},
				options: {
					scales: {
						xAxes: [{
							position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
						}],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Updates'
              }
						}]
					}
				}
			});

			var wlink = document.getElementById('updatesTimeCanvasWarn');
			wlink.style.display = 'none';

      document.getElementById("updatesTimeCanvas").onclick = function(evt){
        var activePoints = lineGraph.getElementsAtEvent(evt);
        var firstPoint = activePoints[0];
        var label = lineGraph.data.labels[firstPoint._index];
        var value = lineGraph.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        if (firstPoint !== undefined){
          openAS(label, as);
        }
        };



      // var Prefix = [];
      // var Origin = [];
      // var Path = [];
      // var Count = [];
      // var dataTable = $('#dataTable').DataTable();
      // for (var i in data) {
      //   console.log(i);
      //   Prefix.push(data[i].Prefix);
      //   Origin.push(data[i].Origin_AS);
      //   Path.push(data[i].AS_Path);
      //   Count.push(data[i].ASPath_Count);
      //   dataTable.row.add([Prefix[i], Origin[i], Path[i], Count[i]]).draw();
      //   // $('#dataTable').append('<tr><td>'+Prefix[i]+'</td><td>'+Origin[i]+'</td><td>'+Path[i]+'</td><td>'+Count[i]+'</td></tr>');
      // }



    },
    error: function(data) {
			console.log(data);
		}
  });
});

function openAS(timestamp, as) {
    $('#tableName').html(`<i class="fa fa-table"></i> Updates on: ${timestamp.substring(0, 19)}`);
    $.ajax({
		url: "timeAS.php",
		type: "POST",
		data: {peername: '10.0.2.2', timestamp: timestamp, as:as},
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
      },
      error: function(data) {
  			console.log(data);
  		}
    }
  });
}

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
