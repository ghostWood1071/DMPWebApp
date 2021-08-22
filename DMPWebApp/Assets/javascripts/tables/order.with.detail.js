
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
    return `<a href="#" class="on-default removeOrder"><i class="fa fa-trash-o"></i></a>`;
}

var $table = $('#tableOrder');

var fnFormatDetails = function (table, tr, orderID) {
    //ajax chỗ này nhé
    $.get(`http://localhost:57133/GetOrderDetails?orderID=${orderID}`)
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
        url: `http://localhost:57133/api/Order?orderID=${orderID}`,
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
        url: 'http://localhost:57133/api/Order',
        dataSrc: ''

    },
    columns: [
        { name: 'plus', data: null, defaultContent: '<i data-toggle class="fa fa-plus-square-o text-primary h5 m-none" style="cursor: pointer;"></i>' },
        { data: "OrderID" },
        { data: "MemberID" },
        { data: "FullName" },
        { data: "OrderDate" },
        { data: "Discount" },
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
    $.get(`http://localhost:57133/GetMembers`)
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

$('#datepick').click(function () {
   $('.datepicker').css('z-index', '100000000000');
})
