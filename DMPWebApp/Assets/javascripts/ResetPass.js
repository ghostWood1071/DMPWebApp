$('.btn').click(function () {
    if ($('.pass').val() == "") {
        toastr.error("Email không được để trống");
        return;
    }
    $.ajax({
        url: `https://api.duocmyphamhaiduong.com/ChangePassWord?email=${$('.pass').val().trim()}`,
        type: 'PUT',
        success: function (data) {
            toastr.success(data);

            setTimeout(function () {
                location.href = "/Login";
            }, 500);
        },
        error: function (error) {
            toastr.error(error);
        }
    })
})