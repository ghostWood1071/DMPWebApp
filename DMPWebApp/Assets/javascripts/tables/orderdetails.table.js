$('#txtMemberIDAdd').on('input', function () {
    var val = $(this).val();
    if (val.length == 8) {
        $.get(`http://api.duocmyphamhaiduong.com/GetMember?id=${val}`)
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
    var date = moment($("#datepick").val(), 'DD MM YYYY').format('MM/DD/YYYY')
    return {
        MemberID: $('#txtMemberIDAdd').val(),
        OrderDate: (new Date(date)).toISOString(),
        Discount: 0
    }
}

var getFixedOrder = function () {
    var date = moment($("#datepickPut").val(), 'DD MM YYYY').format('MM/DD/YYYY')
    return {
        OrderID: $('.order-id').text().trim(),
        MemberID: $('#txtIDPut').val(),
        OrderDate: (new Date(date)).toISOString(),
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
        $.post(`http://api.duocmyphamhaiduong.com/InsertOrderDetails?memberID=${sessionStorage.getItem('userID')}`, { Details: data })
        .done(function () {
            addSalePoint(order, sumMark);
        }).fail(function () {
            toastr.error("Thêm đơn hàng thất bại, chi tiết đơn hàng không được lưu");
        });
}

var addSalePoint = function (order, Mark) {
    $.post('http://api.duocmyphamhaiduong.com/api/SalePoint', {
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

var fixDetails = function (orderID, orderDetails) {
    var mark = getMark(orderDetails);
    $.ajax({
        url: 'http://localhost:57133/api/OrderDetail',
        type: 'PUT',
        data: {
            OrderID: orderID,
            Details: orderDetails,
            Mark: mark,
            MemberID: sessionStorage.getItem('userID')
        },
        success: function () {
            toastr.success("sửa thông tin đơn hàng thành công");
        },
        error: function () {
            toastr.error("Sửa thông tin đơn hàng thất bại");
        }
    });
}

var fixOrder = function (order, orderDetails) {
    $.ajax({
        url: 'http://localhost:57133/PutOrder',
        type: 'PUT',
        data: order,
        success: function () {
            console.log("sucess");
            fixDetails(order.OrderID, orderDetails);
        },
        error: function () {
            toastr.error("Sửa thông tin đơn hàng thất bại");
        }
    });
}

var addTable = $('#table-add').DataTable(
    {
        ajax:
        {
            url: `http://api.duocmyphamhaiduong.com/GetProducts?memberID=${sessionStorage.getItem("userID")}`,
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

$('.btnFixDetail').click(function () {
    var details = getDetailsFromTable('#table-put');
    var order = getFixedOrder();
    for (var i = 0; i < details.length; i++) {
        details[0].OrderID = order.OrderID;
    }
    fixOrder(order, details);
});


var putTable = $('#table-put').DataTable({
    ajax:
    {
        url: `http://localhost:57133/GetDetails?memberID=${sessionStorage.getItem("userID")}&&orderID='HD00000001'`,
        dataSrc: ''
    },
    columns: [
        { data: 'ProductID', className: "unsign" },
        { data: 'ProductName' },
        { data: 'OriginPrice', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
        { data: 'BasePrice', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
        { data: 'SalePoint', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right unsign' },
        { data: 'Quantity', render: $.fn.dataTable.render.number(',', '.', 0), className: 'right' },
        { data: 'BuyQuantity', className: 'val-quantity sold-quantity right', createdCell: function (td) { $(td).attr('contenteditable', 'true') }, className: 'update right' },
        { data: 'IsBought', render: function (data) { return `<input type="checkbox" ${data?'checked':''}/>`}, className: 'unsign actions center' }
    ],
    language: {
        "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
        "zeroRecords": "Không có bản ghi nào",
        "info": "Trang _PAGE_ trong _PAGES_ trang",
        "infoEmpty": "Không có bản ghi nào",
        "infoFiltered": "(lọc từ _MAX_ bản ghi)"
    }
});

$('#table-put').on('input', '.update', function () {
    if (isNaN($(this).text())) {
        $(this).text("0");
        return
    }
    var thisQuan = Number($(this).text());
    var thatQuan = Number($($(this).parent().children('td')[5]).text().replaceAll(',', ''))
    console.log(thatQuan);
    if (thisQuan > thatQuan) {
        toastr.error("Không đủ số lượng")
        $(this).text("0");

    }
   
})
