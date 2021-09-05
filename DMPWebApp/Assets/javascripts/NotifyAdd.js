var postNotify = function (title, content, receiver, isSendAll) {
    var content = {
        NotifyID: 0,
        Sender: localStorage.getItem('userID'),
        Title: title,
        Content: content,
        Receiver: receiver,
        IsSendAll: isSendAll,
        CreateDate: (new Date()).toISOString()
    }
    $.post('https://api.duocmyphamhaiduong.com/api/Notify', content)
    .done(function () {
        location.href = "/Notify";
    }).fail(function () {
        toastr.error("Thêm thông thất bại");
    });

    $.post('https://api.duocmyphamhaiduong.com/OrderMail', content, function (data) {
        console.log(data);
    });
}
var textEdit = $('#summernote').summernote({
    placeholder: 'Enter content....',
    tabsize: 2,
    height: 300,
    minHeight: 100,
    maxHeight: 500,
    focus: true,
    lang: "vi-VN"
});

$('#txtMemberIDAdd').on('input', function () {
    var val = $(this).val();
    if (val.length == 8) {
        $.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${val}`)
            .done(function (data) {
                if (data.length > 0) {
                    console.log(data[0].FullName);
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

$('.btn-primary').click(function () {
    var title = $('#title').val().trim();
    var content = textEdit.code();
    var receiver = $('#txtMemberIDAdd').val().trim();
    var isSendAll = $('#checked-receiver').is(':checked');
    if (isSendAll)
        if (title == '' || content == '')
            toastr.error("thông tin trống");
        else
            postNotify(title, content, receiver, isSendAll);
    else
        if (title == '' || content == '' || receiver == '')
            toastr.error("thông tin trống");
        else
            postNotify(title, content, receiver, isSendAll);
})