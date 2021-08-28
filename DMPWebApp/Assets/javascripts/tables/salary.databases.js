
(function ($) {

	'use strict';

	var datatableInit = function () {
		var UserID = 'TV000001';
		var year = 2020//$('#year')[0].value;

		$('#default-table').dataTable({
			ajax: {
				"url": `http://api.duocmyphamhaiduong.com/GetSalary?id=${UserID}&year=${year}`,
				"dataSrc":""
			},
			columns: [
				{ data: "Month" }, 
				{ data: "AccumulatedMark"},
				{ data: "ImmediateMark"},
				{ data: "MediateMark"},
				{ data: "UsedMark"},
				{ data: "TotalMark"},
				{ data: "Salary"}
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

	$(function () {
		datatableInit();
	});

}).apply(this, [jQuery]);