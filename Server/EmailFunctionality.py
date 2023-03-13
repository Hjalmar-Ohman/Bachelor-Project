from flask import Flask
from flask_mail import Mail, Message
from Backend import app





def print_email_creds():
    print(app.config['MAIL_USERNAME'])
    print(app.config['MAIL_PASSWORD'])
    return

def send_mail(mail):
    email = Message("Test email", sender = "test.toolinabox.test@gmail.com", recipients = ['test.toolinabox.test@gmail.com'])
    email.body = "Fungerar det??"
    mail.send(email)
    return "sent"

