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
            weight=request.get_json()["weight"],
            size=request.get_json()["size"],
        )

        db.session.add(new_tool)
        db.session.commit()
        return "Added new tool."


def search_tool(Tool, db, keyword):
    if request.method == "GET":
        list = []
        for tool in Tool.query.filter(Tool.name.contains(keyword)).all():
            list.append(tool.seralize())
        return jsonify(list)


def tool(Tool, db, toolID):
    if request.method == "PUT":
        tool_tmp = Tool.query.filter_by(id=toolID).first_or_404()

        if "price" in request.get_json():
            setattr(tool_tmp, "price", request.get_json()["price"])

        if "name" in request.get_json():
            setattr(tool_tmp, "name", request.get_json()["name"])

        if "weight" in request.get_json():
            setattr(tool_tmp, "weight", request.get_json()["weight"])

        if "size" in request.get_json():
            setattr(tool_tmp, "size", request.get_json()["size"])

        db.session.commit()
        return "Tool changed." + str(Tool.query.filter_by(id=toolID).first_or_404())

    elif request.method == "GET":
        return jsonify(Tool.query.filter_by(id=toolID).first_or_404().seralize())
    elif request.method == "DELETE":
        tool_tmp = Tool.query.filter_by(id=toolID).first_or_404()
        db.session.delete(tool_tmp)
        db.session.commit()
        return "tool deleted"


def tool_book(toolID):
    if request.method == "GET":
        return tool_bookings(toolID)
    elif request.method == "POST":
        return book_tool(toolID, 1, 1, 1, 1)  # TODO: ta in datan från json front end
    elif request.method == "DELETE":
        return  # delete_tool_bookings()
