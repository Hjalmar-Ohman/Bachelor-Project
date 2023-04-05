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
    var finnish_h_str
    var start_h_str
    var day_str

    user_id = sessionStorage.getItem('user_id')
    console.log(sessionStorage.getItem('user_id'))

    quantity = finnish_h - start_h
    quantity_str = quantity.toString()

    if (start_h < 10){
        start_h_str = start_h.toString()
        start_h_str = "0" + start_h
    } else {
        start_h_str = start_h.toString()
    }

    if(finnish_h < 10){
        finnish_h_str = finnish_h.toString()
        finnish_h_str = "0" + finnish_h

    }else{
        finnish_h_str = finnish_h.toString()
    }

    if(week < 10){
        week_str = week.toString()
        week_str = "0" + week_str
    }else{
        week_str = week.toString()

    }

    expression = day
    switch (expression) {
        case 1:
            day_str = "mon"
        case 2:
            day_str = "tue"
        case 3:
            day_str = "wen"
        case 4:
            day_str = "thu"
        case 5:
            day_str = "fri"
        case 6:
            day_str = "sat"
        case 7:
            day_str = "sun"
        default:
          console.log("felaktigt värde på day")
      }


    console.log(week_str)
    console.log(start_h_str)
    console.log(finnish_h_str)
    console.log(user_id)
    console.log(tool_id)
    console.log(day)

    $.ajax({
        type: "POST",
        url: host + "/test/checkout",
        dataType: "json",
        contentType: "application/json",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem('auth')},
        data: JSON.stringify({
            

            "user_id" : user_id,
            "quantity": "1",
            "day": day_str,
            "week": week_str,
            "start_h": start_h_str,
            "finnish_h": finnish_h_str,
            "tool_id": tool_id.toString(),
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