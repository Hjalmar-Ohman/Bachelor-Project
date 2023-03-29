from flask import Flask, render_template
from flask_mail import Mail, Message
#from Backend import app





with open('Test_email.html', 'r') as f:
    html_string = f.read()

with open('SignUpEmailTemplate.html', 'r') as f:
    SignUpEmailTemplate = f.read()






def print_email_creds(): #legacy, behöver ta med app
   # print(app.config['MAIL_USERNAME'])
    #print(app.config['MAIL_PASSWORD'])
    return

def send_mail(mail):
    email = Message("Test email", sender = "test.toolinabox.test@gmail.com", recipients = ['test.toolinabox.test@gmail.com'])
    email.body = "Fungerar det??"
    print(html_string)
    email.html = html_string
    #email.html = "<html> <body> <div><h1>Thank you for regestring an account with us</h1> </div></body> </html>"
    mail.send(email)
    return "sent"

def sign_up_mail(mail, user):
    email = Message("Konto registrerat", sender = "test.toolinabox.test@gmail.com", recipients = [user.email])
    mail.body = "test"
    email.html = SignUpEmailTemplate
    mail.send(email)
    return "sent"

def booking_mail(mail, user):
    return


def forgot_password_mail(mail, user):
    return

