
(function ($) {

	'use strict';
	var UserID = sessionStorage.getItem("userID");
	var datatableInit = function () {
		
		var year = $('#year')[0].value;

		$('#default-table').dataTable({
			ajax: {
				"url": `http://api.duocmyphamhaiduong.com/GetSalary?id=${UserID}&year=${year}`,
				"dataSrc":""
			},
			columns: [
				{ data: "Month" }, 
				{
					data: "SalaryByLower", render: function (data, type, row) {
						return data.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
					}},
				{
					data: "SalaryByImmediate", render: function (data, type, row) {
						return data.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
					}},
				{
					data: "SalaryByManager", render: function (data, type, row) {
						return data.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
					}},
				{
					data: "SumSalary", render: function (data, type, row) {
						return data.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
					}}
			],
			"order": [[1, 'asc']],
			"paging": false,
			"ordering": false,
			"info": false,
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
		const table = $('#default-table').DataTable();
		table.ajax.url(`http://localhost:57133/GetSalary?id=${UserID}&year=${year}`).load();
	});
	$(function () {
		datatableInit();
	});

}).apply(this, [jQuery]);