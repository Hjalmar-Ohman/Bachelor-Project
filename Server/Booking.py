import Backend
import Users
import Tools





# Denna funktion ska kallas på i approuten /Tools/<int:input_id>/booked.
# Tanken är att använda User id som identity när token skapas (går ju lätt att ändra om vi vill använda något annat som identity)
def book_tool(db, tool_id, hour, day, year):
    current_user = Backend.get_jwt_identity()
    new_booking = Backend.Booking(
        user_id=current_user, tool_id=tool_id, hour=hour, day=day, year=year
    )
    db.session.add(new_booking)
    db.session.commit()

    return "Booking successful"


# Funktionen tar in User id, tar alla bokningar som hör till den användaren och lägger de i en lista.
def user_bookings(user_id):
    all_bookings = Backend.Booking.query.all()
    bookings_list = []

    for b in all_bookings:
        if b.user_id == user_id:
            bookings_list.append(Backend.Booking.serialize(b))

    return Backend.jsonify(bookings_list)


# Funktionen tar in tool id, tar alla bokningar som hör till det verktyget och lägger de i en lista.
def tool_bookings(tool_id):
    all_bookings = Backend.Booking.query.all()
    bookings_list = []

    for b in all_bookings:
        if b.tool_id == tool_id:
            bookings_list.append(Backend.Booking.serialize(b))

    return Backend.jsonify(bookings_list)


# Kallas på i user/int/mytools method = delete. Tar in tool id, kontrollerar user via token identity och tar bort bokningen.
def cancel_booking(db, tool_id):
    current_user = Backend.get_jwt_token()
    all_bookings = Backend.Booking.query.all()

    for b in all_bookings:
        if b.tool_id == tool_id:
            if b.user_id == current_user:
                db.session.delete(b)
                db.session.commit()

    return "Booking cancelled"


# Ska vi behandla varje timme som en separat bokning eller lägga in en start- och stopptimme?
def edit_booking(db, tool_id, hour):
    current_user = Backend.get_jwt_token()
    all_bookings = Backend.Booking.query.all()

    for b in all_bookings:
        if b.tool_id == tool_id:
            if b.user_id == current_user:
                Backend.Booking.query.get(b.id).hour = hour
                db.session.commit()
                return "Booking edited"
    return "Booking not found"
    
