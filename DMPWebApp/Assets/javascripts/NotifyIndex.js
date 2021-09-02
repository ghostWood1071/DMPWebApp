var rowTemplate = function (id, title, receiver, createDate) {
    return `<tr class="gradeA">
                            <td class="center">${id}</td>
                            <td>${title}</td>
                            <td>${receiver == null ? 'ALL' : receiver}</td>
                            <td>${createDate}</td>
                            <td class="actions center">
                                <a href="#" class="on-default edit-row"><i class="fa fa-eye"></i></a>
                                <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
                                <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
                            </td>
                        </tr>`;
}

$.get('http://api.duocmyphamhaiduong.com/api/Notify')
    .done(function (data) {
        for (var i = 0; i < data.length; i++) {
            $('tbody').append(rowTemplate(data[i].NotifyID, data[i].Title, data[i].Receiver, moment(data[i].CreateDate).format('DD/MM/YYYY')))
        }
    })
    .fail(function () {

    });

$(document).on('click', '.remove-row', function (e) {
    e.preventDefault();
    var row = $(this);
    var param = $(this).parent().parent().children(".center").text();
    var _self = {
        $cancel: $('#dialogCancel'),
        $confirm: $("#dialogConfirm"),
        $wrapper: $("#dialog")
    };
    $.magnificPopup.open({
        items: {
            src: '#dialog',
            type: 'inline'
        },
        preloader: false,
        modal: true,
        callbacks: {
            change: function () {
                _self.$confirm.on('click', function (e) {
                    e.preventDefault();
                    $.ajax({
                        url: `https://api.duocmyphamhaiduong.com/api/Notify/${param}`,
                        type: 'DELETE',
                        success: function () {
                            row.parent().parent().remove();
                            toastr.success("Xóa thông báo thành công");
                        },
                        fail: function () {
                            toastr.error("Xóa thông báo thất bại")
                        }
                    })
                    $.magnificPopup.close();
                });


                _self.$cancel.on('click', function (e) {
                    e.preventDefault();
                    $.magnificPopup.close();
                });
            },
            close: function () {
                _self.$cancel.on('click', function (e) {
                    e.preventDefault();
                    $.magnificPopup.close();
                });
            }
        }
    });
});

$('#addToTable').click(function () {
    location.href = "/Notify/Create";
});

$(document).on('click', '.edit-row', function (e) {
    e.preventDefault();
    var param = $(this).parent().parent().children(".center").text();
    location.href = `/Notify/Details/${param}`;
});