from flask import Blueprint, abort, jsonify
from jinja2 import TemplateNotFound

import Backend

toolApp = Blueprint("toolApp", __name__)


@toolApp.route("/Tools")
def Tools():
    tools = []
    # for i in db.tools:
    #   tools.add(db.Tools.serialize)
    return jsonify(tools)


@toolApp.route("/Tools/<int:toolID>", methods=["POST"])
def ToolInfo():
    return jsonify("get by key(toolID).seralize")


@toolApp.route("/Tools/<int:input_id>/booked", methods=["POST"])
def BookTool():
    return jsonify("JOELS FUNKTION")
