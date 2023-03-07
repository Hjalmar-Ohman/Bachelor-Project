from flask import Blueprint, abort, jsonify
from jinja2 import TemplateNotFound


toolApp = Blueprint("toolApp", __name__)


@toolApp.route("/Tools")
def Tools():
    try:
        return jsonify("JOELS FUNKTION")
    except TemplateNotFound:
        abort(404)


@toolApp.route("/Tools/<int:input_id>", methods=["POST"])
def ToolInfo():
    return


@toolApp.route("/Tools/<int:input_id>/booked", methods=["POST"])
def BookTool():
    return
