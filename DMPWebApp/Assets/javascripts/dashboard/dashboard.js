
(function ($) {

	

	$(document).ready(function () {

		//Giáng cấp
		//nếu status not null
		//xuất lên màn hình bạn đã bị giáng cấpackage
		//nếu ko có thì thôi

		var UserID = localStorage.getItem("userID");
		var GetStatus = function (id) {
			$.get(`https://api.duocmyphamhaiduong.com/GetStatus?id=${id}`).done(
				function (data) {
					row = data[0]
					//Nếu bị giáng cấp
					if (row.Status != null) {
					    if (row.Status == 'các thành viên cấp dưới có TP sẽ bị chuyển') {
					        $('#alert').html('Bạn vẫn giữ được cấp bậc <strong>Trưởng Phòng</strong> <br/> Tuy nhiên, toàn bộ các nhánh tuyến dưới có TP sẽ chuyển lên TP tuyến trên liền kề của bạn.')
					    }
					    else if (row.Status == 'trưởng phòng đã bị giáng cấp xuống thành viên') {
					        $('#alert').html('Bạn đã bị giáng cấp xuống cấp bậc<strong>Thành Viên</strong> <br/> Đồng thời, nhánh tuyến dưới có TP của bạn sẽ được chuyển lên cho TP tuyến trên liền kề của bạn')
					    }
					    else {
					        $('#alert').html('Bạn đã bị giáng cấp xuống cấp bậc<strong>Thành Viên</strong> <br/> Đồng thời, mất tất cả các đặc quyền TRƯỞNG NHÓM của bạn')
					    }
					    $('#form1').show()
					}
				}
			)
		}

		var EditStatus = function (id) {
			$.ajax({
				url: "https://api.duocmyphamhaiduong.com/UpdateStatus",
				type: "PUT",
				contentType: "application/json;charset=utf-8",
				data: JSON.stringify(id),
				dataType: "json",
				success: function (response) {
				},
				error: function (x, e) {
					alert('Failed');
				}
			});
		}

		$('#dialogCancel').click(function () {
			$('#form1').hide()
			//Cập nhật lại status = null
			EditStatus(UserID)
		})
		GetStatus(UserID)

		var year = $('#year')[0].value;
		var key = ($('#month')[0]).value;
		$.get(`https://api.duocmyphamhaiduong.com/GetReportGenaral?id=${UserID}&year=${year}&key=${key}`).done(
			function (table) {
				$('#Accmulation')[0].textContent = table[0].Accmulation
				$('#Salary')[0].textContent = String(table[0].Salary).replace(/\B(?=(\d{3})+(?!\d))/g, ',')+ " VNĐ"
				$('#CountOrders')[0].textContent = table[0].CountOrders	
				$('#CountLowerMembers')[0].textContent = table[0].CountLowerMembers
			})


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
					color: 'rgba(0,0,0,0.1)',
					labelWidth: -1
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


		var datatableInit = function () {

			var year = $('#year')[0].value;

			$('#default-table').dataTable({
				ajax: {
					"url": `https://api.duocmyphamhaiduong.com/GetReportGenaral?id=${UserID}&year=${year}&key=${null}`,
					"dataSrc": ""
				},
				responsive: true,
				columns: [
					{ data: "Month", className: 'right'},
					{
						data: "CountLowerMembers", className: 'right'
					},
					{
						data: "CountOrders", className: 'right'
					},
					{
						data: "Accmulation", className: 'right'
					},
					{
						data: "Salary", render: function (data, type, row) {
							if (data == null)
								return 0;
							return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						}, className: 'right'
					}
				],
				"order": [[0, 'asc']],
				"paging": false,
				"ordering": false,
				"info": false,
				"searching": false,
				"language": {
					"lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
					"zeroRecords": "Không có bản ghi nào",
					"info": "Trang _PAGE_ trong _PAGES_ trang",
					"infoEmpty": "Không có bản ghi nào",
					"infoFiltered": "(lọc từ _MAX_ bản ghi)"
				}
			});

		};



		$("#year").change(function () {
			var year = $('#year')[0].value;
			var key = ($('#month')[0]).value;
			$.get(`https://api.duocmyphamhaiduong.com/GetReportGenaral?id=${UserID}&year=${year}&key=${key}`).done(
				function (table) {
					$('#Accmulation')[0].textContent = table[0].Accmulation
					$('#Salary')[0].textContent = String(table[0].Salary).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " VNĐ"
					$('#CountOrders')[0].textContent = table[0].CountOrders
					$('#CountLowerMembers')[0].textContent = table[0].CountLowerMembers
				})


		})


		$("#month").change(function () {
			var year = $('#year')[0].value;
			var key = ($('#month')[0]).value;
			$.get(`https://api.duocmyphamhaiduong.com/GetReportGenaral?id=${UserID}&year=${year}&key=${key}`).done(
				function (table) {
					$('#Accmulation')[0].textContent = table[0].Accmulation
					$('#Salary')[0].textContent = String(table[0].Salary).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " VNĐ"
					$('#CountOrders')[0].textContent = table[0].CountOrders
					$('#CountLowerMembers')[0].textContent = table[0].CountLowerMembers
				})


		})


		/*
		Sales Selector
		*/
		$('#salesSelector').themePluginMultiSelect().on('change', function () {
			var year_chart = ($('#salesSelector')[0]).value;

			$.get(`https://api.duocmyphamhaiduong.com/GetReportGenaral?id=${UserID}&year=${year_chart}&key=${null}`).done(
				function (table) {
					var Accmulation = [];
					var Salary = [];
					var CountOrders = [];
					var CountLowerMembers = [];
					for (var row of table) {
						Accmulation.push(["Th " + row.Month, row.Accmulation])
						Salary.push(["Th " + row.Month, row.Salary])
						CountOrders.push(["Th " + row.Month, row.CountOrders])
						CountLowerMembers.push(["Th " + row.Month, row.CountLowerMembers])
					}
					var flotDashSales1Data = [{
						data: Accmulation,
						color: "#3f923f"
					}];

					var flotDashSales2Data = [{
						data: Salary,
						color: "#e36159"
					}];

					var flotDashSales3Data = [{
						data: CountOrders,
						color: "#2baab1"
					}];

					var flotDashSales4Data = [{
						data: CountLowerMembers,
						color: "#734ba9"
					}];

					Plot('#flotDashSales1', flotDashSales1Data, 0);
					Plot('#flotDashSales2', flotDashSales2Data, 0);
					Plot('#flotDashSales3', flotDashSales3Data, 0);
					Plot('#flotDashSales4', flotDashSales4Data, 0);
				}
			)
		});


		$('#salesSelector').trigger('change');


		$('#salesSelectorWrapper').addClass('ready');

		$(function () {
			datatableInit();
		});

	})
	
}).apply(this, [jQuery]);