host = window.location.protocol + '//' + location.host

function dayIntConverter(dayint) {
    if (dayint == 1) {
        return "Måndag"
    } else if (dayint == 2) {
        return "Tisdag"
    } else if (dayint == 3) {
        return "Onsdag"
    } else if (dayint == 4) {
        return "Torsdag"
    } else if (dayint == 5) {
        return "Fredag"
    } else if (dayint == 6) {
        return "Lördag";
    } else if (dayint == 7) {
        return "Söndag";
    }
}

function addBookingRow(booking) {
    $.ajax({
        url: host + '/tools/' + booking.tool_id,
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (tool) {
            var bookingsContainer = $('.bookingsContainer')
            var cardBody = $('<div class="cardBody"></div>');
            var button = $('<a href="#" class="btn btn-primary avbokaknapp">Avboka</a>');
            var name = $('<h5 class="cardTitle font">' + tool.name + '</h5>');
            var bookingTime = $('<p class="cardText font">' + dayIntConverter(booking.day) + ' ' + booking.start_hour + ':00 - ' + booking.end_hour + ':00 </p > ');

            cardBody.append(button, name, bookingTime)
            bookingsContainer.append(cardBody);
        }
    });
}

function getBookings() {
    $.ajax({
        url: host + '/user/1/book',
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (user_bookings) {
            $.each(user_bookings, function (i, booking) {
                addBookingRow(booking);
            });
        }
    });
}