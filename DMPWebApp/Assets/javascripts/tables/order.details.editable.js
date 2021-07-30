class EditableDetailTable{
	//lol
	constructor(id) {
		this.options = {
			addButton: '#addToTable',
			table: id,
			dialog: {
				wrapper: '#dialog',
				cancelButton: '#dialogCancel',
				confirmButton: '#dialogConfirm',
			}
		}
    }
	

	initialize =  function (length) {
		this
			.setVars()
			.build(length)
			.events(length);
	}

	setVars = function () {
		this.$table = $(this.options.table);
		this.$addButton = $(this.options.addButton);

		// dialog
		this.dialog = {};
		this.dialog.$wrapper = $(this.options.dialog.wrapper);
		this.dialog.$cancel = $(this.options.dialog.cancelButton);
		this.dialog.$confirm = $(this.options.dialog.confirmButton);

		return this;
	}

	build = function (length) {
		var cols = []
		for (var i = 0; i < length; i++)
			cols.push(null);
		cols.push({ "bSortable": false })
		this.datatable = this.$table.DataTable({
			aoColumns: cols,
			"language": {
				"lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
				"zeroRecords": "Không có bản ghi nào",
				"info": "Trang _PAGE_ trong _PAGES_ trang",
				"infoEmpty": "Không có bản ghi nào",
				"infoFiltered": "(lọc từ _MAX_ bản ghi)"
			}
		});

		window.dt = this.datatable;

		return this;
	}

	events = function (length) {
		var _self = this;

		this.$table
			.on('click', 'a.save-row', function (e) {
				e.preventDefault();

				_self.rowSave($(this).closest('tr'));
			})
			.on('click', 'a.cancel-row', function (e) {
				e.preventDefault();

				_self.rowCancel($(this).closest('tr'));
			})
			.on('click', 'a.edit-row', function (e) {
				e.preventDefault();

				_self.rowEdit($(this).closest('tr'));
			})
			.on('click', 'a.remove-row', function (e) {
				e.preventDefault();

				var $row = $(this).closest('tr');
				
				_self.rowRemove($row);
			});

		this.$addButton.on('click', function (e) {
			e.preventDefault();
			_self.rowAdd(length);
		});

		this.dialog.$cancel.on('click', function (e) {
			e.preventDefault();
			$.magnificPopup.close();
		});

		return this;
	}

	
	rowAdd = function (length) {
		this.$addButton.attr({ 'disabled': 'disabled' });

		var actions,
			data,
			$row;

		actions = [
			'<a href="#" class="hidden on-editing save-row"><i class="fa fa-save"></i></a>',
			'<a href="#" class="hidden on-editing cancel-row"><i class="fa fa-times"></i></a>',
			'<a href="#" class="on-default edit-row"><i class="fa fa-pencil"></i></a>',
			'<a href="#" class="on-default remove-row"><i class="fa fa-trash-o"></i></a>'
		].join(' ');
		var cols = []
		for (var i = 0; i < length; i++)
			cols.push('');
		cols.push(actions);
		data = this.datatable.row.add(cols);
		$row = this.datatable.row(data[0]).nodes().to$();

		$row
			.addClass('adding')
			.find('td:last')
			.addClass('actions');

		this.rowEdit($row);

		this.datatable.order([0, 'asc']).draw(); // always show fields
	}

	rowCancel = function ($row) {
		var _self = this,
			$actions,
			i,
			data;

		if ($row.hasClass('adding')) {
			this.rowRemove($row);
		} else {

			data = this.datatable.row($row.get(0)).data();
			this.datatable.row($row.get(0)).data(data);

			$actions = $row.find('td.actions');
			if ($actions.get(0)) {
				this.rowSetActionsDefault($row);
			}

			this.datatable.draw();
		}
	}

	rowEdit = function ($row) {
		var _self = this,
			data;

		data = this.datatable.row($row.get(0)).data();

		$row.children('td').each(function (i) {
			var $this = $(this);

			if ($this.hasClass('actions')) {
				_self.rowSetActionsEditing($row);
			} else {
				$this.html('<input type="text" class="form-control input-block" value="' + data[i] + '"/>');
			}
		});
	}

	rowSave = function ($row) {
		var _self = this,
			$actions,
			values = [];

		if ($row.hasClass('adding')) {
			this.$addButton.removeAttr('disabled');
			$row.removeClass('adding');
		}

		values = $row.find('td').map(function () {
			var $this = $(this);

			if ($this.hasClass('actions')) {
				_self.rowSetActionsDefault($row);
				return _self.datatable.cell(this).data();
			} else {
				return $.trim($this.find('input').val());
			}
		});

		this.datatable.row($row.get(0)).data(values);

		$actions = $row.find('td.actions');
		if ($actions.get(0)) {
			this.rowSetActionsDefault($row);
		}

		this.datatable.draw();
	}

	rowRemove = function ($row) {
		if ($row.hasClass('adding')) {
			this.$addButton.removeAttr('disabled');
		}

		this.datatable.row($row.get(0)).remove().draw();
	}

	rowSetActionsEditing = function ($row) {
		$row.find('.on-editing').removeClass('hidden');
		$row.find('.on-default').addClass('hidden');
	}

	rowSetActionsDefault = function ($row) {
		$row.find('.on-editing').addClass('hidden');
		$row.find('.on-default').removeClass('hidden');
	}


}


