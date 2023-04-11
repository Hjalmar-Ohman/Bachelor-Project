from flask import Flask, jsonify, abort, request, redirect, send_from_directory
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from Users import *
from Config import *
from Tool import *
from stripe_functionality import *
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

# Notera:
# alla app-routs som innehåller /test/ någonstans i url:n är
# endast till för testning av backend och implementationen av funktionalitet


app = Flask(__name__, static_folder="../Client", static_url_path="/")
mail = Mail(app)
app.config.from_pyfile("Config.py")

# app.config['MAIL_SERVER']="smtp.gmail.com"
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USERNAME'] = "test.toolinabox.test@gmail.com"
# app.config['MAIL_PASSWORD'] = "bpnqqfohzzgeacxi"
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True

mail = Mail(app)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    properties = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)

    def __repr__(self):
        return "<Tool {}: {} {} {} {}".format(
            self.id,
            self.price,
            self.name,
            self.properties,
            self.description,
            self.image,
        )

    def seralize(self):
        return dict(
            id=self.id,
            price=self.price,
            name=self.name,
            properties=self.properties,
            description=self.description,
            image=self.image,
        )


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode("utf8")

    def __repr__(self):
        return "<User {}: {} {}".format(self.id, self.name, self.email)

    def seralize(self):
        return dict(id=self.id, name=self.name, email=self.email)


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    tool_id = db.Column(db.Integer, db.ForeignKey(Tool.id))
    start_hour = db.Column(db.Integer, nullable=False)
    end_hour = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    week = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return "<Booking {}: {} {} {} {} {} {}".format(
            self.id,
            self.user_id,
            self.tool_id,
            self.start_hour,
            self.end_hour,
            self.day,
            self.week,
        )

    def serialize(self):
        return dict(
            id=self.id,
            tool_id=self.tool_id,
            start_hour=self.start_hour,
            end_hour=self.end_hour,
            day=self.day,
            week=self.week,
        )


@app.route("/")
def client():
    return app.send_static_file("client.html")


@app.route("/signup", methods=["POST"])
def signUp2():

    return signUp(db, User, mail)


@app.route("/login", methods=["POST"])
def login2():

    inputemail = request.get_json()["email"]
    password = request.get_json()["password"]

    return login(db, bcrypt, User, inputemail, password)


# till för backend testning
@app.route("/TestEmail", methods=["GET"])
def test_email():
    send_mail(mail)
    return "sent"


@app.route("/Tools/<int:input_id>/Checkout", methods=["POST"])
def checkout(input_id):
    return


@app.route("/payment_web_hook", methods=["POST"])
def payment_hook():
    print("Web_hook is called")
    payload = request.get_data()
    sig_header = request.environ.get("HTTP_STRIPE_SIGNATURE")
    endpoint_secret = (
        "whsec_328c4c96086acd8e809e0a6557c93419bb3610d12ceeb1949be08d674d487da7"
    )
    event = None

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        # Error om payload innehåller fel typer
        print("invalid payload")
        return {}, 400
    except stripe.error.SignatureVerificationError as e:
        print("invalid signature")
        return {}, 400

    # hämtar "check_out eventet",
    if event["type"] == "checkout.session.completed":
        session = stripe.checkout.Session.retrieve(event["data"]["object"]["id"])
        line_items = stripe.checkout.Session.list_line_items(session["id"], limit=1)
        print(line_items["data"][0]["description"])
        print(session["metadata"])

        user_id = session["metadata"]["user_id"]
        day = session["metadata"]["user_id"]
        week = session["metadata"]["week"]
        start_hour = session["metadata"]["start_h"]
        end_hour = session["metadata"]["finnish_h"]
        tool_id = session["metadata"]["tool_id"]

      


        print(line_items["data"][0]["description"])
      #  print(line_items["data"][0]["metadata"])
        #print("day: " + day)
        #print("week: " + week)
        #print("start_hour: " + start_hour)
        #print("end_hour: " + end_hour)
        #print("user_id: " + user_id)
        #print("tool_id: " + tool_id)

        book_tool_by_ids(
            db, Booking, User, user_id, tool_id, start_hour, end_hour, day, week
        )

        booking_mail(mail, User.query.filter_by(id=int(user_id)).first_or_404())

    return {}, 200


@app.route("/get_stripe_key")
def get_key():
    return jsonify(PUBLIC_STRIPE_KEY)


# till för backend testning
@app.route("/test/checkout", methods=["POST"])
def test_checkout():

    # user_email = get_jwt_identity()
    # price
    quantity = request.get_json()["quantity"]
    day = request.get_json()["day"]
    week = request.get_json()["week"]
    start_h = request.get_json()["start_h"]
    finnish_h = request.get_json()["finnish_h"]
    tool_id = request.get_json()["tool_id"]
    user_id = request.get_json()["user_id"]

    # user_id = User.query.filter_by(email=user_email).first_or_404()

    tool_temp = Tool.query.filter_by(id=int(tool_id)).first_or_404()
    price = tool_temp.price * 100

    return process_payment(
        str(price), quantity, day, week, start_h, finnish_h, tool_id, user_id
    )


# till för backend testning
@app.route("/test/checkout/success", methods=["GET"])
def checkout_success():
    return "Tack för ditt köp"


# till för backend testning
@app.route("/test/checkout/cancel", methods=["GET"])
def checkout_failed():
    return "köp misslyckades"


@app.route("/start")
def start():

    return jsonify("Seems to be working just 'bout fine")


@app.route("/tools", methods=["GET", "POST"])
def tools2():
    return tools(Tool, db)


# Exempelvis http://localhost:5000/tools/search?keyword=Hammer
@app.route("/tools/search", methods=["GET"])
def search_tool2():
    keyword = request.args.get("keyword")
    return search_tool(Tool, db, keyword)


@app.route("/tools/<int:input_id>", methods=["GET", "PUT", "DELETE"])
def tool2(input_id):
    toolID = input_id
    return tool(Tool, db, toolID)


@app.route("/tools/<int:input_id>/book", methods=["GET", "POST"])
#@jwt_required()
def toolBook2(input_id):
    toolID = input_id
    return tool_book(toolID, Booking)


@app.route("/user/delete", methods=["DELETE"])
def delete_user2():
    return delete_user(db, User)

@app.route("/user/get/<int:input_id>", methods=["GET"])
def get_user2(input_id):
    userID = input_id
    return get_user(db, User, userID)

@app.route("/user/edit/<int:input_id>", methods=["PUT"])
def edit_user2(input_id):
    userID = input_id
    return edit_user(db, User, userID)

@app.route("/user/<int:input_id>/book", methods=["GET", "POST"])
# @jwt_required()
def userBook2(input_id):
    userID = input_id
    return user_book(userID, Booking)


@app.route("/book/<int:input_id>", methods=["DELETE"])
# @jwt_required()
def delete_booking2(input_id):
    bookingID = input_id
    return delete_booking(db, Booking, bookingID)


# tillfällig lösning
def book_tool_redirect(
    day, week, start_h, finnish_h, tool_id, user_id
):  # Används till book_tool är klar

    # book_tool(db, Booking, User, tool_id, start_h, finnish_h, day, 1)

    return


if __name__ == "__main__":
    app.run(port=5000, debug=True)
