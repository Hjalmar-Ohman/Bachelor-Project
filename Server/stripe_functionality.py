from flask import Flask, jsonify, abort, request, redirect
import stripe


SECRET_STRIPE_KEY = "sk_test_51MqGmBBclQZfILgurtsdH1mAsihvmHs51eWmFzBNoqGKE4dGYOPLSQ7BTcKrr9Idy4Mg28Lj8snGjuPpC1oDlMoR00mxgzAKTG"
PUBLIC_STRIPE_KEY = "pk_test_51MqGmBBclQZfILguPT3YglTQxsjnR9gUMF7SgTvW6x0gI8igELaA4c98TwuRZW8Jc6PfdBlsT8LkO3JQzD9vuVj900JUCerBUb"

stripe.api_key = SECRET_STRIPE_KEY

def process_payment(price, quantity, day, week, start_h, finnish_h):
   
    success = False
    if request.method == "POST":
        data = request.get_json()
    try:
        session = stripe.checkout.Session.create(
         line_items=[{
      'price_data': {
        'currency': 'sek',
        'product_data': {
          'name': 'Bookning:'+'+'+ day +'+'+ week +'+'+ start_h +'+' + finnish_h,
        },
        'unit_amount': price,
      },
      'quantity': quantity,
    }],
    mode='payment',
    success_url='http://localhost:5000/test/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url='http://localhost:5000/test/checkout/cancel',
    )
        print(session['id'])

 

    except Exception as e:
        return str(e)
    
    return jsonify({"session_id": session["id"]})

def web_hook():
    print("Web_hook is called")
    payload = request.get_data()
    sig_header = request.environ.get('HTTP_STRIPE_SIGNATURE')
    endpoint_secret = "whsec_328c4c96086acd8e809e0a6557c93419bb3610d12ceeb1949be08d674d487da7"
    event = None       

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
    # Error om payload innehåller fel typer
        print("invalid payload")
        return {}, 400
    except stripe.error.SignatureVerificationError as e:
        print("invalid signature")
        return {}, 400

    # hämtar "check_out eventet",
    if event['type'] == 'checkout.session.completed':
        session = stripe.checkout.Session.retrieve(
        event['data']['object']['id']
        )
        line_items = stripe.checkout.Session.list_line_items(session['id'], limit=1)
        print(line_items['data'][0]['description'])
    
    return {}, 200



