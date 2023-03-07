from flask import Flask, jsonify, abort, request
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_SECRET_KEY'] = "Super_secret_key"
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


    
class Tool(db.Model):
    id = db.Coloumn(db.Integer, primary_key = True)
    price = db.coloumn(db.Integer, nullable = False)
    name = db.Coloumn(db.String, nullable = False)

    def __repr__(self):
        return "<Tool {}: {} {} {}".format(
            self.id, self.price, self.name
        )

    def seralize(self):
        return dict(
            id=self.id, price=self.price, name=self.name,
        )


@app.route('/start')
def start():
        return jsonify("Seems to be working just 'bout fine")

@app.route("/sign-up", methods=["POST"])
def signUp():
     return

@app.route("/login", methods=["POST"])
def signUp():
    return

@app.route("/Tools", methods=["POST"])
def signUp():
    return

@app.route("/<int:user_id>/Tools", methods=["POST"])
def signUp():
    return

@app.route("/Tools/<int:input_id>/book", methods=["POST"])
def signUp():
    return


if __name__ == "__main__":
        app.run(port=5000)