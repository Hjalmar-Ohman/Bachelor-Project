from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
)
from flask import Flask, jsonify

# Denna funktion ska kallas på i approuten /Tools/<int:input_id>/booked.
# Tanken är att använda User id som identity när token skapas (går ju lätt att ändra om vi vill använda något annat som identity)
def book_tool(db, booking, user, tool_id, start_hour, end_hour, day, year):
    current_user_email = get_jwt_identity()
    current_user = user.query.filter_by(email=current_user_email).first()

    new_booking = booking(
        user_id=current_user.id, tool_id=tool_id, start_hour=start_hour, end_hour=end_hour, day=day, year=year
    )
    db.session.add(new_booking)
    db.session.commit()

    return "Booking successful"


# Funktionen tar in User id, tar alla bokningar som hör till den användaren och lägger de i en lista.
def user_bookings(user_id, booking):
    all_bookings = booking.query.all()
    bookings_list = []

    for b in all_bookings:
        if b.user_id == user_id:
            bookings_list.append(booking.serialize(b))

    return jsonify(bookings_list)


# Funktionen tar in tool id, tar alla bokningar som hör till det verktyget och lägger de i en lista.
def tool_bookings(tool_id, booking):
    all_bookings = booking.query.all()
    bookings_list = []

    for b in all_bookings:
        if b.tool_id == tool_id:
            bookings_list.append(booking.serialize(b))

    return jsonify(bookings_list)


# Kallas på i user/int/mytools method = delete. Tar in tool id, kontrollerar user via token identity och tar bort bokningen.
def cancel_booking(db, booking, user, tool_id):
    current_user_email = get_jwt_identity()
    current_user = user.query.filter_by(email=current_user_email).first()
    all_bookings = booking.query.all()

    for b in all_bookings:
        if b.tool_id == tool_id:
            if b.user_id == current_user.id:
                db.session.delete(b)
                db.session.commit()

    return "Booking cancelled"


def edit_booking(db, booking, user, tool_id, start_hour, end_hour):
    current_user_email = get_jwt_identity()
    current_user = user.query.filter_by(email=current_user_email).first()
    all_bookings = booking.query.all()

    for b in all_bookings:
        if b.tool_id == tool_id:
            if b.user_id == current_user.id:
                booking.query.get(b.id).start_hour = start_hour
                booking.query.get(b.id).end_hour = end_hour
                db.session.commit()
                return "Booking edited"
    return "Booking not found"
    
