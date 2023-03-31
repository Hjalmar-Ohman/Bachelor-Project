host = window.location.protocol + '//' + location.host

function addToolCard(tool) {
    var cardsHolder = $('.cardsHolder');

    var card = $('<div class="card toolcards"></div>');
    var productImage = $('<div class="product-image"></div>');
    var img = $('<img src="/Pictures/tools/bearbetning.png" alt="Tool Image" draggable="false" />');
    var productInfo = $('<div class="product-info"></div>');
    var h2 = $('<h2>' + tool.name + '</h2>');
    var p = $('<p>' + tool.description + '</p>');
    var price = $('<div class="price">' + tool.price + ' kr/h</div>');
    var btn = $('<div class="btn"><button class="buy-btn" for="ruta">Boka nu</button></div>');

    productImage.append(img);
    productInfo.append(h2, p, price);
    card.append(productImage, productInfo, btn);
    cardsHolder.append(card);
}


function search() {
    var keyword = $("#searchText").val();

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

