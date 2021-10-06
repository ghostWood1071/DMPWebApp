
(function ($) {

	'use strict';

	var today = new Date();

	today.setDate(today.getMonth() - 1);

	var month = (today.getMonth())

	var previousMonth = month - 1
	
	$('.page-header h2').text('Cập nhật lương tháng ' + previousMonth + 'Năm' );
	var year = today.getFullYear();

	$.get('https://api.duocmyphamhaiduong.com/GetCurentYears').done(function (data) {
		var selector = $('#year');
		
		for (var i = 0; i < data.length; i++) {
			if (i == 0) {
				selector.append(`<option value = "${data[i]}" selected>${data[i]}</option>`);
				
			}
			else {
				selector.append(`<option value = "${data[i]}>${data[i]}</option>`);
				
			}

		}
	});

	for (var i = 0; i < $("#month option").length; i++) {
		var thismonth = (new Date()).getMonth();
		var prethismonth = thismonth - 1;
		if (prethismonth == $('#month option')[i].value) {
			$($('#month option')[i]).prop('selected', true);
			break;
		}
    }

	$.get(`https://api.duocmyphamhaiduong.com/CheckSalaryUpdated`).done(
		function (data) {
			var row1=data[0]
			if (row1.IsSalaryUpdated == 0) {
				$('#accept').show();
			}
		}
	)

	var firstable = $('#default-table').DataTable({
		ajax: {
			"url": `https://api.duocmyphamhaiduong.com/GetPrepareSalaryInMonthYear?month=${month}&year=${year}`,
			"dataSrc": ""
		},
		columns: [
			{ data: "MemberID" },
			{ data: "FullName" },
			{
				data: "SalaryByLower", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			},
			{
				data: "SalaryByImmediate", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			},
			{
				data: "SalaryByManager", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			},
			{
				data: "SumSalary", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			}
		],
		"order": [[1, 'asc']],
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

	var table = $('#static-table').DataTable({
		ajax: {
			"url": `https://api.duocmyphamhaiduong.com/GetSalary?month=${month}&year=${year}`,
			"dataSrc": ""
		},
		columns: [
			{ data: "MemberID" },
			{ data: "FullName" },
			{
				data: "SalaryByLower", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			},
			{
				data: "SalaryByImmediate", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			},
			{
				data: "SalaryByManager", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			},
			{
				data: "SumSalary", render: function (data, type, row) {
					if (data == null)
						return 0;
					return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}, className: 'right'
			}
		],
		"order": [[1, 'asc']],
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

	 

	var today = new Date();

	today.setDate(today.getMonth() - 1);

	var month = (today.getMonth())
	var year = (today.getFullYear());
	$('.page-header h2').text('Cập nhật lương tháng ' + month + ' - ' + year);
	$('#title-h2').text('Cập nhật lương tháng ' + month + ' - ' + year);

	$('#accept').click(function () {
		$('#form1').show()
	})

	$('#dialogConfirm1').click(function () {
		if ($('#salary')[0].checked == true) {
			//Cập nhật lương
			$.ajax({
				url: "https://api.duocmyphamhaiduong.com/InsertNewSalary?month=${month}&year=${year}",
				type: "POST",
				success: function (response) {
					toastr.success('Cập nhật bảng lương thành công')
					$('#accept').hide();
				},
				error: function (x, e) {
					toastr.error('Cập nhật bảng lương thất bại')
				}
			});

				const date = new Date();
				const additionOfMonths = 1;
				date.setMonth(date.getMonth() + additionOfMonths); // For subtract use minus (-)

				TMPMonth = date.getMonth()
				TMPYear = date.getYear()

			//cập nhật bảng điểm
			$.ajax({
				url: "https://api.duocmyphamhaiduong.com/InsertNewMemberPoints?month=${monthTMP}&year={yearTMP}",
				type: "POST",
				success: function (response) {
					toastr.success('Cập nhật bảng điểm thành công')
				},
				error: function (x, e) {
					toastr.error('Cập nhật bảng điểm thất bại')
				}
			});
		}
		else {
			toastr.error('Cập nhật bảng lương thất bại')
        }
		$('.workform').hide();
	});

	$('#dialogCancel1').click(function () {
		$('.workform').hide();
	});

	
	$("#export").click(function () {
		$("#default-table").table2excel({
			name: "Worksheet Name",
			filename: $('h2.panel-title').text(), //do not include extension
			fileext: ".xlsx", // file extension,
			
		});
	});

	$("#export2").click(function () {
		$("#default-table").table2excel({
			name: "Worksheet Name",
			filename: $('h2.panel-title').text(), //do not include extension
			fileext: ".xlsx", // file extension,

		});
	});

	$(document).on('change', '#month', function () {
		var month = $(this).children('option:selected').val();
		var year = $('#year option:selected').val();
		table.ajax.url(`https://api.duocmyphamhaiduong.com/GetSalary?month=${month}&year=${year}`).load().draw();
	});

	$(document).on('change', '#year', function () {
		var year = $(this).children('option:selected').val();
		var month = $('#month option:selected').val();
		table.ajax.url(`https://api.duocmyphamhaiduong.com/GetSalary?month=${month}&year=${year}`).load().draw();
	});

}).apply(this, [jQuery]);