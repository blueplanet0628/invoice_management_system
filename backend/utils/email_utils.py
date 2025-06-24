import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()


def send_reset_email(to_email: str, token: str):
    print(to_email,"to email")
    reset_link = f"http://192.168.131.55:3000/reset-password?token={token}"
    print(reset_link, "reset link")
    msg = MIMEText("Test email from local FastAPI project")
    msg['Subject'] = 'Test Email'
    msg['From'] = os.getenv("EMAIL_USER")
    msg['To'] = to_email
    print(msg,'message')

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(os.getenv("EMAIL_USER"), os.getenv("EMAIL_PASSWORD"))
            server.send_message(msg)
        print("✔️ Email sent successfully!")
    except Exception as e:
        print("❌ Failed to send email:", str(e))