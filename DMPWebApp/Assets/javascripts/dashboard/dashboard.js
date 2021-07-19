
(function ($) {

	var Plot = function (id, data, min) {
		$.plot(id, data, {
			series: {
				lines: {
					show: true,
					lineWidth: 2
				},
				points: {
					show: true
				},
				shadowSize: 0
			},
			grid: {
				hoverable: true,
				clickable: true,
				borderColor: 'rgba(0,0,0,0.1)',
				borderWidth: 1,
				labelMargin: 15,
				backgroundColor: 'transparent'
			},
			yaxis: {
				min: min,
				color: 'rgba(0,0,0,0.1)'
			},
			xaxis: {
				mode: 'categories',
				color: 'rgba(0,0,0,0)'
			},
			legend: {
				show: false
			},
			tooltip: true,
			tooltipOpts: {
				content: '%x: %y',
				shifts: {
					x: -30,
					y: 25
				},
				defaultTheme: false
			}
		});
	}

	/*
	Sales Selector
	*/
	$('#salesSelector').themePluginMultiSelect().on('change', function () {
		Plot('#flotDashSales1', flotDashSales1Data, 0);
		Plot('#flotDashSales2', flotDashSales2Data, 0);
		Plot('#flotDashSales3', flotDashSales3Data, 0);
		Plot('#flotDashSales4', flotDashSales4Data, 0);
	});


	$('#salesSelector').trigger('change');


	$('#salesSelectorWrapper').addClass('ready');


}).apply(this, [jQuery]);