function search(keyword) {
    $.ajax({
        url: host + '/tools/search?keyword=' + keyword,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function () {
            //viewTools();
            return;
        }
    });
}

$('#searchButton').click(function (e) {
    e.preventDefault();
    var keyword = $("#searchText").val();
    console.log("keyword");
    //TODO: Hämta keyword från html.
    //search(keyword);
});

