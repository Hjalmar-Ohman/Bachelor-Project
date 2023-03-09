from flask import jsonify, request
from Booking import *


def tools(Tool, db):
    if request.method == "GET":
        list = []
        for tool in Tool.query.all():
            list.append(tool.seralize())
        return jsonify(list)

    elif request.method == "POST":
        new_tool = Tool(
            price=request.get_json()["price"],
            name=request.get_json()["name"],
        )

        db.session.add(new_tool)
        db.session.commit()
        return "Added new tool."


def tool(Tool, db, toolID):
    if request.method == "PUT":
        tool_tmp = Tool.query.filter_by(id=toolID).first_or_404()

        if "price" in request.get_json():
            setattr(tool_tmp, "price", request.get_json()["price"])

        if "name" in request.get_json():
            setattr(tool_tmp, "name", request.get_json()["name"])

        if "pictureURL" in request.get_json():
            setattr(tool_tmp, "pictureURL", request.get_json()["pictureURL"])
        db.session.commit()
        return "Tool changed." + str(Tool.query.filter_by(id=toolID).first_or_404())

    elif request.method == "GET":
        return jsonify(Tool.query.filter_by(id=toolID).first_or_404().seralize())


def toolBook(toolID):
    if request.method == "GET":
        return tool_bookings(toolID)
    elif request.method == "POST":
        book_tool(toolID, hour, day, year)
