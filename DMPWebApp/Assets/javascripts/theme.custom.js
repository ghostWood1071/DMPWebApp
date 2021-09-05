
function loadPro() {
    return new Promise(function (resolve, reject) {
        $.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${localStorage.getItem('userID')}`)
            .done(function (data) {
                $('#name-member').text(data[0].FullName);
                $('#role-member').text(data[0].PositionID);
                $('#avatar-main').attr('src', data[0].Avatar);
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            });
    });
}

function loadLink() {
    return new Promise(function (resolve, reject) {
        $.get(`https://api.duocmyphamhaiduong.com/api/Role?memberID=${localStorage.getItem('userID')}`)
            .done(function (data) {
                $('[data-link = "update"]').attr('href', data[data.length]);
                $('[data-link = "product"]').attr('href', data[0]);
                $('[data-link = "member"]').attr('href', data[1]);
                $('[data-link = "order"]').attr('href', data[2]);
                $('[data-link = "notify"]').attr('href', data[3]);
                $('[data-link = "role"]').attr('href', data[4]);
                $('[data-link = "config"]').attr('href', data[5]);
                $('[data-link = "history"]').attr('href', data[6]);
                $('[data-link = "salary"]').attr('href', data[7]);
                $('[data-link = "mark"]').attr('href', data[8]);
                $('[data-link = "lower"]').attr('href', data[9]);
                $('[data-link = "tree"]').attr('href', data[10]);
                $('[data-link = "statistic"]').attr('href', data[11]);
                console.log('done');
                resolve(data);
            })
            .fail(function (err) {
                reject(err);
            })
    });
}

async function main() {
    $('[data-link]').click(function (e) {
        localStorage.setItem('page', $(this).attr('href'));
    });

    await loadLink();
    await loadPro();

    var tab = localStorage.getItem('page');
    var a = $('a[href="' + tab + '"]');
    a.parents('.nav-parent').addClass('nav-expanded')
   
}

main();




