$(document).ready(function(){
	$.ajax({
		url: "mostUnstable.php",
		method: "GET",
		success: function(data) {
			console.log(data);
			var Prefix = [];
			var Origin_AS = [];

			for(var i in data) {
				Origin_AS.push(data[i].Prefix);
				Prefix.push(data[i].Prefix_Count);
			}

			var ctx = $("#mostUnstableCanvas");

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: Origin_AS,
					datasets : [
						{
							label: 'Count: Most Unstable',
							backgroundColor: 'rgba(127, 143, 166,1.0)',
							borderColor: 'rgba(127, 143, 166,1.0)',
							hoverBackgroundColor: 'rgba(113, 128, 147,1.0)',
							hoverBorderColor: 'rgba(113, 128, 147,1.0)',
							data: Prefix
						}
					]
				},
				options: {
					scales: {
						xAxes: [{
							scaleLabel: {
                display: true,
                labelString: 'Prefix'
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
			var link = document.getElementById('mostUnstableCanvasWarn');
			link.style.display = 'none'; //or

			document.getElementById("mostUnstableCanvas").onclick = function(evt){
				// alert();
        var activePoints = barGraph.getElementsAtEvent(evt);
        var firstPoint = activePoints[0];
        var label = barGraph.data.labels[firstPoint._index];
        var value = barGraph.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        if (firstPoint !== undefined){
          window.location.href = `iplookup.html?ip=${label}`;
        }
      };
		},
		error: function(data) {

			console.log(data);
		}
	});
});
