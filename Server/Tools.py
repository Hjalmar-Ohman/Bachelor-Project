from flask import jsonify


def tools():
    tools = []
    # for i in db.tools:
    #   tools.add(db.Tools.serialize)
    return jsonify(tools)


def toolInfo():
    return jsonify("verktyget. get by key(toolID).seralize")


def toolBookings():
    return jsonify("Verktygs bokningar")
