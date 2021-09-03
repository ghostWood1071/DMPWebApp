
(function ($) {

	'use strict';
	var UserID = sessionStorage.getItem("userID");
	var datatableInit = function () {
		
		var year = $('#year')[0].value;

		$('#default-table').dataTable({
			ajax: {
				"url": `https://api.duocmyphamhaiduong.com/GetMemberPoint?id=${UserID}&year=${year}`,
				"dataSrc": ""
			},
			columns: [
				{ data: "Month", className: 'right'},
				{ data: "AccumulatedMark", className: 'right'},
				{ data: "ImmediateMark", className: 'right' },
				{ data: "MediateMark", className: 'right'},
				{ data: "UsedMark", className: 'right'},
				{ data: "UnUsedMark", className: 'right'}
			],
			"order": [[1, 'asc']],
			"paging": false,
			"ordering": false,
			"info": false,
			"searching":false,
			"language": {
				"lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
				"zeroRecords": "Không có bản ghi nào",
				"info": "Trang _PAGE_ trong _PAGES_ trang",
				"infoEmpty": "Không có bản ghi nào",
				"infoFiltered": "(lọc từ _MAX_ bản ghi)"
			}
		});

	};

	var GetPromotable = function (id) {
		$.get(`http://api.duocmyphamhaiduong.com//GetPromotable?id=${id}`).done(
			function (data) {
				if (data.NewPos == -1) {
					$('#Nextpos').Textcontent=(data.Reason);
					$('#case-3').show();
				}
				else if (data.NewPos == -2) {
					$('#case-1').show();
				}
				else {
					$('#Newpos').Text(data.Reason);
					$('#case-2').show();
					
                }
				console.log(data);
			}
		)
	}

	$('#accept').click(function () {
		alert('ngu')
	})

	var UserID = sessionStorage.getItem("userID");
	GetPromotable(UserID)

	$("#year").change(function () {
		var year = $('#year')[0].value;
		const table = $('#default-table').DataTable();
		table.ajax.url(`http://api.duocmyphamhaiduong.com//GetMemberPoint?id=${UserID}&year=${year}`).load();
	});

	$(function () {
		datatableInit();
	});

}).apply(this, [jQuery]);