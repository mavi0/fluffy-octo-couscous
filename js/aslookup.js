var dataTable;
var as;
const peername = "10.0.2.2";
// const peername;

$(document).ready(function(){
  as = $.getUrlVar('as');
  as = decodeURIComponent(as);
  console.log(as);

  $("#updatesHeader").html(`<i class="fa fa-area-chart"></i> Updates over time for AS${as}`);
  $("#tableName").html(`<i class="fa fa-table"></i> AS Detail for AS${as}`);
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

			// console.log(Timestamp);

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
              },
              ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			});

			var wlink = document.getElementById('asChartWarn');
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
    },
    error: function(data) {
			console.log(data);
		}
  });

  $.ajax({
    url: "astime.php",
    type: "POST",
    data: {peername: peername, as:as},
    success: function(data) {
      // console.log("astime", data);
      var Prefix = [];
      var Path = [];
      var Count = [];
      var LastModified = [];
      dataTable = $('#dataTable').DataTable();
      for (var i in data) {
        Prefix.push(data[i].Prefix);
        Path.push(data[i].AS_Path);
        Count.push(data[i].ASPath_Count);
        LastModified.push(data[i].LastModified);
        // console.log(moment(LastModified[i]).format("MMMM Do YYYY, h:mm:ss"));
        dataTable.row.add([moment(LastModified[i]).format("MMMM Do YYYY, h:mm:ss"), Prefix[i], Path[i], Count[i]]).draw();
      }
      var wlink = document.getElementById('asTableWarn');
      wlink.style.display = 'none';
      // var dlink = document.getElementById('dataTable');
      // wlink.style.display = 'block';
    },
    error: function(data) {
      console.log("astime", data);
    }
  });

  $('#dataTable tbody').on('click', 'tr', function () {
        console.log("click");
        var data = dataTable.row( this ).data();
        var ip = data[1];
        window.location.href = `iplookup.html?ip=${ip}`;
        // alert( 'You clicked on ' + data[1] );
    } );
});

function openAS(timestamp, as) {
    var parsedTimestamp = moment(timestamp).format("MMMM Do YYYY, h:mm:ss");
    $("#tableName").html(`<i class="fa fa-table"></i> AS Detail for <b>AS${as}</b> at ${parsedTimestamp}`);

    var wlink = document.getElementById('asTableWarn');
    wlink.style.display = 'block';

    $.ajax({
		url: "timeAS.php",
		type: "POST",
		data: {peername: peername, timestamp: timestamp, as:as},
		success: function(data) {
      // console.log(data);
      var Prefix = [];
      var Path = [];
      var Count = [];
      dataTable.clear();
      for (var i in data) {
        // console.log(i);
        Prefix.push(data[i].Prefix);
        Path.push(data[i].AS_Path);
        Count.push(data[i].ASPath_Count);
        dataTable.row.add([parsedTimestamp, Prefix[i], Path[i], Count[i]]).draw();
      }
			wlink.style.display = 'none';
    },
    error: function(data) {
      console.log("openAS", data);
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
