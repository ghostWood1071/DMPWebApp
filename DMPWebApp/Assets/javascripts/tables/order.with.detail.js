
(function( $ ) {

	'use strict';

    var details = [
        {
            ProductID: "SP001",
            ProductName: "Kem đánh răng",
            Quantity: 150,
            UnitPrice: 15000000
        },
        {
            ProductID: "SP001",
            ProductName: "Kem đánh răng",
            Quantity: 150,
            UnitPrice: 15000000
        },
        {
            ProductID: "SP001",
            ProductName: "Kem đánh răng",
            Quantity: 150,
            UnitPrice: 15000000
        },
        {
            ProductID: "SP001",
            ProductName: "Kem đánh răng",
            Quantity: 150,
            UnitPrice: 15000000
        },
        {
            ProductID: "SP001",
            ProductName: "Kem đánh răng",
            Quantity: 150,
            UnitPrice: 15000000
        }
    ]

    var actions = [
        '<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
        '<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
    ].join(' ');

    var getDetail = function(details){
        var detailContents = [];
        for(var i = 0; i<details.length; i++ ){
            detailContents.push(`
                <tr>
                    <td>${details[i].ProductID}</td>
                    <td>${details[i].ProductName}</td>
                    <td>${details[i].Quantity}</td>
                    <td>${details[i].UnitPrice}</td>
                </tr>
            `);
        }
        return detailContents;
    }

    

	var datatableInit = function() {
		var $table = $('#datatable-details');

		// format function for row details
		var fnFormatDetails = function( datatable, tr ) {
			var data = getDetail(details);
			return `<table class="table mb-none">
                        <thead>
                            <tr>
                                <th>Mã SP</th>
                                <th>Tên SP</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.join(' ')}
                        </tbody>
                    </table>`
		};

		// insert the expand/collapse column
		var th = document.createElement( 'th' );
		var td = document.createElement( 'td' );
		td.innerHTML = '<i data-toggle class="fa fa-plus-square-o text-primary h5 m-none" style="cursor: pointer;"></i>';
		td.className = "text-center";

		$table
			.find( 'thead tr' ).each(function() {
				this.insertBefore( th, this.childNodes[0] );
			});

		$table
			.find( 'tbody tr' ).each(function() {
				this.insertBefore(  td.cloneNode( true ), this.childNodes[0] );
			});

		// initialize
		var datatable = $table.dataTable({
			aoColumnDefs: [{
				bSortable: false,
				aTargets: [ 0 ]
			}],
			aaSorting: [
				[1, 'asc']
			],
            "language": {
                "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
                "zeroRecords": "Không có bản ghi nào",
                "info": "Trang _PAGE_ trong _PAGES_ trang",
                "infoEmpty": "Không có bản ghi nào",
                "infoFiltered": "(lọc từ _MAX_ bản ghi)"
            }
		});

		// add a listener
		$table.on('click', 'i[data-toggle]', function() {
			var $this = $(this),
				tr = $(this).closest( 'tr' ).get(0);

			if ( datatable.fnIsOpen(tr) ) {
				$this.removeClass( 'fa-minus-square-o' ).addClass( 'fa-plus-square-o' );
				datatable.fnClose( tr );
			} else {
				$this.removeClass( 'fa-plus-square-o' ).addClass( 'fa-minus-square-o' );
				datatable.fnOpen( tr, fnFormatDetails( datatable, tr), 'details' );
			}
		});
	};

    $('.edit-row').click(function(){
        var row =  $('.edit-row').parent().parent().children('td')[1];
        var data = $(row).text();
        // $.post("./google.com", data ,function(response){
                
        // }, 'json');
        window.open("");
        return false;
    });

    $('.remove-row').click(function(){
        var _self = {
           $cancel:  $('#dialogCancel'),
           $confirm: $("#dialogConfirm"),
           $wrapper: $("#dialog")
        };
        var row =  $('.edit-row').parent().parent().children('td')[1];
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
                change: function() {
                    _self.$confirm.on( 'click', function( e ) {
                        e.preventDefault();

                        //ajax
                        $.magnificPopup.close();
                    });

                    _self.$cancel.on('click', function(e){
                        e.preventDefault();
                        $.magnificPopup.close();
                    });
                },
                close: function() {
                    _self.$cancel.on('click', function(e){
                        e.preventDefault();
                        $.magnificPopup.close();
                    });
                }
            }
        });
        return false;
    });

    $('#addToTable').click(function(){
        window.open("")
    });

	$(function() {
		datatableInit();
	});

}).apply( this, [ jQuery ]);