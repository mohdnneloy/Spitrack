# Python code to illustrate Sending mail from
# your Gmail account
import smtplib
import smtplib


def emaiNotify(receiver_email, clustername, receiver_name):

    #sender's credentials
    sender_email = "spitrackv1@gmail.com"
    sender_password = "SpTrackV1"
    # "\n is required to separate the message from header"
    message = "\n Hello! " + receiver_name + ", \n Your cluster: '" + clustername + "' has been created. Now, you can perform your searches. "

    # creates SMTP session
    s = smtplib.SMTP('smtp.gmail.com', 587)


    # start TLS for security
    s.starttls()

    # Authentication
    s.login(sender_email, sender_password)

    # message to be sent

    # sending the mail
    s.sendmail("sender_email_id", receiver_email, message)

    # terminating the session
    s.quit()
