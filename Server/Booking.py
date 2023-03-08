import Backend;
import Users;
import Tools;


class Booking(Backend.db.Model):
    id = Backend.db.Column(Backend.db.Integer, primary_key=True)
    user_id = Backend.db.Column(Backend.db.Integer, Backend.db.ForeignKey(Users.User.id))
    tool_id = Backend.db.Column(Backend.db.Integer, Backend.db.ForeignKey(Tools.Tool.id))
    hour = Backend.db.Column(Backend.db.Integer, nullable = False)
    day = Backend.db.Column(Backend.db.Integer, nullable = False)
    year = Backend.db.Column(Backend.db.Integer, nullable = False)


    def serialize(self):
        return dict(
            id=self.id,
            user_id=self.user_id,
            tool_id=self.tool_id,
            hour=self.hour,
            day=self.day,
            year=self.year
        )

    # Denna funktion ska kallas på i approuten /Tools/<int:input_id>/booked. 
    # Tanken är att använda User id som identity när token skapas (går ju lätt att ändra om vi vill använda något annat som identity)
    def book_tool(tool_id, hour, day, year):
        current_user = Backend.get_jwt_identity()
        new_booking = Booking(user_id = current_user, tool_id = tool_id, hour = hour, day = day, year = year)
        Backend.db.session.add(new_booking)
        Backend.db.session.commit()

        return "Booking successful"

    # Funktionen tar in User id, tar alla bokningar som hör till den användaren och lägger de i en lista. 
    def user_bookings(user_id):
        all_bookings = Booking.query.all()
        bookings_list = []

        for b in all_bookings:
            if (b.user_id == user_id):
                bookings_list.append(Booking.serialize(b))
                
        return Backend.jsonify(bookings_list);

    # Funktionen tar in tool id, tar alla bokningar som hör till det verktyget och lägger de i en lista. 
    def tool_bookings(tool_id):
        all_bookings = Booking.query.all()
        bookings_list = []

        for b in all_bookings:
            if (b.tool_id == tool_id):
                bookings_list.append(Booking.serialize(b))
                
        return Backend.jsonify(bookings_list);

    # Kallas på i user/int/mytools method = delete. Tar in tool id, kontrollerar user via token identity och tar bort bokningen. 
    def cancel_booking(tool_id):
        current_user = Backend.get_jwt_token()
        all_bookings = Booking.query.all()

        for b in all_bookings:
            if (b.tool_id == tool_id):
                if (b.user_id == current_user):
                    Backend.db.session.delete(b)
                    Backend.db.session.commit()
        
        return "Booking cancelled"


    # Ska vi behandla varje timme som en separat bokning eller lägga in en start- och stopptimme?
    def edit_booking(tool_id):
        return