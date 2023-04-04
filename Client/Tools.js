var preliminaryBknList = [];
var bookedList = [10, 11, 12, 13];
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
    var btn = $('<button class="buy-btn" data-toggle="modal" data-target="#mymodal" onclick ="showCalendar(0,0,'+tool.id+');showBookModalLeft(' + tool.id + ')">Boka nu</button>');

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

            bookModalLeft.append(name + img + description);
        }
    });
    var rightTop = $('#rightTop');
    rightTop.html("");
    var rightHeader = '<div class="bookModalRightHeader"> <h1 class="font dropdowmHeader">Se tilljängliga tider!</h1></div> <div class="modalBookRightSelector">';
    var rightWeekSelect = `<div class="day-select">
                          <select required id="selectedWeek" onchange="showCalendar(this, selectedDay,` + toolID + `)">
                          <option value="" selected disabled>Vilken vecka?</option>
                          <option value="01">1</option>
                          <option value="02">2</option>
                          <option value="03">3</option>
                          <option value="04">4</option>
                          <option value="05">5</option>
                          <option value="06">6</option>
                          <option value="07">7</option>
                          <option value="08">8</option>
                          <option value="09">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                          <option value="32">32</option>
                          <option value="33">33</option>
                          <option value="34">34</option>
                          <option value="35">35</option>
                          <option value="36">36</option>
                          <option value="37">37</option>
                          <option value="38">38</option>
                          <option value="39">39</option>
                          <option value="40">40</option>
                          <option value="41">41</option>
                          <option value="42">42</option>
                          <option value="43">43</option>
                          <option value="44">44</option>
                          <option value="45">45</option>
                          <option value="46">46</option>
                          <option value="47">47</option>
                          <option value="48">48</option>
                          <option value="49">49</option>
                          <option value="50">50</option>
                          <option value="51">51</option>
                          <option value="52">52</option>
                        </select>
                      </div>`;
        var rightDaySelect = `                      
                      <div class="day-select">
                        <!-- <p>Välj start:</p> -->
                        <select required id="selectedDay" onchange="showCalendar(selectedWeek, this,`+ toolID+`)">
                          <option value="" selected disabled>Vilken dag?</option>
                          <option value="mon">Måndag</option>
                          <option value="tue">Tisdag</option>
                          <option value="wen">Onsdag</option>
                          <option value="thu">Torsdag</option>
                          <option value="fri">Fredag</option>
                          <option value="sat">Lördag</option>
                          <option value="sun">Söndag</option>
                        
                        </select>
                      </div>
                    </div>
                    `;
            totalSelect = rightHeader + rightWeekSelect + rightDaySelect;
            rightTop.append(totalSelect);
}

/*function getBookedHours(selectWeek, selectDay, tool_id){
    var booked_hours = [];
    alert(selectWeek.selectedIndex + "  heheheh  " + selectDay.selectedIndex + "  " + tool_id);
    $.ajax({
        url: host + '/tools/' + tool_id +'/book',
        type: 'GET',
        //headers: {"Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token},
        
        success: function(bookings) {
            for (var i = 0; i < bookings.length; i++) {
                var booking = bookings[i];
                var hour = booking.start_hour;
                if (selectWeek.selectedIndex == booking.week) { 
                    if (selectDay.selectedIndex == booking.day) { 
                        while (hour <= booking.end_hour) {
                            alert(hour);
                            hour++;
                            booked_hours.push(hour);
                        }
                    }
                }
            }
            alert(booked_hours[0]);
            return booked_hours;
        }
    })
}*/
function getBookedHours(selectWeek, selectDay, tool_id) {
    return new Promise(function(resolve, reject) {
        var booked_hours = [];
        $.ajax({
            url: host + '/tools/' + tool_id +'/book',
            type: 'GET',
            success: function(bookings) {
                for (var i = 0; i < bookings.length; i++) {
                    var booking = bookings[i];
                    var hour = booking.start_hour;
                    if (selectWeek.selectedIndex == booking.week) { 
                        if (selectDay.selectedIndex == booking.day) { 
                            while (hour <= booking.end_hour) {
                                hour++;
                                booked_hours.push(hour);
                            }
                        }
                    }
                }
                resolve(booked_hours);
            },
            error: function(xhr, status, error) {
                reject(error);
            }
        });
    });
}




function showCalendar(selectWeek, selectDay, tool_id) {

    $("#calendar").html("");
    preliminaryBknList = [];
    var weekNr = selectWeek.selectedIndex;
    var dayNr = selectDay.selectedIndex;
    var selectedTimes = [];

    /*alert("Vecka " + weekNr+ " Dag " + dayNr);*/

    if (weekNr > 0 && dayNr > 0) {
        var tableBeginning = '<table> <thead> </thead> <tbody>';
        var tableRowOne = '<tr class ="oddRow"> <td class="hour" id = "01" onclick="addPreliminaryBkn(this)"><span>00:00 01:00</span></td> <td class="hour" id = "02" onclick="addPreliminaryBkn(this)"><span>01:00 02:00</span></td>  <td class="hour"id = "03" onclick="addPreliminaryBkn(this)"><span>02:00 03:00</span></td>   <td class="hour" id = "04" onclick="addPreliminaryBkn(this)"><span>03:00 04:00</span></td>   <td class="hour" id = "05" onclick="addPreliminaryBkn(this)"><span>04:00 05:00</span></td>   <td class="hour" id = "06" onclick="addPreliminaryBkn(this)"><span>05:00 06:00</span></td>    </tr>';
        var tableRowTwo = '<tr class ="evenRow">  <td class="hour" id = "07" onclick="addPreliminaryBkn(this)"><span>06:00 07:00</span></td>  <td class="hour" id = "08" onclick="addPreliminaryBkn(this)"><span>07:00 08:00</span></td>  <td class="hour" id = "09" onclick="addPreliminaryBkn(this)"><span>08:00 09:00</span></td>  <td class="hour" id = "10" onclick="addPreliminaryBkn(this)"><span>09:00 10:00</span></td>  <td class="hour" id = "11" onclick="addPreliminaryBkn(this)"><span>10:00 11:00</span></td>  <td class="hour" id = "12" onclick="addPreliminaryBkn(this)"><span>11:00 12:00</span></td>    </tr>';
        var tableRowTree = ' <tr class ="oddRow">  <td class="hour" id = "13" onclick="addPreliminaryBkn(this)"><span>12:00 13:00</span></td>  <td class="hour" id = "14" onclick="addPreliminaryBkn(this)"><span>13:00 14:00</span></td>  <td class="hour" id = "15" onclick="addPreliminaryBkn(this)"><span>14:00 15:00</span></td>  <td class="hour" id = "16" onclick="addPreliminaryBkn(this)"><span>15:00 16:00</span></td>    <td class="hour" id = "17" onclick="addPreliminaryBkn(this)"><span>16:00 17:00</span></td>    <td class="hour" id = "18" onclick="addPreliminaryBkn(this)"><span>17:00 18:00</span></td>  </tr>';
        var tableRowFour = '<tr class ="evenRow">    <td class="hour" id = "19" onclick="addPreliminaryBkn(this)"><span>18:00 19:00</span></td>    <td class="hour" id = "20" onclick="addPreliminaryBkn(this)"><span>19:00 20:00</span></td>    <td class="hour" id = "21" onclick="addPreliminaryBkn(this)"><span>20:00 21:00</span></td>    <td class="hour" id = "22" onclick="addPreliminaryBkn(this)"><span>21:00 22:00</span></td>    <td class="hour" id = "23" onclick="addPreliminaryBkn(this)"><span>22:00 23:00</span></td>    <td class="hour" id = "24" onclick="addPreliminaryBkn(this)"><span>23:00 24:00</span></td>  </tr>';
        var tableEnd = '</tbody> </table>';
        var updatedCalendar = tableBeginning + tableRowOne + tableRowTwo + tableRowTree + tableRowFour + tableEnd;

        $('#calendar').append(updatedCalendar);
    getBookedHours(selectWeek, selectDay, tool_id).then(function(booked_hours) {
        if (booked_hours.length>0){
            for(let i = 0; i<booked_hours.length; i++){
                var bookedSting = booked_hours[i].toString();
                var element = document.getElementById(bookedSting);
                element.className = "booked";
                element.onclick = null;
               }
        }
            console.log(booked_hours);
        }).catch(function(error) {
            console.error(error);
        });    
    } else {
        var tableBeginning = '<table> <thead> </thead> <tbody>';
        var tableRowOne = '<tr class ="oddRowInactive"> <td class=""><span>00:00 01:00</span></td> <td class=""><span>01:00 02:00</span></td>  <td class=""><span>02:00 03:00</span></td>   <td class=""><span>03:00 04:00</span></td>   <td class=""><span>04:00 05:00</span></td>   <td class=""><span>05:00 06:00</span></td>    </tr>';
        var tableRowTwo = '<tr class ="evenRowInactive">  <td class=""><span>06:00 07:00</span></td>  <td class=""><span>07:00 08:00</span></td>  <td class=""><span>08:00 09:00</span></td>  <td class=""><span>09:00 10:00</span></td>  <td class=""><span>10:00 11:00</span></td>  <td class=""><span>11:00 12:00</span></td>    </tr>';
        var tableRowTree = ' <tr class ="oddRowInactive">  <td class=""><span>12:00 13:00</span></td>  <td class=""><span>13:00 14:00</span></td>  <td class=""><span>14:00 15:00</span></td>  <td class=""><span>15:00 16:00</span></td>    <td class=""><span>16:00 17:00</span></td>    <td class=""><span>17:00 18:00</span></td>  </tr>';
        var tableRowFour = '<tr class ="evenRowInactive">    <td class=""><span>18:00 19:00</span></td>    <td class=""><span>19:00 20:00</span></td>    <td class=""><span>20:00 21:00</span></td>    <td class=""><span>21:00 22:00</span></td>    <td class=""><span>22:00 23:00</span></td>    <td class=""><span>23:00 24:00</span></td>  </tr>';
        var tableEnd = '</tbody> </table>';
        var updatedCalendar = tableBeginning + tableRowOne + tableRowTwo + tableRowTree + tableRowFour + tableEnd;
        $('#calendar').append(updatedCalendar);
    }
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