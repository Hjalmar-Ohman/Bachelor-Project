host = window.location.protocol + '//' + location.host
function search() {
    var keyword = $('#searchText').val();
    console.log(keyword);

    /*
    $.ajax({
        url: host + '/tools/search?keyword=' + keyword,
        type: 'GET',
        data: { 'keyword': keyword },
        dataType: 'json',
        success: function (data) {
            // handle successful response from server
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // handle error response from server
            console.log(errorThrown);
        }
    });*/
};
