var preliminaryBknList = [];
host = window.location.protocol + '//' + location.host

function addToolCard(tool) {
    var cardsHolder = $('.cardsHolder');

    var card = $('<div id = "toolID' + tool.id + '" class="card toolcards"></div>');
    var productImage = $('<div class="product-image"></div>');
    var img = $('<img src="' + tool.image + '" alt="Tool Image" draggable="false" />');
    var productInfo = $('<div class="product-info"></div>');
    var h2 = $('<h2>' + tool.name + '</h2>');
    var p = $('<p>' + tool.properties + '</p>');
    var price = $('<div class="price">' + tool.price + ' kr/h</div>');
    var btn = $('<button class="buy-btn" data-toggle="modal" data-target="#mymodal" onclick ="showCalendar(0,0);showBookModalLeft(' + tool.id + ')">Boka nu</button>');

    productImage.append(img);
    productInfo.append(h2, p, price);
    card.append(productImage, productInfo, btn);
    cardsHolder.append(card);
}

function loadTools() {
    $.ajax({
        url: host + '/tools',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function (tools) {
            $.each(tools, function (i, tool) {
                addToolCard(tool);
            });
        }
    });
}

function search() {
    var keyword = $("#searchText").val();
    removeTools();

    $.ajax({
        url: host + '/tools/search?keyword=' + keyword,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function (tools) {
            $.each(tools, function (i, tool) {
                addToolCard(tool);
            });
        }
    });
}

function removeTools() {
    $.ajax({
        url: host + '/tools',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function (tools) {
            $.each(tools, function (i, tool) {
                $('#toolID' + tool.id).remove();
                console.log(tool.id);
            });
        }
    });
}


$('#searchText').on('keyup', function (e) {
    console.log(1);
    if (e.key === 'Enter') {
        //e.preventDefault();
        console.log(1);
        search();
        $('#searchText').val('');
    }
});

function klickad() {
    alert(klickad);
}

function showBookModalLeft(toolID) {
    $.ajax({
        url: host + '/tools/' + toolID,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function (tool) {

            console.log("left funciton");
            var bookModalLeft = $('.bookModalLeft');
            $('.bookModalLeft').html("");

            var name = '<h1 class="font modalHeader">' + tool.name + '</h1>';
            var img = '<div class="product-image"> <img src="' + tool.image + '" alt="Tool Image" draggable="false" /> </div>';
            var description = '<p class ="font modalInfo">' + tool.description + '</p>';

            bookModalLeft.append(name, img, description);
        }
    });
}

function showCalendar(selectWeek, selectDay) {
    $("#calendar").html("");
    preliminaryBknList = [];
    var weekNr = selectWeek.selectedIndex;
    var dayNr = selectDay.selectedIndex;
    var selectedTimes = [];

    /*alert("Vecka " + weekNr+ " Dag " + dayNr);*/

    // $.ajax({
    //     url: host + '/tools/' + tool_id +'/book',
    //     type: 'GET', 

    //     success: function(bookings) {
    //         const booked_hours = [];
    //         for (var i = 0; i < bookings.length; i++) {
    //             var booking = bookings[i];
    //             var hour = booking.start_hour;
    //             if (document.getElementById("selectedWeek").value == booking.week) { 
    //                 if (document.getElementById("selectedDay").value == booking.day) { 
    //                     while (hour <= booking.end_hour) {
    //                         hour++;
    //                         booked_hours.add(hour);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })

    if (weekNr > 0 && dayNr > 0) {
        var tableBeginning = '<table> <thead> </thead> <tbody>';
        var tableRowOne = '<tr class ="oddRow"> <td class="hour" id = "01" onclick="addPreliminaryBkn(this)"><span>00:00 01:00</span></td> <td class="hour" id = "02" onclick="addPreliminaryBkn(this)"><span>01:00 02:00</span></td>  <td class="hour"id = "03" onclick="addPreliminaryBkn(this)"><span>02:00 03:00</span></td>   <td class="hour" id = "04" onclick="addPreliminaryBkn(this)"><span>03:00 04:00</span></td>   <td class="hour" id = "05" onclick="addPreliminaryBkn(this)"><span>04:00 05:00</span></td>   <td class="hour" id = "06" onclick="addPreliminaryBkn(this)"><span>05:00 06:00</span></td>    </tr>';
        var tableRowTwo = '<tr class ="evenRow">  <td class="hour" id = "07" onclick="addPreliminaryBkn(this)"><span>06:00 07:00</span></td>  <td class="hour" id = "08" onclick="addPreliminaryBkn(this)"><span>07:00 08:00</span></td>  <td class="hour" id = "09" onclick="addPreliminaryBkn(this)"><span>08:00 09:00</span></td>  <td class="hour" id = "10" onclick="addPreliminaryBkn(this)"><span>09:00 10:00</span></td>  <td class="hour" id = "11" onclick="addPreliminaryBkn(this)"><span>10:00 11:00</span></td>  <td class="hour" id = "12" onclick="addPreliminaryBkn(this)"><span>11:00 12:00</span></td>    </tr>';
        var tableRowTree = ' <tr class ="oddRow">  <td class="hour" id = "13" onclick="addPreliminaryBkn(this)"><span>12:00 13:00</span></td>  <td class="hour" id = "14" onclick="addPreliminaryBkn(this)"><span>13:00 14:00</span></td>  <td class="hour" id = "15" onclick="addPreliminaryBkn(this)"><span>14:00 15:00</span></td>  <td class="hour" id = "16" onclick="addPreliminaryBkn(this)"><span>15:00 16:00</span></td>    <td class="hour" id = "17" onclick="addPreliminaryBkn(this)"><span>16:00 17:00</span></td>    <td class="hour" id = "18" onclick="addPreliminaryBkn(this)"><span>17:00 18:00</span></td>  </tr>';
        var tableRowFour = '<tr class ="evenRow">    <td class="hour" id = "19" onclick="addPreliminaryBkn(this)"><span>18:00 19:00</span></td>    <td class="hour" id = "20" onclick="addPreliminaryBkn(this)"><span>19:00 20:00</span></td>    <td class="hour" id = "21" onclick="addPreliminaryBkn(this)"><span>20:00 21:00</span></td>    <td class="hour" id = "22" onclick="addPreliminaryBkn(this)"><span>21:00 22:00</span></td>    <td class="hour" id = "23" onclick="addPreliminaryBkn(this)"><span>22:00 23:00</span></td>    <td class="hour" id = "24" onclick="addPreliminaryBkn(this)"><span>23:00 24:00</span></td>  </tr>';
        var tableEnd = '</tbody> </table>';
        var updatedCalendar = tableBeginning + tableRowOne + tableRowTwo + tableRowTree + tableRowFour + tableEnd;

    } else {
        var tableBeginning = '<table> <thead> </thead> <tbody>';
        var tableRowOne = '<tr class ="oddRowInactive"> <td class=""><span>00:00 01:00</span></td> <td class=""><span>01:00 02:00</span></td>  <td class=""><span>02:00 03:00</span></td>   <td class=""><span>03:00 04:00</span></td>   <td class=""><span>04:00 05:00</span></td>   <td class=""><span>05:00 06:00</span></td>    </tr>';
        var tableRowTwo = '<tr class ="evenRowInactive">  <td class=""><span>06:00 07:00</span></td>  <td class=""><span>07:00 08:00</span></td>  <td class=""><span>08:00 09:00</span></td>  <td class=""><span>09:00 10:00</span></td>  <td class=""><span>10:00 11:00</span></td>  <td class=""><span>11:00 12:00</span></td>    </tr>';
        var tableRowTree = ' <tr class ="oddRowInactive">  <td class=""><span>12:00 13:00</span></td>  <td class=""><span>13:00 14:00</span></td>  <td class=""><span>14:00 15:00</span></td>  <td class=""><span>15:00 16:00</span></td>    <td class=""><span>16:00 17:00</span></td>    <td class=""><span>17:00 18:00</span></td>  </tr>';
        var tableRowFour = '<tr class ="evenRowInactive">    <td class=""><span>18:00 19:00</span></td>    <td class=""><span>19:00 20:00</span></td>    <td class=""><span>20:00 21:00</span></td>    <td class=""><span>21:00 22:00</span></td>    <td class=""><span>22:00 23:00</span></td>    <td class=""><span>23:00 24:00</span></td>  </tr>';
        var tableEnd = '</tbody> </table>';
        var updatedCalendar = tableBeginning + tableRowOne + tableRowTwo + tableRowTree + tableRowFour + tableEnd;
    }
    $('#calendar').append(updatedCalendar);

}
function addPreliminaryBkn(id) {

    if (id.className == "hour") {
        id.className = "selected";
        preliminaryBknList.push(id.id);
    } else {
        id.className = "hour";
        preliminaryBknList = preliminaryBknList.filter(function (item) {
            return item !== id.id
        })
    }
    var idInList = "Id:n i listan: ";
    for (let i = 0; i < preliminaryBknList.length; i++) {
        idInList += preliminaryBknList[i];
    }
    alert(idInList);
}