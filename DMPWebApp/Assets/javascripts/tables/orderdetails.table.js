$('#txtMemberIDAdd').on('input', function () {
    var val = $(this).val();
    if (val.length == 8) {
        var members = JSON.parse(sessionStorage.getItem("members"));
        var searchedName = members.filter(x => x.MemberID === val)
        if (searchedName.length <=0) {
            toastr.error("không tìm thấy thành viên nào");
            return;
        }
        $("#txtFullNameAdd").val(searchedName[0].FullName);
        toastr.success("find");
    }
});

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

var addOrder = function (order) {
    $.post('', order)
     .done(function (orderID) {

     })
     .fail(function () {

     });
}

var addOrderDetails = function (orderID, orderDetails) {
    var data = orderDetails.map(x => {
        return {
            OrderID: orderID,
            ProductID: x.ProductID,
            ProductName: x.ProductName,
            Quantity: x.Quantity,
            UnitPrice: x.UnitPrice
        }
    });
    $.post('', data)
        .done(function () {

        }).fail(function () {

        });
}

var addSalePoint = function (orderID, MemberID, Mark) {
    $.post('', {
        OrderID: orderID,
        MemberID: MemberID,
        Mark: Mark
    })
        .done(function () {

        })
        .fail(function () {

        });
}

var addTable = $('#table-add').DataTable(
    {
        ajax:
        {
            url: `http://api.duocmyphamhaiduong.com//GetProducts?memberID=${sessionStorage.getItem("userID")}`,
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
    if (isNaN($(this).text()))
        $(this).text("0");
})

$('.btnSaveDetail').click(function () {
    var orderDetails = getDetailsFromTable("#table-add");
    $.magnificPopup.close();
});

$('.btnCancelDetail').click(function () {
    $.magnificPopup.close();
});
