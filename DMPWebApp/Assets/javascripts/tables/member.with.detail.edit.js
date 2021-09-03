
(function ($) {

    'use strict';
    var GetMemberDetail = function (id) {
        $.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${id}`).done(
            function (details) {
                $('#' + id).children()[0].textContent = details[0].Email;
                $('#' + id).children()[2].textContent = details[0].ReferralID;
                $('#' + id).children()[3].textContent = details[0].IDCard;
                $('#' + id).children()[4].textContent = details[0].IDCard_DateIssue;
                $('#' + id).children()[5].textContent = details[0].IDCard_PlaceIssue;
                $('#' + id).children()[6].textContent = details[0].IsActive;
            }
        )
    }

    var EditMember = function (member, callback) {
        $.ajax({
            url: "http://api.duocmyphamhaiduong.com//UpdateMember",
            type: "PUT",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(member),
            dataType: "json",
            success: function (response) {
                callback()
            },

            error: function (x, e) {
                alert('Failed');
            }
        });
    }

    var AddMember = function (member, callback) {
        $.ajax({
            url: "http://api.duocmyphamhaiduong.com//api/Members",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(member),
            dataType: "json",
            success: function (response) {
                callback()
            },

            error: function (x, e) {
                alert('Failed');
            }
        });
    }

    var DeleteMember = function (id, callback) {
        $('.details').remove();
        $.ajax({
            url: "http://api.duocmyphamhaiduong.com//api/Members/" + id,
            type: "DELETE",
            contentType: "application/json",
            success: function () {
                callback()
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("some error");
            }
        });
    }

    var datatableInit = function () {
        var $table = $('#datatable-details');

        // format function for row details
        var fnFormatDetails = function (datatable, tr, id) {
            return `<table class="table mb-none">
                        <thead>
                            <tr>
                                <th style="width: 196.51px;">Email</th>
                                <th style="width: 120px;">Password</th>
                                <th style="width: 140px;">Mã TVGT</th>
                                <th style="width:140px">CMND</th>
                                <th>Ngày cấp</th>
                                <th>Nơi cấp</th>
                                <th>Kích hoạt</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id=${id}><td></td><td><a style="cursor:pointer;" class="pas">Reset</a></td><td></td><td></td><td></td><td></td><td></td></tr>
                        </tbody>
                    </table>`

        };

        // initialize
        var datatable = $table.dataTable({
            ajax: {
                "url": `https://api.duocmyphamhaiduong.com/GetMembers`,
                "dataSrc": ""
            },
            columns: [
                {
                    data: null,
                    className: "text-center",
                    defaultContent: '<i data-toggle class="fa fa-plus-square-o text-primary h5 m-none" style="cursor: pointer;"></i>',
                    orderable: false
                },
                {
                    data: "MemberID"
                },
                { data: "FullName" },
                {
                    data: "Gender"
                },
                //Birthday 
                {
                    data: "Birthday"
                },
                //position 
                {
                    data: "PositionID"
                },
                { data: "Phone" },
                { data: "Address" },

                {
                    data: null,
                    //className: "action",
                    defaultContent: '<i class="fa fa-pencil editt-row" style="cursor:pointer;"/></i> <i class="fa fa-trash-o removeMember" style="cursor:pointer;"/></i>',
                    orderable: false
                }
            ],
            "order": [[1, 'asc']],
            "language": {
                "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
                "zeroRecords": "Không có bản ghi nào",
                "info": "Trang _PAGE_ trong _PAGES_ trang",
                "infoEmpty": "Không có bản ghi nào",
                "infoFiltered": "(lọc từ _MAX_ bản ghi)"
            }
        });
        // add a listener
        $table.on('click', 'i[data-toggle]', function () {
            var $this = $(this),
                tr = $(this).closest('tr').get(0),
                id = $(this).parent().siblings()[0].textContent;

            if (datatable.fnIsOpen(tr)) {
                $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                datatable.fnClose(tr);
            } else {
                $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                datatable.fnOpen(tr, fnFormatDetails(datatable, tr, id), 'details');

                GetMemberDetail(id);
            }
        });
    };
    
    //Handle
    $(document).ready(function () {
        name = "";
        $('#addToTablee').click(function () {
            $.get(`http://api.duocmyphamhaiduong.com//GetNextMemberID`).done(
                function (data) {
                    ($('#fid')[0]).value = data;
                });
            $('#dialogAddmember').show();
        });

        //Edit---------------------------------------------------------------------------
        $(document).on('click', '.editt-row', function () {
            var id = ($(this).parent().siblings()[1]).textContent
            var member = {};
            $.get(`https://api.duocmyphamhaiduong.com/GetMember?id=${id}`).done(
                function (data) {
                    ($('#efid')[0]).value = data[0].MemberID;
                    ($('#efname')[0]).value = data[0].FullName;
                    ($('#ereferralID')[0]).value = data[0].ReferralID;
                    ($('#egender')[0]).value = data[0].Gender;
                    ($('#edob')[0]).value = data[0].Birthday;
                    ($('#eaddress')[0]).value = data[0].Address;
                    ($('#eemail')[0]).value = data[0].Email;
                    ($('#ephone')[0]).value = data[0].Phone;
                    ($('#eIDCard')[0]).value = data[0].IDCard;
                    ($('#eIDCard_PlaceIssue')[0]).value = data[0].IDCard_PlaceIssue;
                    ($('#eIDCard_DateIssue')[0]).value = data[0].IDCard_DateIssue;
                    ($('#epassword')[0]).value = data[0].Password;
                    ($('#eposition')[0]).value = data[0].PositionID;
                    var role = data[0].RoleID;
                    if (role == 1) { role = "Chủ sở hữu" } else if (role == 2) { role = "Quản trị viên" } else role = "Thành viên";
                    ($('#erole')[0]).value = role;
                    var active = data[0].IsActive;
                    if (active) active = "Đã active"; else active = "Chưa active";
                    ($('#eisactive')[0]).value = active;
                    ($('#eavatar')[0]).value = data[0].Avatar;
                    console.log(data);
                }
            )
            $('#dialogEditmember').show();
        });
        //Edit Member-----------------------------------------------------------------------------------------
        $(document).on('click', '#dialogEditmember .save', function () {
            
            if ($('#frmedit').valid()) {
            $('.workform#dialogEditmember').hide();
            var member = {};
            var fid = ($('#efid')[0]).value
            var fname = ($('#efname')[0]).value
            var referralID = ($('#ereferralID')[0]).value
            var gender = ($('#egender')[0]).value
            if (gender == 'Nam') gender = true; else gender = false;
            var dob = (new Date(($('#edob')[0]).value)).toISOString()
            var address = ($('#eaddress')[0]).value
            var email = ($('#eemail')[0]).value
            var phone = ($('#ephone')[0]).value
            var IDCard = ($('#eIDCard')[0]).value
            var IDCard_PlaceIssue = ($('#eIDCard_PlaceIssue')[0]).value
            var IDCard_DateIssue = (new Date(($('#eIDCard_DateIssue')[0]).value)).toISOString()
            var password = ($('#epassword')[0]).value
            var position = ($('#eposition')[0]).value
            if (position == "Chủ sở hữu") { position = 0 } else if (position == "Trưởng phòng") { position = 1 } else if (position == "Trưởng phòng dự bị") { position = 2 } else if (position == "Trưởng nhóm") { position = 3 } else if (position == "Thành viên đạt chuẩn") { position = 4 } else if (position == "Thành viên tích cực") { position = 5 } else if (position == "Thành viên 300") { position = 6 } else position = 7
            var role = ($('#erole')[0]).value
            if (role = "Thành viên") role = 3; else if (role = "Quản trị viên") role = 2; else role = 1;
            var isactive = ($('#eisactive')[0]).value
            if (isactive == 'Đã active') isactive = true; else isactive = false
            var avatar = ($('#eavatar')[0]).value


            member.MemberID = fid;
            member.FullName = fname;
            member.ReferralID = referralID;
            member.Gender = gender;
            member.Birthday = dob;
            member.Address = address;
            member.Email = email;
            member.Phone = phone;
            member.IDCard = IDCard;
            member.IDCard_PlaceIssue = IDCard_PlaceIssue;
            member.IDCard_DateIssue = IDCard_DateIssue;
            member.Password = password;
            member.PositionID = position;
            member.RoleID = role;
            member.IsActive = isactive;
            member.Avatar = null;

                EditMember(member, () => {
                    const table = $("#datatable-details").DataTable();
                    table.ajax.reload(null, false);
                })
            }
        });

        //Insert Member-----------------------------------------------------------------------------------------
        $(document).on('click', '#dialogAddmember .save', function () {
           
            if ($('#frmadd').valid()) {
            var member = {};
            var fid = ($('#fid')[0]).value
            var fname = ($('#fname')[0]).value
            var referralID = ($('#referralID')[0]).value
            var gender = ($('#gender')[0]).value
            if (gender == 'Nam') gender = true; else gender = false;
            var dob = ($('#dob')[0]).value
            var address = ($('#address')[0]).value
            var email = ($('#email')[0]).value
            var phone = ($('#phone')[0]).value
            var IDCard = ($('#IDCard')[0]).value
            var IDCard_PlaceIssue = ($('#IDCard_PlaceIssue')[0]).value
            var IDCard_DateIssue = ($('#IDCard_DateIssue')[0]).value
            var password = ($('#password')[0]).value
            var position = ($('#position')[0]).value
            if (position == "Chủ sở hữu") { position = 0 } else if (position == "Trưởng phòng") { position = 1 } else if (position == "Trưởng phòng dự bị") { position = 2 } else if (position == "Trưởng nhóm") { position = 3 } else if (position == "Thành viên đạt chuẩn") { position = 4 } else if (position == "Thành viên tích cực") { position = 5 } else if (position == "Thành viên 300") { position = 6 } else position = 7
            var role = ($('#role')[0]).value
            if (role = "Thành viên") role = 3; else if (role = "Quản trị viên") role = 2; else role = 1;
            var isactive = ($('#isactive')[0]).value
            if (isactive == 'Đã active') isactive = true; else isactive = false
            var avatar = ($('#avatar')[0]).value


            member.MemberID = fid;
            member.FullName = fname;
            member.ReferralID = referralID;
            member.Gender = gender;
            member.Birthday = dob;
            member.Address = address;
            member.Email = email;
            member.Phone = phone;
            member.IDCard = IDCard;
            member.IDCard_PlaceIssue = IDCard_PlaceIssue;
            member.IDCard_DateIssue = IDCard_DateIssue;
            member.Password = password;
            member.PositionID = position;
            member.RoleID = role;
            member.IsActive = isactive;
            member.Avatar = null;
            
                AddMember(member, () => {
                    const table = $("#datatable-details").DataTable();
                    table.ajax.reload(null, false);
                })
                $('.workform#dialogAddmember').hide();
            }
           
          
        });


        $(document).on('click', '.pas', function () {
            var nodes = Array.prototype.slice.call(document.getElementsByTagName('tbody')[0].children);
            var thistr = $(this).parent().parent().parent().parent().parent().parent('tr')[0]

            var index = nodes.indexOf(thistr);
            var name = $($($('tbody')[0]).children()[index - 1]).find('td')[2].textContent
            $('#sur span').text(name);
        });

    });
    $(document).on('click', '.exit', function () {
        $('.workform').hide();
    });

    $(document).ready(function () {

        $(document).on('click', '.removeMember', function () {
            var _self = {
                $cancel: $('#dialogCancel'),
                $confirm: $("#dialogConfirm"),
                $wrapper: $("#dialog")
            };
            var hang = $(this).parent().parent()
            var id = ($(this).parent().siblings()[1]).textContent
            // $.post("./google.com", data ,function(response){

            // }, 'json')
            $.magnificPopup.open({
                items: {
                    src: '#dialog',
                    type: 'inline'
                },
                preloader: false,
                modal: true,
                callbacks: {
                    change: function () {
                        _self.$confirm.on('click', function (e) {
                            e.preventDefault();
                            hang.detach();

                            DeleteMember(id, () => {
                                const table = $("#datatable-details").DataTable();
                                table.ajax.reload(null, false);
                            })

                            $.magnificPopup.close();
                        });

                        _self.$cancel.on('click', function (e) {
                            e.preventDefault();
                            $.magnificPopup.close();
                        });
                    },
                    close: function () {
                        _self.$cancel.on('click', function (e) {
                            e.preventDefault();
                            $.magnificPopup.close();
                        });
                    }
                }
            });
            return false;
        });
    });


    $(document).on('click', '.pas', function () {
        var _self = {
            $cancel: $('#dialogCancel1'),
            $confirm: $("#dialogConfirm1"),
            $wrapper: $("#dialog")
        };
        var row = $('.editt-row').parent().parent().children('td')[1];
        var hang = $(this).parent().parent()
        var data = $(row).text();
        // $.post("./google.com", data ,function(response){

        // }, 'json')
        $.magnificPopup.open({
            items: {
                src: '#dialog2',
                type: 'inline'
            },
            preloader: false,
            modal: true,
            callbacks: {
                change: function () {
                    _self.$confirm.on('click', function (e) {
                        e.preventDefault();
                        //ajax
                        $.magnificPopup.close();
                    });

                    _self.$cancel.on('click', function (e) {
                        e.preventDefault();
                        $.magnificPopup.close();
                    });
                },
                close: function () {
                    _self.$cancel.on('click', function (e) {
                        e.preventDefault();
                        $.magnificPopup.close();
                    });
                }
            }
        });
        return false;
    });



    $(function () {
        datatableInit();
    });

    $('#datepick').click(function () {
        $('.datepicker').css('z-index', '10000000000');
    })

}).apply(this, [jQuery]);