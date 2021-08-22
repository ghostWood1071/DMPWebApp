$('#txtMemberIDAdd').on('input', function () {
    var val = $(this).val();
    if (val.length == 8) {
        $.get(`http://localhost:57133/GetMember?id=${val}`)
            .done(function (data) {
                if (data != null) {
                    $("#txtFullNameAdd").val(data[0].FullName);
                    return;
                }
                toastr.error("không tìm thấy thành viên nào")
            })
            .fail(function () {
                toastr.error("không tìm thấy thành viên nào");
            });
    }
});

var getMark = function (details) {
    var sum = 0;
    for (var i = 0; i < details.length; i++) {
        sum += details[i].Mark;
    }
    return sum;
}

var getDetailRowData = function (selector) {
    var cell = $(selector).children('td');
    return {
        ProductID: $(cell[0]).text(),
        ProductName: $(cell[1]).text(),
        Quantity: Number($(cell[6]).text()),
        UnitPrice: Number($(cell[3]).text().replaceAll(',', '')) * Number($(cell[6]).text()),
        Mark: Number($(cell[6]).text()) * Number($(cell[4]).text().replaceAll(',', '')),
        IsBought: $(cell[7]).children('input').is(':checked')
    }
}

var getDetailsFromTable = function (selector) {
    var table = $(selector);
    var results = [];
    var rows = table.children('tbody').children('tr');
    for (var i = 0; i < rows.length; i++) {
        var row = getDetailRowData(rows[i]);
        if (row.IsBought)
            results.push(row);
    }
    return results;
}

var getOrderFromTable = function () {
    return {
        MemberID: $('#txtMemberIDAdd').val(),
        OrderDate: (new Date($("#datepick").val())).toISOString(),
        Discount: 0
    }
}

var addOrder = function (order) {
    var detailslist = getDetailsFromTable("#table-add");
    if (detailslist.length == 0 || detailslist == null) {
        toastr.error("Không có sản phẩm nào được chọn");
        return;
    }
    $.post('http://localhost:57133/api/Order', order)
        .done(function (orderRel) {
            console.log(orderRel)
            addOrderDetails(orderRel, getDetailsFromTable("#table-add"));
        })
        .fail(function () {
            console.log("Thêm đơn hàng thất bại")
        });
}

var addOrderDetails = function (order ,orderDetails) {
    var sumMark = getMark(orderDetails);
    console.log(orderDetails);
    var data = orderDetails.map(x => {
        return {
            OrderID: order.OrderID,
            ProductID: x.ProductID,
            ProductName: x.ProductName,
            Quantity: x.Quantity,
            UnitPrice: x.UnitPrice
        }
    });
    console.log(data);
    if (data != null)
        $.post(`http://localhost:57133/InsertOrderDetails?memberID=${sessionStorage.getItem('userID')}`, { Details: data })
        .done(function () {
            addSalePoint(order, sumMark);
        }).fail(function () {
            toastr.error("Thêm đơn hàng thất bại, chi tiết đơn hàng không được lưu");
        });
}

var addSalePoint = function (order, Mark) {
    $.post('http://localhost:57133/api/SalePoint', {
        OrderID: order.OrderID,
        MemberID: order.MemberID,
        Mark: Mark
    })
        .done(function () {
            toastr.success("Thêm đơn hàng thành công");
            $.magnificPopup.close();
            datatable.fnAddData({
                plus: '<i data-toggle class="fa fa-plus-square-o text-primary h5 m-none" style="cursor: pointer;"></i>',
                OrderID: order.OrderID,
                MemberID: $('#txtMemberIDAdd').val(),
                FullName: $('#txtFullNameAdd').val(),
                OrderDate: order.OrderDate,
                Discount: order.Discount,
                action: optionCols()
            }, true)
        })
        .fail(function () {
            toastr.error("Thêm đơn hàng thất bại, điểm không được tính");
        });
}

var addTable = $('#table-add').DataTable(
    {
        ajax:
        {
            url: `http://localhost:57133/GetProducts?memberID=${sessionStorage.getItem("userID")}`,
            dataSrc: ''
        },
        columns: [
            { data: 'ProductID', className: "unsign" },
            { data: 'ProductName' },
            { data: 'OriginPrice', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
            { data: 'BasePrice', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
            { data: 'SalePoint', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right unsign' },
            { data: 'Quantity', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
            { defaultContent: "<div class = 'val-quantity' contenteditable = 'true'>0</div>", className: 'sold-quantity right' },
            { name: 'Action', defaultContent: '<input type="checkbox"/>', className: 'unsign actions center' }
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

$('#table-add').on('input', '.val-quantity', function () {
    if (isNaN($(this).text())) {
        $(this).text("0");
        return
    }
    var thisQuan = Number($(this).text());
    var thatQuan = Number($($(this).parent().parent().children('td')[5]).text().replaceAll(',', ''))
    if (thisQuan > thatQuan) {
        toastr.error("Không đủ số lượng")
        $(this).text("0");

    }
})

$('.btnSaveDetail').click(function () {
    if ($("#datepick").val() == "" || $("#txtMemberIDAdd").val() == "" || $("#txtFullNameAdd").val() == "")
        toastr.error("Thông tin đơn hàng không được trống");
    else
        addOrder(getOrderFromTable());
});

$('.btnCancelDetail').click(function () {
    $.magnificPopup.close();
});
