$.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${sessionStorage.getItem('userID')}`)
    .done(function (data) {
        $('#name-member').text(data[0].FullName);
        $('#role-member').text(data[0].PositionID);
        $('#avatar-main').attr('src', data[0].Avatar);
    })
    .fail(function (err) {

    });
$.get(`http://localhost:57133/api/Role?memberID=${sessionStorage.getItem('userID')}`)
    .done(function (data) {
        var menuTags = $('.menu-link');
        for (var i = 0; i < menuTags.length; i++) {
            $(menuTags[i]).attr('href', data[i]);
        }
    })
    .fail(function (err) {
        
    })