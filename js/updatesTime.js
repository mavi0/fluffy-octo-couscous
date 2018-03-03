$(document).ready(function(){
	$.ajax({
		url: "http://127.0.0.1/300/fluffy-octo-couscous/updatesTime.php",
		method: "GET",
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
					datasets : [
						{
							label: 'Updates',
							backgroundColor: 'rgba(194, 54, 22,1.0)',
							borderColor: 'rgba(194, 54, 22,1.0)',
							hoverBackgroundColor: 'rgba(232, 65, 24,1.0)',
							hoverBorderColor: 'rgba(232, 65, 24,1.0)',
              pointRadius: 0,
							data: Updates
						}
					]
				},
				options: {
					scales: {
						xAxes: [{
							position: 'bottom'
						}]
					}
				}
			});
			var link = document.getElementById('updatesTimeCanvasWarn');
			link.style.display = 'none'; //or
		},
		error: function(data) {

			console.log(data);
		}
	});
});
