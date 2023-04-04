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

function stripe_ceckout(tool_id, day, week, start_h, finnish_h){

    user_id = sessionStorage.getItem('user_id')
    console.log(sessionStorage.getItem('user_id'))
    $.ajax({
        type: "POST",
        url: host + "/test/checkout",
        dataType: "json",
        contentType: "application/json",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth')},
        data: JSON.stringify({
            
            "user_id" : user_id,
            "quantity": "1",
            "day": "mon",
            "week": "03",
            "start_h": "16",
            "finnish_h": "17",
            "tool_id": "1",
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

    get_stripe_public_key()

})