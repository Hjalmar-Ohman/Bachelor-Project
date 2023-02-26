from flask import Flask, jsonify, abort, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)

@app.route('/start')
def start():
        return jsonify("Seems to be working just 'bout fine")

if __name__ == "__main__":
        app.run(port=5000)