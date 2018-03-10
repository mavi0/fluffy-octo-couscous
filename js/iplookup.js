var dataTable;
var ip;
const peername = "10.0.2.2";
// const peername;

$(document).ready(function(){
  ip = $.getUrlVar('ip');
  ip = decodeURIComponent(ip);
  console.log(ip);

  $("#updatesHeader").html(`<i class="fa fa-area-chart"></i> Updates over time for Prefix ${ip}`);
  $("#tableName").html(`<i class="fa fa-table"></i> Prefix Detail for <b>${ip}</b>`);

  $.ajax({
		url: "ipWhois.php",
		type: "POST",
		data: {ip: ip},
		success: function(data) {
      console.log("whop", data);
      $("#whois").html(`<i class="fa fa-book"></i> AS Name  <b>${data}</b>`);
    },
    error: function(data) {
			console.log("whof", data);
		}
  });

  //
  $.ajax({
		url: "ipUpdatesTime.php",
		type: "POST",
		data: {peername: peername, ip: ip},
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
              lineTesnsion: 0.1,
              cubicInterpolationMode: 'monotone',
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
              type: 'time',
              distribution: 'series',
							position: 'bottom',
              scaleLabel: {
                display: true,
                labelString: 'Time'
              },
              time: {
                unit: 'day'
              },
              bounds : 'data'
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

			var wlink = document.getElementById('ipChartWarn');
			wlink.style.display = 'none';

      document.getElementById("updatesTimeCanvas").onclick = function(evt){
        var activePoints = lineGraph.getElementsAtEvent(evt);
        var firstPoint = activePoints[0];
        var label = lineGraph.data.labels[firstPoint._index];
        var value = lineGraph.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        if (firstPoint !== undefined){
          openIP(label, ip);
        }
      };
    },
    error: function(data) {
			console.log(data);
		}
  });

  $.ajax({
    url: "iptime.php",
    type: "POST",
    data: {peername: peername, ip:ip},
    success: function(data) {
      // console.log("astime", data);
      var As = [];
      var Path = [];
      var Count = [];
      var LastModified = [];
      dataTable = $('#dataTable').DataTable();
      for (var i in data) {
        As.push(data[i].Origin_AS);
        Path.push(data[i].AS_Path);
        Count.push(data[i].ASPath_Count);
        LastModified.push(data[i].LastModified);
        // console.log(moment(LastModified[i]).format("MMMM Do YYYY, h:mm:ss"));
        dataTable.row.add([moment(LastModified[i]).format("MMMM Do YYYY, h:mm:ss"), As[i], Path[i], Count[i]]).draw();
      }
      var wlink = document.getElementById('ipTableWarn');
      wlink.style.display = 'none';
      // var dlink = document.getElementById('dataTable');
      // wlink.style.display = 'block';
    },
    error: function(data) {
      console.log("iptime", data);
    }
  });

  $('#dataTable tbody').on('dblclick', 'tr', function () {
        console.log("click");
        var data = dataTable.row( this ).data();
        var as = data[1];
        window.location.href = `aslookup.html?as=${as}`;
        // alert( 'You clicked on ' + data[1] );
    } );
});

function openIP(timestamp, ip) {
    var parsedTimestamp = moment(timestamp).format("MMMM Do YYYY, h:mm:ss");
    $("#tableName").html(`<i class="fa fa-table"></i> Prefix Detail for <b>${ip}</b> at ${parsedTimestamp}`);

    var wlink = document.getElementById('ipTableWarn');
    wlink.style.display = 'block';

    $.ajax({
		url: "timeIP.php",
		type: "POST",
		data: {peername: peername, timestamp: timestamp, ip:ip},
		success: function(data) {
      console.log(data);
      var As = [];
      var Path = [];
      var Count = [];
      dataTable.clear();
      for (var i in data) {
        As.push(data[i].Origin_AS);
        // console.log(As[i]);
        Path.push(data[i].AS_Path);
        // console.log(Path[i]);
        Count.push(data[i].ASPath_Count);
        // console.log(Count[i]);
        dataTable.row.add([parsedTimestamp, As[i], Path[i], Count[i]]).draw();
      }
			wlink.style.display = 'none';
    },
    error: function(data) {
      console.log("openIP", data);
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
