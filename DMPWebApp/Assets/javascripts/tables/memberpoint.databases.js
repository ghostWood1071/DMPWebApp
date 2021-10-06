
(function ($) {

	'use strict';
	var UserID = localStorage.getItem("userID");
	var datatableInit = function () {
		
		var year = $('#year')[0].value;

		$('#default-table').dataTable({
			ajax: {
				"url": `https://api.duocmyphamhaiduong.com/GetMemberPoint?id=${UserID}&year=${year}`,
				"dataSrc": ""
			},
			columns: [
				{ data: "Month", className: 'right'},
				{ data: "ImmediateMark", className: 'right' },
				{ data: "MediateMark", className: 'right' },
				{ data: "AccumulatedMark", className: 'right' },
				{ data: "UsedMark", className: 'right'},
				{ data: "UnUsedMark", className: 'right' },
				{ data: "PersonalPoint", className: 'right' },
				{ data: "TotalSales", className: 'right' },
				{ data: "NetPoint", className: 'right' }
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

	$("#year").change(function () {
		var year = $('#year')[0].value;
		const table = $('#default-table').DataTable();
		table.ajax.url(`https://api.duocmyphamhaiduong.com/GetMemberPoint?id=${UserID}&year=${year}`).load();
	});


	var GetPromotable = function (id) {
		$.get(`https://api.duocmyphamhaiduong.com///GetPromotable?id=${id}`).done(
			function (data) {
				if (data.NewPos == -1) {
					$($('#Nextpos')[0]).text(data.Reason);
					if (data.Reason == 'cần tái đạt chuẩn Trưởng Phòng') {
						$('#case-3 strong').html(`Bạn cần tái đạt chuẩn vị trí <b style=" font-size: 14px; text-shadow: 1px 2px 3px #ccc; text-transform: uppercase; margin: 0px; padding: 9px 0px; font-weight: bold; " id="Nextpos">Trưởng Phòng</b>. <br />`)
					}
					else if (data.Reason == 'cần tái đạt chuẩn Trưởng Nhóm') {
						$('#case-3 strong').html(`Bạn cần tái đạt chuẩn vị trí <b style=" font-size: 14px; text-shadow: 1px 2px 3px #ccc; text-transform: uppercase; margin: 0px; padding: 9px 0px; font-weight: bold; " id="Nextpos">Trưởng Nhóm</b>. <br />`)
                    }
					$('#case-3').show();
				}
				else if (data.NewPos == -2) {
					$('#case-1').show();
				}
				else {
					var newpos = data.NewPos;
					var pointneed = 0;
					if (newpos == 6)
						pointneed = 300
					else if (newpos == 5)
						pointneed = 500
					else if (newpos == 4)
						pointneed = 1000
					else if (newpos == 3)
						pointneed = 3000
					else if (newpos == 2)
						pointneed = 5000
					else
						pointneed = 0
					$('#form1 .row strong').text(pointneed + ' điểm doanh số')

					if (data.Reason == 'đã tái đạt chuẩn Trưởng Phòng') {
						$('#case-2 strong').html(`Bạn đã đủ điều kiện để đạt tái vị trí<b style=" font-size: 14px; text-shadow: 1px 2px 3px #ccc; text-transform: uppercase; margin: 0px; padding: 9px 0px; font-weight: bold; " id="Newpos">Trưởng Phòng</b>! <br />
						Bạn có đồng ý sử dụng điểm để thăng cấp không? <br />
						<button class="btn btn-primary" id="accept">Đồng ý</button> | <button class="btn btn-primary" id="deny">Chưa sử dụng</button>`)
							}
							else if (data.Reason == 'đã tái đạt chuẩn Trưởng Nhóm') {
								$('#case-2 strong').html(`Bạn đã đủ điều kiện để đạt tái vị trí<b style=" font-size: 14px; text-shadow: 1px 2px 3px #ccc; text-transform: uppercase; margin: 0px; padding: 9px 0px; font-weight: bold; " id="Newpos">Trưởng Nhóm</b>! <br />
						Bạn có đồng ý sử dụng điểm để thăng cấp không? <br />
						<button class="btn btn-primary" id="accept">Đồng ý</button> | <button class="btn btn-primary" id="deny">Chưa sử dụng</button>`)
							}
					else {
						$($('#Newpos')[0]).text(data.Reason)
						$('#case-2').show();
						$($('#pos')[0]).text(data.Reason)
                    }
                }
			}
		)
	}

	var UpdatePosPromote = function (id, callback) {
		$.ajax({
			url: "https://api.duocmyphamhaiduong.com//UpdatePosPromote",
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
		const table = $('#default-table').DataTable();
		table.ajax.reload(null, false);
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

	

	$(function () {
		datatableInit();
	});

}).apply(this, [jQuery]);