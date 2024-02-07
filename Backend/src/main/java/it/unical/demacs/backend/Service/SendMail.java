package it.unical.demacs.backend.Service;

import it.unical.demacs.backend.Persistence.DatabaseHandler;
import lombok.Getter;
import lombok.Setter;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Getter
@Setter
public class SendMail {
    private static SendMail instance = null;

    private SendMail() {
    }

    public static SendMail getInstance() {
        if (instance == null) {
            instance = new SendMail();
        }
        return instance;
    }

    public void sendEmail(String requestTitle, String requestMotivation, String destinationEmail) {
        final String username = "magazzino.unical@libero.it";
        final String password = "Web.app2024";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.libero.it");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(destinationEmail));
            message.setSubject(requestTitle);
            message.setText(requestMotivation);

            Transport.send(message);

            System.out.println("Email inviata con successo!");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
}
