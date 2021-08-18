var userID = sessionStorage.getItem("userID");
var password = sessionStorage.getItem("Password");
if (userID == null || password == null) {
    location.replace("/Login");
}
