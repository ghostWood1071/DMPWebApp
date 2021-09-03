
(function ($) {

	'use strict';
	var UserID = sessionStorage.getItem("userID");
	var datatableInit = function () {
		
		var year = $('#year')[0].value;

		$('#default-table').dataTable({
			ajax: {
				"url": `https://api.duocmyphamhaiduong.com/GetSalary?id=${UserID}&year=${year}`,
				"dataSrc":""
			},
			columns: [
				{ data: "Month" }, 
				{
					data: "SalaryByLower", render: function (data, type, row) {	
						if (data == null)
							return 0;
						return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}, className: 'right'},
				{
					data: "SalaryByImmediate", render: function (data, type, row) {
						if (data == null)
							return 0;
						return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}, className: 'right'},
				{
					data: "SalaryByManager", render: function (data, type, row) {
						if (data == null)
							return 0;
						return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}, className: 'right'},
				{
					data: "SumSalary", render: function (data, type, row) {
						if (data == null)
							return 0;
						return String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}, className: 'right'}
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
	$("#year").change(function () {
		var year = $('#year')[0].value;
		const table = $('#default-table').DataTable();
		table.ajax.url(`https://api.duocmyphamhaiduong.com/GetSalary?id=${UserID}&year=${year}`).load();
	});
	$(function () {
		datatableInit();
	});

}).apply(this, [jQuery]);