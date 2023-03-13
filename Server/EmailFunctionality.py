from flask import Flask
from flask_mail import Mail, Message

mailapp = Flask(__name__)
mail= Mail(mailapp)

mailapp.config['MAIL_SERVER']='smtp.gmail.com'
mailapp.config['MAIL_PORT'] = 465
mailapp.config['MAIL_USERNAME'] = 'test.toolinabox.test@gmail.com'
mailapp.config['MAIL_PASSWORD'] = 'Toolinabox@'
mailapp.config['MAIL_USE_TLS'] = False
mailapp.config['MAIL_USE_SSL'] = True


def send_mail():
    email = Message("Test email", sender = "test.toolinabox.test@gmail.com", recipients = ['test.toolinabox.test@gmail.com'])
    email.body = "Fungerar det??"
    mail.send(email)
    return "sent"

