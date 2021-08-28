
(function ($) {

	'use strict';
	var UserID = sessionStorage.getItem("userID");
	var datatableInit = function () {
		
		var year = $('#year')[0].value;

		$('#default-table').dataTable({
			ajax: {
				"url": `http://localhost:57133/GetMemberPoint?id=${UserID}&year=${year}`,
				"dataSrc": ""
			},
			columns: [
				{ data: "Month" },
				{ data: "AccumulatedMark" },
				{ data: "ImmediateMark" },
				{ data: "MediateMark" },
				{ data: "UsedMark" },
				{ data: "TotalMark" }
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
		table.ajax.url(`http://localhost:57133/GetMemberPoint?id=${UserID}&year=${year}`).load();
	});

	$(function () {
		datatableInit();
	});

}).apply(this, [jQuery]);