
(function ($) {

    'use strict';

    var details = [
        {
            Email: "phamvtict@gmail.com",
            Password: "Ni34ndN.getlink",
            ReferralID: "TV000001",
            IDCard: "0333485849321",
            IDCard_DateIssue: "01/12/2000",
            IDCard_PlaceIssue: "Công an huyện Khoái Châu",
            IsActive: "OK"
        }
    ]
    //function LoadData() {   
    //    $.get(`http://api.duocmyphamhaiduong.com/GetMembers`).done(
    //        function (data) {
    //            console.log(data);
    //        }
    //    )
    //}
    //LoadData()
    //var profiles = xml.getElementsByTagName("profile");
    //var arr = [];
    //for (var key in profiles) {
    //    arr.push([]);
    //    var nodes = profiles[key].childNodes;
    //    for (var ele in nodes) {
    //        if (nodes[ele]) {
    //            arr[key].push(nodes[ele]);
    //        }
    //    }
    //}
    //console.log(arr);

    var dataSet =
        [
        ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
        ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
        ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
        ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"],
        ["Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000"],
        ["Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500"],
        ["Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900"],
        ["Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500"],
        ["Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600"],
        ["Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560"],
        ["Sơn Bá", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000"]  
        ];
    //console.log(dataSet)

    var getDetail = function (details) {
        var detailContents = [];
        for (var i = 0; i < details.length; i++) {
            detailContents.push(`
                <tr>
                    <td>${details[i].Email}</td>
                    <td><a style="cursor:pointer;" class="pas">${details[i].Password}</a></td>
                    <td>${details[i].ReferralID}</td>
                    <td>${details[i].IDCard}</td>
                    <td>${details[i].IDCard_DateIssue}</td>
                    <td>${details[i].IDCard_PlaceIssue}</td>
                    <td>${details[i].IsActive}</td>
                </tr>
            `);
        }
        return detailContents;
    }



    var datatableInit = function () {
        var $table = $('#datatable-details');

        // format function for row details
        var fnFormatDetails = function (datatable, tr) {
            var data = getDetail(details);
            return `<table class="table mb-none">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Mã TVGT</th>
                                <th>CMND</th>
                                <th>Ngày cấp</th>
                                <th>Nơi cấp</th>
                                <th>Kích hoạt</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.join(' ')}
                        </tbody>
                    </table>`

        };

        

        // initialize
        var datatable = $table.dataTable({
            data: dataSet,
            columns: [
                { title: "Name" },
                { title: "Position" },
                { title: "Office" },
                { title: "Extn." },
                { title: "Start date" },
                { title: "Salary" }
            ],
            "order": [[0, 'asc']],
            "language": {
                "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
                "zeroRecords": "Không có bản ghi nào",
                "info": "Trang _PAGE_ trong _PAGES_ trang",
                "infoEmpty": "Không có bản ghi nào",
                "infoFiltered": "(lọc từ _MAX_ bản ghi)"
            }
        });


        // insert the expand/collapse column
        var th = document.createElement('th');
        var td = document.createElement('td');
        td.innerHTML = '<i data-toggle class="fa fa-plus-square-o text-primary h5 m-none" style="cursor: pointer;"></i>';
        td.className = "text-center";

        $table
            .find('thead tr').each(function () {
                this.insertBefore(th, this.childNodes[0]);
            });

        $table
            .find('tbody tr').each(function () {
                this.insertBefore(td.cloneNode(true), this.childNodes[0]);
            });
        $($('thead tr').children()[0]).css('width', '40px')

        //////insert update delete 
        ////var th = document.createElement('th');
        ////th.innerHTML ='Tác vụ'
        ////var td = document.createElement('td');
        ////td.innerHTML = '< a href = "#" class="on-default editt-row" > <i class="fa fa-pencil"></i></a ><a href="#" class="on-default removeMember"><i class="fa fa-trash-o"></i></a>';
        ////td.className = "actions center";

        ////$table
        ////    .find('thead tr').each(function () {
        ////        this.insertBefore(th, this.childNodes[7].nextSibling);
        ////    });

        ////$table
        ////    .find('tbody tr').each(function () {
        ////        this.insertBefore(td.cloneNode(true), this.childNodes[7].nextSibling);
        //    });


        ////$($('.actions')).append('< a href = "#" class="on-default editt-row" > <i class="fa fa-pencil"></i></a ><a href="#" class="on-default removeMember"><i class="fa fa-trash-o"></i></a>')

        // add a listener
        $table.on('click', 'i[data-toggle]', function () {
            var $this = $(this),
                tr = $(this).closest('tr').get(0);

            if (datatable.fnIsOpen(tr)) {
                $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                datatable.fnClose(tr);
            } else {
                $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                datatable.fnOpen(tr, fnFormatDetails(datatable, tr), 'details');
            }
        });
    };

    function ShowDetailDialog() {
        var _self = {
            $cancel: $('#btnCancelDetail'),
            $confirm: $("#btnSaveDetail"),
            $wrapper: $("#dialogAddDetail")
        };
        var row = $('.editt-row').parent().parent().children('td')[1];
        var data = $(row).text();
        // $.post("./google.com", data ,function(response){

        // }, 'json')
        $.magnificPopup.open({
            items: {
                src: '#dialogAddDetail',
                type: 'inline'
            },
            preloader: false,
            modal: true,
            callbacks: {
                change: function () {
                    _self.$confirm.on('click', function (e) {
                        e.preventDefault();


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
    }

    $('.removeMember').click(function () {
        var _self = {
            $cancel: $('#dialogCancel'),
            $confirm: $("#dialogConfirm"),
            $wrapper: $("#dialog")
        };
        var row = $('.editt-row').parent().parent().children('td')[1];
        var hang = $(this).parent().parent()
        var data = $(row).text();
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