from flask import Flask, jsonify, abort, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)

from Tools import toolApp

app = Flask(__name__)
app.register_blueprint(toolApp)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "Super_secret_key"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    is_admin = db.Column(db.Boolean, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode("utf8")

    def __repr__(self):
        return "<User {}: {} {} {}".format(
            self.id, self.name, self.email, self.is_admin
        )

    def seralize(self):
        return dict(
            id=self.id, name=self.name, email=self.email, is_admin=self.is_admin
        )


class Tool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)

    def __repr__(self):
        return "<Tool {}: {} {} {}".format(self.id, self.price, self.name)

    def seralize(self):
        return dict(
            id=self.id,
            price=self.price,
            name=self.name,
        )


@app.route("/start")
def start():
    return jsonify("Seems to be working just 'bout fine")


@app.route("/sign-up", methods=["POST"])
def signUp():
    return


@app.route("/login", methods=["POST"])
def logIn():
    return


if __name__ == "__main__":
    app.run(port=5000, debug=True)
