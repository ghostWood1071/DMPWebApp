var template = function (row) {
    return `<tr class="gradeA">
                        <td>${row.ProductID}</td>
                        <td>Kem trị mụn</td>
                        <td>${row.OriginPrice}</td>
                        <td>${row.BasePrice}</td>
                        <td>${row.SalePoint}</td>
                        <td>${row.Quantity}</td>
                        <td class="actions">
                            <a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>
                            <a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>
                            <a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>
                            <a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>
                        </td>
                    </tr>`;
}
var userID = "TV000001"; //sessionStorage.getItem("userID");
$.get(`http://localhost:57133/GetProducts?memberID=${userID}`)
    .done(function (data) {
        for (var row of data) {
            $('tbody').append(template(row));
        }
    })
    .fail(function (err) {
        console.log(err);
    });


