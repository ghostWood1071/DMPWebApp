
(function ($) {

	'use strict';
	var UserID = localStorage.getItem("userID");
	var datatableInit = function () {
		
		var year = $('#year')[0].value;

		$('#default-table').dataTable({
			ajax: {
				"url": `http://localhost:57133//GetMemberPoint?id=${UserID}&year=${year}`,
				"dataSrc": ""
			},
			columns: [
				{ data: "Month", className: 'right'},
				{ data: "ImmediateMark", className: 'right' },
				{ data: "MediateMark", className: 'right' },
				{ data: "AccumulatedMark", className: 'right' },
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
		$.get(`http://localhost:57133///GetPromotable?id=${id}`).done(
			function (data) {
				if (data.NewPos == -1) {
					$($('#Nextpos')[0]).text(data.Reason);
					$('#case-3').show();
				}
				else if (data.NewPos == -2) {
					$('#case-1').show();
				}
				else {
					$($('#Newpos')[0]).text(data.Reason)
					$('#case-2').show();
					$($('#pos')[0]).text(data.Reason)
                }
				console.log(data);
			}
		)
	}

	var UpdatePosPromote = function (id, callback) {
		$.ajax({
			url: "http://localhost:57133//UpdatePosPromote",
			type: "PUT",
			contentType: "application/json;charset=utf-8",
			data: JSON.stringify(id),
			dataType: "json",
			success: function (response) {
				callback()
			},

			error: function (x, e) {
				alert('Failed');
			}
		});
	}

	$('#accept').click(function () {
		$('#form1').show();
	})

	$('#dialogConfirm').click(function () {
		$('#case-2').hide();
		$('#form1').hide();
		UpdatePosPromote(UserID, () => {
			$('#form3').show();
		})
		
		
	})
	$('#dialogCancel3').click(function () {
		$('#form3').hide();
	})

	$('#dialogCancel').click(function () {
		$('#form1').hide();
	})

	$('#deny').click(function () {
		$('#form2').show();
	})

	$('#dialogConfirm2').click(function () {
		$('#form2').hide();
		$('#case-2').hide();
	})

	$('#dialogCancel2').click(function () {
		$('#form2').hide();
	})



	GetPromotable(UserID)

	$("#year").change(function () {
		var year = $('#year')[0].value;
		const table = $('#default-table').DataTable();
		table.ajax.url(`http://localhost:57133//GetMemberPoint?id=${UserID}&year=${year}`).load();
	});

	$(function () {
		datatableInit();
	});

}).apply(this, [jQuery]);