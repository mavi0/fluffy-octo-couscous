$(document).ready(function(){
	$.ajax({
		url: "correctedMostUnstable.php",
		method: "GET",
		success: function(data) {
			console.log(data);
			var Prefix = [];
			var Origin_AS = [];

			for(var i in data) {
				Origin_AS.push(data[i].Prefix);
				Prefix.push(data[i].Prefix_Count);
			}

			var ctx = $("#correctedMostUnstableCanvas");

			var barGraph = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: Origin_AS,
					datasets : [
						{
							label: 'Count: Most Unstable',
							backgroundColor: 'rgba(39, 60, 117,1.0)',
							borderColor: 'rgba(39, 60, 117,1.0)',
							hoverBackgroundColor: 'rgba(25, 42, 86,1.0)',
							hoverBorderColor: 'rgba(25, 42, 86,1.0)',
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
			var link = document.getElementById('correctedMostUnstableCanvasWarn');
			link.style.display = 'none'; //or

			document.getElementById("correctedMostUnstableCanvas").onclick = function(evt){
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
