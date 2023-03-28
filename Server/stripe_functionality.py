from flask import Flask, jsonify, abort, request, redirect
import stripe

stripe.api_key = "sk_test_51MqGmBBclQZfILgurtsdH1mAsihvmHs51eWmFzBNoqGKE4dGYOPLSQ7BTcKrr9Idy4Mg28Lj8snGjuPpC1oDlMoR00mxgzAKTG"

def process_payment(price, quantity):
    price_str = str(price) #gör price till en string (pga JSON format)
    quantity_str = str(quantity)
    success = False
    if request.method == "POST":
        data = request.get_json()
    try:
        session = stripe.checkout.Session.create(
         line_items=[{
      'price_data': {
        'currency': 'sek',
        'product_data': {
          'name': 'cool product',
        },
        'unit_amount': price_str,
      },
      'quantity': quantity_str,
    }],
    mode='payment',
    success_url='http://localhost:5000/test/checkout/success',
    cancel_url='http://localhost:5000/test/checkout/cancel',
    )

 

    except Exception as e:
        return str(e)
    
    return redirect(session.url, code=303)