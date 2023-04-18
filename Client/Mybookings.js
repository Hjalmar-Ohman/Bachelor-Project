host = window.location.protocol + '//' + location.host

function dayIntConverter(dayint) {
    console.log("efter" + dayint)
    if (dayint == "mon") {
        return "Måndag"
    } else if (dayint == "tue") {
        return "Tisdag"
    } else if (dayint == "wed") {
        return "Onsdag"
    } else if (dayint == "thu") {
        return "Torsdag"
    } else if (dayint == "fri") {
        return "Fredag"
    } else if (dayint == "sat") {
        return "Lördag";
    } else if (dayint == "sun") {
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
            console.log("innan" + booking.day)
            var bookingsContainer = $('.bookingsContainer')
            var cardBody = $('<div class="cardBody" id = "' + booking.id + '"></div>');
            var button = $('<a href="#" class="btn btn-primary avbokaknapp" onclick="removeBooking(' + booking.id + ')">Avboka</a>');
            var name = $('<h5 class="cardTitle font">' + tool.name + '</h5>');
            var bookingTime = $('<p class="cardText font"> Vecka: ' + booking.week +', '+ dayIntConverter(booking.day) + ', ' + booking.start_hour + ':00 - ' + booking.end_hour + ':00 </p > ');
            
            cardBody.append(button, name, bookingTime)
            bookingsContainer.append(cardBody);
        }
    });
}

function getBookings() {
    $.ajax({
        url: host + '/user/' + sessionStorage.getItem('user_id') + '/book',
        type: 'GET',
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (user_bookings) {
            $.each(user_bookings, function (i, booking) {
                addBookingRow(booking);
                console.log(booking.id)
                console.log(booking.day)
            });
        }
    });
}

function removeBooking(bookingID) {
    $.ajax({
        url: host + '/book/' + bookingID,
        type: 'DELETE',
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function () {
            $('#' + bookingID).remove();
        }
    });
}
