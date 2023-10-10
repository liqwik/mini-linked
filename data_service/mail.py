import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email import encoders
import configparser
from dataclasses import dataclass
import logging


@dataclass
class MailConfig:
    host: str
    port: int
    username: str
    password: str


def get_mail_config() -> MailConfig:
    config = configparser.ConfigParser()
    config.read('/App/craw_job/config.properties')
    mail_host = config.get('mail', 'host')
    mail_port = config.getint('mail', 'port')
    mail_user = config.get('mail', 'username')
    mail_password = config.get('mail', 'password')
    return MailConfig(mail_host, mail_port, mail_user, mail_password)


def send_email(receiver, subject, body, file_path):
    config = get_mail_config()
    message = MIMEMultipart()
    message['From'] = config.username
    message['To'] = receiver
    message['Subject'] = subject
    message.attach(MIMEText(body, 'html'))
    attachment = open(file_path, 'rb')
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(attachment.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition',
                    f'attachment; filename={file_path.split("/")[-1]}')
    message.attach(part)
    try:
        # Establish the SMTP connection
        server = smtplib.SMTP(config.host, config.port)
        server.starttls()  # Upgrade the connection to a secure TLS connection
        server.login(config.username, config.password)
        # Send the email
        server.sendmail(config.username, receiver, message.as_string())
        # print('Email sent successfully!')
    except Exception as e:
        # print('Error: Unable to send the email.')
        logging.error("Exception occurred", exc_info=True)

    finally:
        # Close the SMTP connection
        server.quit()


if __name__ == "__main__":
    send_email('engleangs@gmail.com', "Demo",
               "Yes this the test", "./data/attached.txt")
