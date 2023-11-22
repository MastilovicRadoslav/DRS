import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def posalji_email(subject, body, to_email):
    gmail_user = "drsprojekat2023@gmail.com"
    gmail_password = "xrnu nktr zprh vvqk"

    message = MIMEMultipart()
    message['From'] = gmail_user
    message['To'] = to_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(gmail_user, gmail_password)
        server.sendmail(gmail_user, to_email, message.as_string())

    print("Email je uspešno poslat !")