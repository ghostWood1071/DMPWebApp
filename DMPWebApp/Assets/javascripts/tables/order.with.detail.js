$('#datepick, #datepickPut').datepicker({
    language: 'vi'
});
var ShowAddDetailDialog = function () {
        var _self = {
            $cancel: $('.btnCancelDetail'),
            $confirm: $(".btnSaveDetail"),
            $wrapper: $("#dialogAddDetail")
        };

        $.magnificPopup.open({
            items: {
                src: '#dialogAddDetail',
                type: 'inline'
            },
            preloader: false,
            modal: true
            
        });
        return false;
}

var ShowUpdateDialog = function () {
    var _self = {
        $cancel: $('.btnCancelDetail'),
        $confirm: $(".btnSaveDetail"),
        $wrapper: $("#dialogPutDetail")
    };

    $.magnificPopup.open({
        items: {
            src: '#dialogPutDetail',
            type: 'inline'
        },
        preloader: false,
        modal: true

    });
    return false;
}

var getDetail = function (details) {
        var detailContents = [];
        for (var i = 0; i < details.length; i++) {
            detailContents.push(`
                <tr>
                    <td>${details[i].ProductID}</td>
                    <td>${details[i].ProductName}</td>
                    <td>${details[i].Quantity}</td>
                    <td>${details[i].UnitPrice}</td>
                </tr>
            `);
        }
        return detailContents;
    }

var optionCols = function () {
    return `<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
            <a href="#" class="on-default removeOrder"><i class="fa fa-trash-o"></i></a>`;
}

var $table = $('#tableOrder');

var fnFormatDetails = function (table, tr, orderID) {
    //ajax chỗ này nhé
    $.get(`https://api.duocmyphamhaiduong.com/GetOrderDetails?orderID=${orderID}`)
        .done(function (details) {
            var data = getDetail(details);
            var subtable = `<table class="table mb-none">
                        <thead>
                            <tr>
                                <th>Mã SP</th>
                                <th>Tên SP</th>
                                <th>Số lượng</th>
                                <th>Đơn giá (VNĐ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.join(' ')}
                        </tbody>
                    </table>`

            table.fnOpen(tr, subtable, 'details')
        })
        .fail(function () {

        });
};

var deleteOrder = function (orderID, callback) {
    $.ajax({
        url: `https://api.duocmyphamhaiduong.com/api/Order?orderID=${orderID}`,
        type: 'DELETE',
        success: function () {
            
            callback();
        },
        error: function () {
            toastr.error("Xóa đơn hàng thất bại");
        }
    })
}

var datatable = $table.dataTable({

    ajax: {
        url: 'https://api.duocmyphamhaiduong.com/api/Order',
        dataSrc: ''

    },
    columns: [
        { name: 'plus', data: null, defaultContent: '<i data-toggle class="fa fa-plus-square-o text-primary h5 m-none" style="cursor: pointer;"></i>' },
        { data: "OrderID" },
        { data: "MemberID" },
        { data: "FullName" },
        { data: "OrderDate", class: 'center', render: function(data) { return moment(data).format('DD/MM/YYYY') } },
        { data: "Discount", className: 'right', render: function (data) { return data*100 } },
        { name: 'action', data: null, defaultContent: optionCols(), className: 'actions center' }

    ],
    aoColumnDefs: [{
        bSortable: false,
        aTargets: [0]

    }],
    aaSorting: [
        [1, 'asc']

    ],
    language: {
        "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
        "zeroRecords": "Không có bản ghi nào",
        "info": "Trang _PAGE_ trong _PAGES_ trang",
        "infoEmpty": "Không có bản ghi nào",
        "infoFiltered": "(lọc từ _MAX_ bản ghi)"
    }

});

$table.on('click', 'i[data-toggle]', function () {
    var $this = $(this), tr = $(this).closest('tr').get(0);
    var orderID = $($(tr).children('td')[1]).text();
    if (datatable.fnIsOpen(tr)) {
        $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        datatable.fnClose(tr);
    } else {
        $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
        fnFormatDetails(datatable, tr, orderID);
    }
});

var getMembers = function () {
    $.get(`https://api.duocmyphamhaiduong.com/GetMembers`)
        .done(function (data) {
            var subData = data.map(x =>
            {
                return {
                    MemberID: x.MemberID,
                    FullName: x.FullName
                }
            });
            sessionStorage.setItem("members", JSON.stringify(subData));
        })
        .fail(function () {

        });
}

$('#tableOrder').on('click', '.removeOrder', function (e) {
    e.preventDefault();
        var _self = {
            $cancel: $('#dialogCancel'),
            $confirm: $("#dialogConfirm"),
            $wrapper: $("#dialog")
    };
    var thisRow = $(this).parent().parent();
    var row = $(this).parent().parent().children('td')[1];
    var data = $(row).text();

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
                    deleteOrder(data, () => {
                        datatable.fnDeleteRow(thisRow, null, true);
                        toastr.success("Xóa đơn hàng thành công");
                    });
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
        return false;
});

$('#addToOrder').click(function () {
    addTable.ajax.reload();
    ShowAddDetailDialog();
    return false;
});

$('#datepick, #datepickPut').click(function () {
   $('.datepicker').css('z-index', '100000000000');
})

$('#tableOrder').on('click', '.edit-row', function (e) {
    e.preventDefault();
    var orderID = $($(this).parent().parent().children('td')[1]).text();
    var memberID = $($(this).parent().parent().children('td')[2]).text();
    var fullName = $($(this).parent().parent().children('td')[3]).text();
    var orderDate = $($(this).parent().parent().children('td')[4]).text();
    $('#txtIDPut').val(memberID);
    $('#txtNamePut').val(fullName);
    $('#datepickPut').val(orderDate);
    $('.order-id').text(orderID);
    console.log(orderID);
    ShowUpdateDialog();
    putTable.ajax.url(`https://api.duocmyphamhaiduong.com/GetDetails?memberID=${sessionStorage.getItem("userID")}&&orderID=${orderID}`).load().draw();
});

