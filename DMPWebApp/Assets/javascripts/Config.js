var getDiscount = function () {
    return new Promise(function (resolve, reject) {
        $.get('https://api.duocmyphamhaiduong.com/GetDiscounts')
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
}

var getConfigs = function () {
    return new Promise(function (resolve, reject) {
        $.get('https://api.duocmyphamhaiduong.com/GetConfigs')
            .done(function (data) {
                var result = {}
                for (var i = 0; i < data.length; i++) {
                    result[data[i].ParameterID.trim()] = data[i].Value;
                }
                resolve(result);
            })
            .fail(function (error) {
                reject(error);
            });
    });
}

var setConfigValue = function (data) {
    $('#tv').val(data.STANDARD_MEMBER);
    $('#tv300').val(data.STANDARD_BEGIN_MEMBER);
    $('#tvtc').val(data.STANDARD_TC_MEMBER);
    $('#tvdc').val(data.STANDARD_DC_MEMBER);
    $('#tn').val(data.STANDARD_LEADER);
    $('#tpdb').val(data.STANDARD_RESERVE_MANAGER);
    $('#tp').val(data.STANDARD_MANAGER);
    $('#ex').val(data.EXCHANGE_RATE);
}

var setDiscount = function (data) {
    var template = $('.discount').find('input');
    data = data.reverse()
    for (var i = template.length - 1; i >= 0; i--) {
        $(template[i]).val(data[i].Discount);
    }
}
async function main() {

    var configData = await getConfigs();

    setConfigValue(configData);

    var discountData = await getDiscount();
    console.log(discountData);
    setDiscount(discountData);

    $('.label-config-change').click(function () {
        var btnUpdate = $(this);
        var input = btnUpdate.prev().children('input');
        var control = btnUpdate.next().next();
        input.prop("disabled", false);
        console.log(control);
        control.removeClass("config-control-hidden");
    });

    $('.control-config a:nth-child(2)').click(function () {
        var btnCancel = $(this);
        var control = btnCancel.parent();
        var input = control.prev().prev().prev().children('input');
        control.addClass("config-control-hidden");
        input.prop('disabled', true);
    });

    $('a[data-config]').click(function (e) {
        e.preventDefault();
        var id = $(this).data('config');
        var input = $(this).parent().parent().find('input');
        var val = input.val();
        $.ajax({
            type: 'PUT',
            url: 'https://api.duocmyphamhaiduong.com/SetConfig',
            data: {
                ID: id,
                Value: val
            },
            success: function () {
                toastr.success("Cập nhật thành công");
                input.parent().next().next().next().addClass('config-control-hidden');
                input.prop('disabled', true);
            },
            error: function () {
                toastr.error("Cập nhật thất bại");
            }
        })
    })

    $('a[data-discount]').click(function (e) {
        e.preventDefault();
        var id = Number($(this).data('discount'));
        var input = $(this).parent().parent().find('input');
        var val = input.val();
        $.ajax({
            type: 'PUT',
            url: 'https://api.duocmyphamhaiduong.com/SetDiscount',
            data: {
                ID: id,
                Discount: val
            },
            success: function () {
                toastr.success("Cập nhật thành công");
                input.parent().next().next().next().addClass('config-control-hidden');
                input.prop('disabled', true);
            },
            error: function () {
                toastr.error("Cập nhật thất bại");
            }
        })
    });
}
main();