$(document).ready(function(){
	const peername = "10.0.2.2";

	$.ajax({
		url: "updatesTime.php",
		type: "POST",
		data: {peername: peername},
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
					wlink.style.display = 'block';
					updateHours(label);
				}
				};
		},
		error: function(data) {
			console.log(data);
		}
	});
	document.getElementById("updatesTimeButton").onclick = function() {
		backButton()
	};
});

function updateHours(label) {
	// alert(label);
	$.ajax({
		url: "updatesTimeHour.php",
		type: "POST",
		data: {timestamp: label},
		success: function(data) {
			console.log(data);
			// alert(data);

			showHourCanvas();
			showBackButton();

			var Timestamp = [];
			var Updates = [];

			for(var i in data) {
				Timestamp.push(data[i].Timestamp);
				Updates.push(data[i].Updates);
			}

      console.log(Timestamp);

			const ctx = $("#updatesTimeCanvasHour");

			var lineGraph = new Chart(ctx, {
				type: 'line',
				data: {
					labels: Timestamp,
					datasets : [
						{
							label: 'Updates',
							borderColor: 'rgba(232, 65, 24,1.0)',
							hoverBackgroundColor: 'rgba(232, 65, 24,1.0)',
							hoverBorderColor: 'rgba(232, 65, 24,1.0)',
              pointRadius: 3,
							data: Updates
						}
					]
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

			document.getElementById("updatesTimeCanvasHour").onclick = function(evt){
				var activePoints = lineGraph.getElementsAtEvent(evt);
				var firstPoint = activePoints[0];
				var label = lineGraph.data.labels[firstPoint._index];
				var value = lineGraph.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
				if (firstPoint !== undefined)
					updateMinutes(label);
				};

			var wlink = document.getElementById('updatesTimeCanvasWarn');
			wlink.style.display = 'none';
		},
		error: function(data) {

			console.log(data);
		}
	});
}

function updateMinutes(label) {
	// alert(label);
	$.ajax({
		url: "updatesTimeMinute.php",
		type: "POST",
		data: {timestamp: label},
		success: function(data) {
			console.log(data);
			// alert(data);

			showMinuteCanvas();
			showBackButton();

			var Timestamp = [];
			var Updates = [];

			for(var i in data) {
				Timestamp.push(data[i].Timestamp);
				Updates.push(data[i].Updates);
			}

      console.log(Timestamp);

			const ctx = $("#updatesTimeCanvasMinute");

			var lineGraph = new Chart(ctx, {
				type: 'line',
				data: {
					labels: Timestamp,
					datasets : [
						{
							label: 'Updates',
							borderColor: 'rgba(232, 65, 24,1.0)',
							hoverBackgroundColor: 'rgba(232, 65, 24,1.0)',
							hoverBorderColor: 'rgba(232, 65, 24,1.0)',
              pointRadius: 3,
							data: Updates
						}
					]
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

			document.getElementById("updatesTimeCanvasMinute").onclick = function(evt){
				var activePoints = lineGraph.getElementsAtEvent(evt);
				var firstPoint = activePoints[0];
				var label = lineGraph.data.labels[firstPoint._index];
				var value = lineGraph.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
				if (firstPoint !== undefined){
					window.location.href = `time.html?timestamp=${label}`;
				}
			};

			var wlink = document.getElementById('updatesTimeCanvasWarn');
			wlink.style.display = 'none';
		},
		error: function(data) {
			console.log(data);
		}
	});
}

function showHourCanvas() {
	$("#updatesTimeHourWrapper").html("<canvas id='updatesTimeCanvasHour'></canvas>");
	var canvasLink = document.getElementById('updatesTimeWrapper');
	canvasLink.style.display = "none";
	var canvasHourLink = document.getElementById('updatesTimeHourWrapper');
	canvasHourLink.style.display = "block";
}

function showMinuteCanvas() {
	$("#updatesTimeMinuteWrapper").html("<canvas id='updatesTimeCanvasMinute'></canvas>");
	var canvasLink = document.getElementById('updatesTimeHourWrapper');
	canvasLink.style.display = "none";
	var canvasMinLink = document.getElementById('updatesTimeMinuteWrapper');
	canvasMinLink.style.display = "block";
}

function showCanvas() {
	var canvasHourLink = document.getElementById('updatesTimeHourWrapper');
	canvasHourLink.style.display = "none";
	var canvasHourLink = document.getElementById('updatesTimeMinuteWrapper');
	canvasHourLink.style.display = "none";
	var canvasLink = document.getElementById('updatesTimeWrapper');
	canvasLink.style.display = "block";
}


function showBackButton() {
	var bbutton = document.getElementById('updatesTimeButton');
	bbutton.style.display = 'block';
}

function hideBackButton() {
	var bbutton = document.getElementById('updatesTimeButton');
	bbutton.style.display = 'none';
}

function backButton() {
	hideBackButton();
	showCanvas();
}
