package com.example.lmsbackend.service;

import com.example.lmsbackend.entity.UserEntity;
import com.example.lmsbackend.enums.Role;
import com.example.lmsbackend.exception.ReadTemplateException;
import com.example.lmsbackend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.mail.javamail.MimeMessageHelper;

@Service
@Transactional
public class EmailService {
    private String path = "templates/";
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendEmailToUsers(String userRole, UserEntity user) throws ReadTemplateException, MessagingException {
        Role role = Role.valueOf(userRole);

        List<UserEntity> usersToSendEmail = userRepository.findByRole(role);

        List<String> emailAddresses = usersToSendEmail.stream()
                .map(UserEntity::getEmail)
                .collect(Collectors.toList());

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        helper.setText(getEmailContent(getEmailContent("Application.html")), true);
        helper.setTo(emailAddresses.toArray(new String[0]));
        helper.setSubject("Nieuwe aanvraag LMS");
        helper.setFrom("torelinsania725@gmail.com");
        emailSender.send(mimeMessage);
    }


    private String getEmailContent(String fileName) throws ReadTemplateException {
        try {
            String fullPath = new ClassPathResource(this.path + fileName).getFile().getPath();
            return Files.readString(Paths.get(fullPath));
        } catch (IOException e) {
            throw new ReadTemplateException("No template found");
        }
    }

//    private String generateEmailText(String userRole, UserEntity user) {
//        return switch (userRole) {
//            case "FIELDMANAGER" -> "Beste fieldmanager, er staat een nieuwe aanvraag klaar ter beoordeling van medewerker: "
//                    + user.getName() + ".\nKlik op de volgende link om de aanvraag te bekijken: http://localhost:4200/application";
//            case "DIRECTOR" -> "Beste directeur, er staat een nieuwe aanvraag klaar ter beoordeling van medewerker: "
//                    + user.getName() + ".\nKlik op de volgende link om de aanvraag te bekijken: http://localhost:4200/application";
//            case "SECRETERIAT" -> "Beste secreteriaat, er staat een nieuwe aanvraag klaar. Zorg dat alle materialen worden geleverd\nKlik op de volgende link om de aanvraag te bekijken: http://localhost:4200/application";
//            case "EMPLOYEE" -> "Beste " + user.getName() + ", je aanvraag is goedgekeurd en je kan aan de slag met de cursus. Klik op de volgende link om de aanvraag te bekijken: http://localhost:4200/application";
//            default -> "e";
//        };
//    }
}
