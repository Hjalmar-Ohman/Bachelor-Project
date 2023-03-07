import Backend
from flask import Blueprint, render_template, abort, jsonify, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

class User(Backend.db.Model):
    id = Backend.db.Column(Backend.db.Integer, primary_key=True)
    first_name = Backend.db.Column(Backend.db.String, nullable=False)
    last_name = Backend.db.Column(Backend.db.String, nullable=False)
    email = Backend.db.Column(Backend.db.String, nullable=False, unique = True)
    password_hash = Backend.db.Column(Backend.db.String, nullable=False)
    
    def set_password(self, password):
        self.password_hash = Backend.generate_password_hash(password).decode("utf8")

    def __repr__(self):
        return "<User {}: {} {} {}".format(
            self.id, self.name, self.email, self.is_admin
        )

    def seralize(self):
        return dict(
            id=self.id, name=self.name, email=self.email, is_admin=self.is_admin
        )
    
User_page = Blueprint('User_page', __name__)

@User_page.route("/sign-up", methods=["POST"])
def signUp():
     
    if request.method == "POST":
        data = request.get_json()
        email = data.get("email")
        name = data.get("name")
        password = data.get("password")
        

        user = User(email=email, name=name, password_hash="")
        user.set_password(password)
        Backend.db.session.add(user)
        Backend.db.session.commit()

        return "Konto registrerat"

@User_page.route("/login", methods=["POST"])
def login():
    return

@User_page.route("/<int:user_id>/mytools", methods=["GET"])
def myTools():
    return