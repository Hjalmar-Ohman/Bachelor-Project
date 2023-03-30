/*
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
function search(){
    console.log("Hej");
    var keyword = $("#searchText").val();
    console.log(keyword);

    $.ajax({
        url: host + '/tools/search?keyword=' + keyword,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth') },
        success: function () {
            //viewTools();
            console.log("Klart");
            return;
        }
    });
}