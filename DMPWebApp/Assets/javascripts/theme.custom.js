$.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${sessionStorage.getItem('userID')}`)
    .done(function (data) {
        $('#name-member').text(data[0].FullName);
        $('#role-member').text(data[0].PositionID);
        $('#avatar-main').attr('src', data[0].Avatar);
    })
    .fail(function (err) {

    });