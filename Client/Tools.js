host = window.location.protocol + '//' + location.host
var x = 0;
function addToolCard(tool) {
    var cardsHolder = $('.cardsHolder');

    var card = $('<div id = "toolID' + tool.id + '" class="card toolcards"></div>');
    var productImage = $('<div class="product-image"></div>');
    var img = $('<img src="' + tool.image + '" alt="Tool Image" draggable="false" />');
    var productInfo = $('<div class="product-info"></div>');
    var h2 = $('<h2>' + tool.name + '</h2>');
    var p = $('<p>' + tool.properties + '</p>');
    var price = $('<div class="price">' + tool.price + ' kr/h</div>');
    var btn = $('<div class="btn"><button class="buy-btn" for="ruta">Boka nu</button></div>');

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

function searchSilverTejp(){
    if(x==1){
       setTimeout(removeTools, 550);
    }
    else{
        removeTools();
    }
}
function search() {
    var keyword = $("#searchText").val();
    console.log(keyword);
   // removeTools();

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

    x=0;
}

function removeTools() {
    x=1;
    $.ajax({
        url: host + '/tools',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function (tools) {
            console.log("tar bort")
            $.each(tools, function (i, tool) {
                $('#toolID' + tool.id).remove();
            });
            search();
        }
    });
}
