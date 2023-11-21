package com.example.lmsbackend.service;

import com.example.lmsbackend.entity.UserEntity;
import com.example.lmsbackend.enums.Role;
import com.example.lmsbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UserRepository userRepository;

    public void sendEmailToUsers(String userRole, UserEntity user) {
        Role role = Role.valueOf(userRole);

        List<UserEntity> usersToSendEmail = userRepository.findByRole(role);

        List<String> emailAddresses = usersToSendEmail.stream()
                .map(UserEntity::getEmail)
                .collect(Collectors.toList());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailAddresses.toArray(new String[0]));
        message.setSubject("LMS - Nieuwe aanvraag");
        message.setText("Beste " + userRole.toLowerCase() + ", er staat een nieuwe aanvraag klaar ter beoordeling van medewerker: "
                + user.getName() + ".\nKlik op de volgende link om de aanvraag te bekijken: http://localhost:4200/application");

        emailSender.send(message);
    }
}
