var userID = sessionStorage.getItem("userID");
var link = `http://api.duocmyphamhaiduong.com/GetProducts?memberID=${userID}`;
var header = $('.table th');
$(header[0]).width("100px");
$(header[1]).width("230px");
$(header[2]).width("100px");
$(header[3]).width("100px");
$(header[4]).width("100px");
$(header[5]).width("180px");


var getRowData = function (row, isPut = false) {
    var cells = row.children('td');
    if (!isPut)
        return {
            ProductID: $(cells[0]).text(),
            MemberID: sessionStorage.getItem("userID"),
            ProductName: $(cells[1]).text(),
            OriginPrice: Number($(cells[2]).text()),
            BasePrice: Number($(cells[3]).text()),
            SalePoint: Number($(cells[4]).text()),
            Description: $(cells[5]).text(),
            Quantity: Number($(cells[6]).text())
        }
    return {
        MemberID: sessionStorage.getItem("userID"),
        ProductName: $(cells[1]).text(),
        OriginPrice: Number($(cells[2]).text()),
        BasePrice: Number($(cells[3]).text()),
        SalePoint: Number($(cells[4]).text()),
        Description: $(cells[5]).text(),
        Quantity: Number($(cells[6]).text())
    };

}

var optionCols = function (adding = false) {
    if (adding)
        return `<td class="actions unsign">
                            <a href="#" class="on-editing save-row"><i class="fa fa-save"></i></a>
                            <a href="#" class="on-editing cancel-row"><i class="fa fa-times"></i></a>
                            <a href="#" class="hidden on-default edit-row"><i class="fa fa-pencil"></i></a>
                            <a href="#" class="hidden on-default remove-row"><i class="fa fa-trash-o"></i></a>
                        </td>`;

    return `<td class="actions unsign">
                            <a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
                            <a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
                            <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
                            <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
                        </td>`;

}

var editRow = function (info) {
    console.log(info);
    $.ajax({
        url: `http://api.duocmyphamhaiduong.com/UpdateProduct`,
        data: info,
        type: 'PUT',
        success: function () {
            toastr.success("Sửa thông tin sản phẩm thành công");
        },
        error: function () {
            toastr.error("Sửa thông tin thất bại");
        }
    });
}

var deleteRow = function (id, callback) {

    var request = new XMLHttpRequest();
    request.open("DELETE", `http://api.duocmyphamhaiduong.com/DeleteProduct?productID=${id}`);
    request.send();
    request.onload = function () {
        if (request.status == 200) {
            toastr.success("Xóa sản phẩm thành công");
            callback();
        }
        else
            toastr.error("Xóa sản phẩm không thành công");
    }

}

var addRow = function (info, row) {
    $.post(`http://api.duocmyphamhaiduong.com/InsertProduct`, info)
        .done(function (data) {
            toastr.success("Thêm thông tin sản phẩm thành công");
            console.log(data);
            console.log(row);
            console.log($(row).children("td")[0]);
            $($(row).children("td")[0]).text(data);
        })
        .fail(function () {
            toastr.error("Thêm thông tin thất bại");
            setTimeout(function () {
                table.row($(row)).remove().draw();
            }, 500)
        });
}


//table
var table = $("#table").DataTable(
    {
        ajax:
        {
            url: `http://api.duocmyphamhaiduong.com/GetProducts?memberID=${userID}`,
            dataSrc: ''
        },
        columns: [
            { data: 'ProductID', className: "unsign" },
            { data: 'ProductName' },
            { data: 'OriginPrice', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
            { data: 'BasePrice', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
            { data: 'SalePoint', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right unsign' },
            { data: 'Description' },
            { data: 'Quantity', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
            { name: 'Action', defaultContent: optionCols(), className: 'unsign actions' }
        ],
        language: {
            "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
            "zeroRecords": "Không có bản ghi nào",
            "info": "Trang _PAGE_ trong _PAGES_ trang",
            "infoEmpty": "Không có bản ghi nào",
            "infoFiltered": "(lọc từ _MAX_ bản ghi)"
        }
    }
);


//table event
$("#table").on('click', ".edit-row", function (e) {
    e.preventDefault();
    if ($(this).parent().parent().hasClass('adding'))
        $(this).parent().parent().children('td:not(.actions)').attr("contenteditable", "true");
    else
        $(this).parent().parent().children('td:not(.unsign)').attr("contenteditable", "true");
    $(this).parent().children('.on-editing').removeClass("hidden");
    $(this).parent().children('.on-default').addClass("hidden");
});

$("#table").on('click', ".save-row", function (e) {
    e.preventDefault();
    var info = getRowData($(this).parent().parent(), isPut = $(this).parent().parent().hasClass('adding'));
    if ($(this).parent().parent().hasClass('adding')) {
        addRow(info, $(this).parent().parent());
        $(this).parent().parent().removeClass('adding');
    } else {
        editRow(info);
    }
    $(this).parent().parent().children('td').attr("contenteditable", "false");
    $(this).parent().children('.on-editing').addClass("hidden");
    $(this).parent().children('.on-default').removeClass("hidden");
});

$("#table").on('click', ".cancel-row", function (e) {
    e.preventDefault();
    if ($(this).parent().parent().hasClass('adding'))
        table.row($(this).parent().parent()).remove().draw();
    $(this).parent().parent().children('td').attr("contenteditable", "false");
    $(this).parent().children('.on-editing').addClass("hidden");
    $(this).parent().children('.on-default').removeClass("hidden");
});

$("#table").on('click', ".remove-row", function (e) {
    e.preventDefault();
    var _self = {
        $cancel: $('#dialogCancel'),
        $confirm: $("#dialogConfirm"),
        $wrapper: $("#dialog")
    };
    var $this = this;
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
                    if (!$($this).parent().parent().hasClass("adding")) {
                        var id = $($($this).parent().parent().children("td")[0]).text();
                        deleteRow(id, () => {
                            table.row($($this).parent().parent()).remove().draw();
                        });

                    } else {
                        table.row($($this).parent().parent()).remove().draw();
                    }
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

$("#addToTable").click(function () {
    var rowdata = table.row.add({
        ProductID: null,
        ProductName: null,
        OriginPrice: 0,
        BasePrice: 0,
        SalePoint: 0,
        Description: 0,
        Quantity: 0,
        Action: optionCols(true)
    });
    var $row = table.row(rowdata[0]).nodes().to$();
    $row.addClass("adding");
    table.order([0, 'asc']).draw();

});

//getExchangeRate();

