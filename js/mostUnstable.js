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
							label: 'Count: ',
							backgroundColor: 'rgba(194, 54, 22,1.0)',
							borderColor: 'rgba(194, 54, 22,1.0)',
							hoverBackgroundColor: 'rgba(232, 65, 24,1.0)',
							hoverBorderColor: 'rgba(232, 65, 24,1.0)',
							data: Prefix
						}
					]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			});
			var link = document.getElementById('mostUnstableCanvasWarn');
			link.style.display = 'none'; //or
		},
		error: function(data) {

			console.log(data);
		}
	});
});
