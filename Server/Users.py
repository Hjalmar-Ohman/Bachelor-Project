from flask import abort, jsonify, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import request

from EmailFunctionality import *
from Booking import *

from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)


def test():
    return "ser ut att fungera"


def signUp(db, User, mail):

    if request.method == "POST":
        data = request.get_json()
        email = data.get("email")
        name = data.get("name")
        password = data.get("password")

        user = User(email=email, name=name, password_hash="")
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        sign_up_mail(mail, user)

        return "Konto registrerat"


def login(db, bcrypt, User, inputemail, password):

    usr_temp = User.query.filter_by(email=inputemail).first_or_404()
    if usr_temp != None:
        print(usr_temp)
    else:
        print(42)

    if (inputemail == usr_temp.email) & (
        bcrypt.check_password_hash(usr_temp.password_hash, password)
    ):

        access_token = create_access_token(identity=inputemail)
        dict = {"token": access_token, "user_id": usr_temp.id}
        print(dict["user_id"])
        return jsonify(dict)
    else:

        return jsonify("fel lösenord eller användarnamn"), 401


def delete_user(db, User):
    if request.method == "DELETE":
        data = request.get_json()
        inputemail = data.get("email")
        db.session.delete(User.query.filter_by(email=inputemail).first_or_404())
        db.session.commit()
        return "user deleted"

def get_user(db, User, usedID):
    if request.method == "GET":
        user = User.query.filter_by(id=usedID).first()
        if user:
            return jsonify(user.seralize())
        else:
            return "User not found"

def edit_user(db, User, userID):
    if request.method == "PUT":
      
        user = User.query.filter_by(id=userID).first()
        if "name" in request.get_json():
            setattr(user, "name", request.get_json()["name"] )

        if "email" in request.get_json():
            setattr(user, "email", request.get_json()["email"] )

        if "password" in request.get_json():
            setattr(user, "password", request.get_json()["password"] )
    
    db.session.commit()

    return "User changed." + str(user)


    

def user_book(userID, Booking):
    if request.method == "GET":
        return user_bookings(userID, Booking)
    elif request.method == "DELETE":
        return  # delete_tool_bookings()


# @User_page.route("/<int:user_id>/mytools", methods=["GET"])
# def myTools():
#   return
