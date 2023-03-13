from flask import Flask, jsonify, abort, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from Users import *
from Config import *
from Tool import *
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)


app = Flask(__name__)
app.config.from_pyfile("Config.py")

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)





class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    pictureURL = db.Column(db.String, nullable=True)  # ANVÄNDS ALDRIG

    def __repr__(self):
        return "<Tool {}: {} {} {}".format(
            self.id, self.price, self.name, self.pictureURL
        )

    def seralize(self):
        return dict(
            id=self.id,
            price=self.price,
            name=self.name,
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
    hour = db.Column(db.Integer, nullable = False)
    day = db.Column(db.Integer, nullable = False)
    year = db.Column(db.Integer, nullable = False)

    user_id = db.Column(
        db.Integer, db.ForeignKey(User.id)
    )
    tool_id = db.Column(
        db.Integer, db.ForeignKey(Tool.id)
    )
    hour = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    year = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return dict(
            tool_id=self.tool_id,
            hour=self.hour,
            day=self.day,
            year=self.year
        )

app.add_url_rule("/test", "test", test)


@app.route("/signup", methods=["POST"])
def signUp2():
    return signUp(db, User)


@app.route("/login", methods=["POST"])
def login2():
    return login(db, bcrypt, User)


@app.route("/start")
def start():
    return jsonify("Seems to be working just 'bout fine")


@app.route("/tools", methods=["GET", "POST"])
def tools2():
    return tools(Tool, db)


@app.route("/tools/<int:input_id>", methods=["GET", "PUT"])
def tool2(input_id):
    toolID = input_id
    return tool(Tool, db, toolID)


@app.route("/tools/<int:input_id>/book", methods=["GET", "POST"])
def toolBook2(input_id):
    toolID = input_id
    return toolBook(toolID)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
