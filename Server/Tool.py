from flask import jsonify, request
from Booking import *


def tools():
    tools = []
    # for i in db.tools:
    #   tools.add(db.Tools.serialize)
    return jsonify(tools)


def tool():
    if request.method == "POST":
        book_tool(1, 2, 3, 4)
    return


def toolBookings():
    return jsonify("Verktygs bokningar")
