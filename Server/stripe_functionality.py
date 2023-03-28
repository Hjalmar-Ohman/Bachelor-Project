from flask import Flask, jsonify, abort, request, redirect
import stripe

def process_payment(Card_number, date, cvc, price, quantity):
    price_str = str(price) #gör price till en string (pga JSON format)
    quantity_str = str(quantity)
    success = False
    if request.method == "POST":
        data = request.get_json()
    try:
        session = stripe.checkout.Session.create(
            item = [
            
            {
                "price" : price_str,
                "quantity" : quantity_str
            }

            ],

            mode = "",
            success = True
        )
    except Exception as e:
        return str(e)
    
    return success