host = window.location.protocol + '//' + location.host

/*
function search(keyword) {
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
    });
}
*/
/*
$('#searchButton').click(function (e) {
    e.preventDefault();
    console.log("hej")
    var keyword = $("#searchText").val();
    console.log("keyword");
    //TODO: Hämta keyword från html.
    //search(keyword);
});
*/
/*

var el = document.getElementById('overlayBtn');
if(el){
  el.addEventListener('click', sayHello, false);
}
*/
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
                console.log(tool);
            });
        }
    });
}