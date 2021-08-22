
(function ($) {

    'use strict';



    var datatableInit = function () {
        var UserID = 'TV000001';

        var $table = $('#datatable-details');

        // format function for row details
        var fnFormatDetails = function (datatable, tr, id) {
            return `<table class="table mb-none">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Mã TVGT</th>
                                <th>CMND</th>
                                <th>Ngày cấp</th>
                                <th>Nơi cấp</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id=${id}>  <td></td>   <td></td>   <td></td>   <td></td>   <td></td> </tr>
                        </tbody>
                    </table>`

        };

        // initialize
        var datatable = $table.dataTable({
            ajax: {
                "url": `http://localhost:57133/GetLowerMembers?id=${UserID}`,
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
                { data: "Address" }
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

                $.get(`http://localhost:57133/GetMember?id=${id}`).done(
                    function (details) {
                        $('#' + id).children()[0].textContent = details[0].Email;
                        $('#' + id).children()[1].textContent = details[0].ReferralID;
                        $('#' + id).children()[2].textContent = details[0].IDCard;
                        $('#' + id).children()[3].textContent = details[0].IDCard_DateIssue;
                        $('#' + id).children()[4].textContent = details[0].IDCard_PlaceIssue;
                    }
                )
            }
        });
    };

    //Handle
    $(document).ready(function () {
        $(document).on('click', '.pas', function () {
            var nodes = Array.prototype.slice.call(document.getElementById('ttable').children);
            var thistr = $(this).parent().parent().parent().parent().parent().parent('tr')[0]

            var index = nodes.indexOf(thistr);
            var name = $($('#ttable').children()[index - 1]).find('td')[2].textContent
            $('#sur span').text(name);
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