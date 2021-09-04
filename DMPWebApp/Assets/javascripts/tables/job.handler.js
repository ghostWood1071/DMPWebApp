
(function ($) {

	'use strict';

	var today = new Date();

	today.setDate(today.getMonth() - 1);

	var month = (today.getMonth())

	var previousMonth = month - 1
	
	$('.page-header h2').text('Cập nhật lương tháng ' + previousMonth);
	$('h2.panel-title').text('Cập nhật lương tháng ' + previousMonth);
	var year = today.getFullYear();

	var datatableInit = function () {

		$('#default-table').DataTable({
			ajax: {
				"url": `http://localhost:57133//GetSalary?month=${month}&year=${year}`,
				"dataSrc": ""
			},
			columns: [
				{ data: "MemberID" },
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

	var today = new Date();

	today.setDate(today.getMonth() - 1);

	var month = (today.getMonth())

	$('.page-header h2').text('Cập nhật lương tháng ' + month);
	$('h2.panel-title').text('Cập nhật lương tháng ' + month);


	$('#dialogConfirm').click(function () {
		$.ajax({
			url: "http://localhost:57133//InsertNewMemberPoints",
			type: "POST",
			success: function (response) {
				toastr.success('Cập nhật bảng điểm thành công')
			},
			error: function (x, e) {
				toastr.error('Cập nhật bảng điểm thất bại')
			}
		});
		$('.workform').hide();
	});

	$('#dialogCancel').click(function () {
		$('.workform').hide();
	});

	$(function () {
		datatableInit();
	});

	$("#export").click(function () {
		$("#default-table").table2excel({
			name: "Worksheet Name",
			filename: $('h2.panel-title').text(), //do not include extension
			fileext: ".xlsx", // file extension,
			
		});
	});
}).apply(this, [jQuery]);