$.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${localStorage.getItem('userID')}`, function (boss) {

    $.get(`https://api.duocmyphamhaiduong.com/GetOrg?memberID=${localStorage.getItem('userID')}`, function (employees) {
        console.log(boss);
        console.log(employees);
        employees.splice(0, 0, boss[0])
        var data = employees.map(x => {
            return {
                id: x.MemberID,
                pid: x.ReferralID,
                name: x.FullName,
                img: x.Avatar == null ? "https://image.flaticon.com/icons/svg/145/145867.svg" : x.Avatar
            }
        });
        data[0].pid = null;
        console.log(data);
        var orgTree = new OrgTree();
        orgTree.init(data);
        var bac2 = $($($(".genealogy-tree ul")[0]).find("ul")[0]).addClass("active");
        bac2.css("display", "block");

    });

});