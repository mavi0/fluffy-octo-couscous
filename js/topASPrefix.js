$(document).ready(function(){
	$.ajax({
		url: "topASPrefix.php",
		method: "GET",
		success: function(data) {
			console.log(data);
			var Prefix = [];
			var Origin_AS = [];

			for(var i in data) {
				Origin_AS.push(data[i].Origin_AS);
				Prefix.push(data[i].prefixes);
			}

			var ctx = $("#topASPrefixCanvas");

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: Origin_AS,
					datasets : [
						{
							label: 'Count: Top ASes',
							backgroundColor: 'rgba(72, 126, 176,1.0)',
							borderColor: 'rgba(72, 126, 176,1.0)',
							hoverBackgroundColor: 'rgba(64, 115, 158,1.0)',
							hoverBorderColor: 'rgba(64, 115, 158,1.0)',
							data: Prefix
						}
					]
				},
				options: {
					scales: {
						xAxes: [{
							scaleLabel: {
                display: true,
                labelString: 'AS Number'
              },
						}],
						yAxes: [{
							ticks: {
								beginAtZero:true
							},
							scaleLabel: {
                display: true,
                labelString: 'Count'
              },
						}]
					}
				}
			});
			var link = document.getElementById('topASPrefixCanvasWarn');
			link.style.display = 'none'; //or

			document.getElementById("topASPrefixCanvas").onclick = function(evt){
				// alert();
        var activePoints = barGraph.getElementsAtEvent(evt);
        var firstPoint = activePoints[0];
        var label = barGraph.data.labels[firstPoint._index];
        var value = barGraph.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        if (firstPoint !== undefined){
          window.location.href = `aslookup.html?as=${label}`;
        }
      };
		},
		error: function(data) {

			console.log(data);
		}
	});
});
