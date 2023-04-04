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

function stripe_checkout(tool_id, day, week, start_h, finnish_h){

    user_id = sessionStorage.getItem('user_id')
    console.log(sessionStorage.getItem('user_id'))

    quantity = finnish_h - start_h

    if (start_h < 10){
        start_h_str = start_h.toString()
        start_h_str = "0" + start_h
    }

    if(finnish_h < 10){
        finnish_h_str = finnish_h.toString()
        finnish_h_str = "0" + finnish_h

    }

    if(week < 10){
        week_str = week.toString()
        week_str = "0" + week_str
    }


    $.ajax({
        type: "POST",
        url: host + "/test/checkout",
        dataType: "json",
        contentType: "application/json",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth')},
        data: JSON.stringify({
            

            "user_id" : user_id,
            "quantity": quantity,
            "day": day,
            "week": week,
            "start_h": start_h_str,
            "finnish_h": finnish_h_str,
            "tool_id": tool_id,
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