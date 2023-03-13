from flask import Flask, jsonify, abort, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)


#app.register_blueprint(toolApp)
SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_SECRET_KEY = "Super_secret_key"
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 465
MAIL_USERNAME = "test.toolinabox.test@gmail.com"
MAIL_PASSWORD = "csuidjxfahjlgtpe"
MAIL_USE_TLS = False
MAIL_USE_SSL = True



