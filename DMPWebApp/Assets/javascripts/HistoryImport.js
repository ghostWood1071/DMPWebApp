$('#table').DataTable({
    ajax: {
        url: `https://api.duocmyphamhaiduong.com/GetOrders?memberID=${localStorage.getItem('userID')}`,
        dataSrc: ''
    },
    columns: [
        { data: 'OrderID' },
        { data: 'MemberID' },
        { data: 'FullName' },
        { data: 'Discount', className: 'right' },
        { data: 'OrderDate' }
    ],
    language: {
        "lengthMenu": "Hiển thị _MENU_ bản ghi trên trang",
        "zeroRecords": "Không có bản ghi nào",
        "info": "Trang _PAGE_ trong _PAGES_ trang",
        "infoEmpty": "Không có bản ghi nào",
        "infoFiltered": "(lọc từ _MAX_ bản ghi)"
    }
});