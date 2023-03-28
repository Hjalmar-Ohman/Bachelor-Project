host = window.location.protocol + '//' + location.host
var stripe

function viewBuy() {
    $(".container").html($("#view-buy").html());
}

function viewSuccess() {
    $(".container").html($("#view-success").html());
}

function get_stripe_public_key(){

    $.ajax({
        type: "GET",
        url: host + "/get_stripe_key",
        dataType: "json",
        contentType: "application/json",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth')},
        success: function (key) {
            
            stripe = Stripe(key) 
            stripe_ceckout()            

        },
        error: function () {
            alert("error1")
            
        }
    });


}

function stripe_ceckout(){

    $.ajax({
        type: "GET",
        url: host + "/test/checkout",
        dataType: "json",
        contentType: "application/json",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth')},
        success: function (data) {
            
            return stripe.redirectToCheckout({session_id: data.session_id})           

        },
        error: function () {
            alert("error2")
            
        }
    });

}

$(document).ready(function () {

    viewBuy()

})