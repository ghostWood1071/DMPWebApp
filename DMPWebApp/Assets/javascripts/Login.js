function login() {
    var userID = $('.account').val().trim();
    var password = $('.password').val().trim();
    if (userID == "") {
        toastr.error("Tên đăng nhập không được để trống");
        return false;
    }
    if (password == "") {
        toastr.error("Mật khẩu không được để trống");
        return false;
    }
    localStorage.setItem("userID", userID);
    return true;
}