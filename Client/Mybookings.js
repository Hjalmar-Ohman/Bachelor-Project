
function getBookings() {
    $.ajax({
        url: host + '/user/1/book',
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (user_bookings) {
            console.log(1);
        }
    });
}