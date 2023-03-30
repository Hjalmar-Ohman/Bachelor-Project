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

    def __repr__(self):
        return "<Tool {}: {} {} {} {}".format(
            self.id, self.price, self.name, self.properties, self.description
        )

    def seralize(self):
        return dict(
            id=self.id,
            price=self.price,
            name=self.name,
            properties=self.properties,
            description=self.description,
        )


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    password_hash = db.Column(db.String, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode("utf8")

    def __repr__(self):
        return "<User {}: {} {} {}".format(self.id, self.fname, self.lname, self.email)

    def seralize(self):
        return dict(id=self.id, fname=self.fname, lname=self.lname, email=self.email)


class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    tool_id = db.Column(db.Integer, db.ForeignKey(Tool.id))
    hour = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    tool_id = db.Column(db.Integer, db.ForeignKey(Tool.id))
    hour = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return dict(tool_id=self.tool_id, hour=self.hour, day=self.day, year=self.year)


@app.route("/")
def client():
    return app.send_static_file("Client.html")


@app.route("/signup", methods=["POST"])
def signUp2():
    return signUp(db, User, mail)


@app.route("/login", methods=["POST"])
def login2():
    return login(db, bcrypt, User)


# till för backend testning
@app.route("/TestEmail", methods=["GET"])
def test_email():
    send_mail(mail) 
    return "sent"


@app.route("/Tools/<int:input_id>/Checkout", methods=["POST"])
def checkout(input_id):
    return

@app.route("/payment_web_hook", methods = ["POST"])
def payment_hook():
    return web_hook()

@app.route("/get_stripe_key")
def get_key():
    return jsonify(PUBLIC_STRIPE_KEY)


# till för backend testning
@app.route("/test/checkout", methods=["POST"])
def test_checkout():
   


   return process_payment(request.get_json()["price"], request.get_json()["quantity"], request.get_json()["day"], request.get_json()["week"], request.get_json()["start_h"], request.get_json()["finnish_h"], )

#till för backend testning
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
@jwt_required()
def toolBook2(input_id):
    toolID = input_id
    return tool_book(toolID)


@app.route("/user/delete", methods=["DELETE"])
def delete_user2():
    return delete_user(db, User)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
