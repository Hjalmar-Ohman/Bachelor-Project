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
                   

        },
        error: function () {
            alert("error1")
            
        }
    });


}

function stripe_ceckout(){

    $.ajax({
        type: "PUT",
        url: host + "/test/checkout",
        dataType: "json",
        contentType: "application/json",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth')},
        data: JSON.stringify({
            
            "price": "1200",
            "quantity": "7"
        }),
        success: function (data) {
           
            console.log(data.session_id)
            return stripe.redirectToCheckout({sessionId: data.session_id})           

        },
        error: function () {
            console.log("error2")  
            //return stripe.redirectToCheckout({session_id: data.session_id}) 
            
        }
    });

}

$(document).ready(function () {

    viewBuy()
    get_stripe_public_key()

})