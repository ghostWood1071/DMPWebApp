var userID = sessionStorage.getItem('userID');

var uploadImg = function (memberID) {

    return new Promise(function (resolve, reject) {
        var form = new FormData();
        var fileInput = $('#img-input')[0].files[0];
        form.append((memberID + "/" + fileInput.name), fileInput);
        form.append("personal", userID);

        $.ajax({
            url: '/Profile/Edit',
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data  
            data: form,
            success: function (result) {
                resolve(result);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}

var loadInfo = function () {
    $.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${sessionStorage.getItem('userID')}`, function (data) {
        var profile = data[0];
        $('#name').val(profile.FullName);
        $('#birth').val(profile.Birthday);
        $('#gender').val(profile.Gender);
        if (profile.Gender === 'Nam')
            $('#gender').val(1);
        else
            $('#gender').val(0);
        $('#address').val(profile.Address);
        $('#iden-num').val(profile.IDCard);
        $('#publish-date').val(profile.IDCard_DateIssue);
        $('#publish-add').val(profile.IDCard_PlaceIssue);
        $('#phone').val(profile.Phone);
        $('#email').val(profile.Email);
        $('#avatar').attr('src', profile.Avatar);
        $('#img-name').text(profile.FullName);
        $('#pos').text(profile.PositionID);
        $('#userID').val(sessionStorage.getItem('userID'));
        console.log(profile);
    })
}

var disable = function () {
    $('.tabs').find('input').prop('disabled', true);
    $('select').prop('disabled', true);
};

var enable = function (edit) {
    var parent = $(edit).parent().next();
    console.log(parent);
    parent.find('input').prop('disabled', false);
    parent.find('select').prop('disabled', false);
}

var checkPass = function (uid, pass) {
    return new Promise(function (resolve, reject) {
        $.post('https://api.duocmyphamhaiduong.com/CheckPass', { uid: uid, pass: pass })
            .done(function (data) {
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });

}

disable();

$('.img-load').hide();

$('.btn-save').hide();

var state = false;

$('.edit-infor').click(function (e) {
    e.preventDefault();

    var $this = $(this);
    var btnSave = $this.parent().next().find('fieldset').find('.btn-save');
    var fileInput = $this.parent().next().find('.img-load');
    if (!state) {
        enable($this);
        fileInput.show();
        btnSave.show();
        state = true;
    }
    else {
        disable();
        fileInput.hide();
        btnSave.hide();
        state = false;
    }

});

function previewAvatar() {
    var avatar = $('#avatar');
    var file = $(".img-load")[0].files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function () {
        avatar.attr('src', reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

async function saveprofile() {
    var src = await uploadImg(userID);

    $.ajax({
        url: 'https://api.duocmyphamhaiduong.com/UpdateProfile',
        type: 'PUT',
        data: {
            ID: userID,
            FullName: $('#name').val(),
            Gender: $('#gender').val() == 0 ? false : true,
            Email: $('#email').val(),
            BirthDay: (new Date($('#birth').val()).toISOString()),
            Phone: $('#phone').val(),
            Address: $('#address').val(),
            IDCard: $('#iden-num').val(),
            IDPlace: $('#publish-add').val(),
            IDDate: (new Date($('#publish-date').val()).toISOString()),
            Avatar: src
        },
        success: function () {
            location.reload();
        },
        error: function () {

        }
    })
}

async function chagnePass() {
    var uid = sessionStorage.getItem('userID');
    var oldPass = $('#old-pass').val().trim();
    var newPass = $('#new-pass').val().trim();
    var repasss = $('#re-pass').val().trim();
    if (oldPass == "") {
        toastr.error("Mật khẩu cũ trống!");
        return;
    }

    if (repasss == "" || newPass == "") {
        toastr.error("Mật khẩu mới rỗng")
        return;
    }


    if (newPass != repasss) {
        toastr.error("Mật khẩu mới không khớp");
        return;
    }

    var check = await checkPass(uid, oldPass);
    if (!check) {
        toastr.error("Mật khẩu cũ không khớp");
        return;
    }

    $.ajax({
        url: 'https://api.duocmyphamhaiduong.com/ChangePass',
        type: 'PUT',
        data: {
            uid: uid,
            pass: newPass
        },
        success: function () {
            toastr.success("Đổi mật khẩu thành công");
            $('#old-pass').val("");
            $('#new-pass').val("");
            $('#re-pass').val("")

        },
        fail: function () {
            toastr.error("Đổi mật khẩu thất bại");
        }
    })

}

loadInfo();