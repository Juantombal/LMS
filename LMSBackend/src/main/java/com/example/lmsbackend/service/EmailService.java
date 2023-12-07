package com.example.lmsbackend.service;

import com.example.lmsbackend.entity.UserEntity;
import com.example.lmsbackend.enums.Role;
import com.example.lmsbackend.exception.ReadTemplateException;
import com.example.lmsbackend.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@Transactional
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TemplateEngine templateEngine;

    @Async
    public void sendEmailToUsers(String userRole, UserEntity user) throws ReadTemplateException, MessagingException {
        Role role = Role.valueOf(userRole);

        List<UserEntity> usersToSendEmail = userRepository.findByRole(role);

        List<String> emailAddresses = usersToSendEmail.stream()
                .map(UserEntity::getEmail)
                .collect(Collectors.toList());

        MimeMessage mimeMessage = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        Context thymeleafContext = new Context();
        thymeleafContext.setVariable("role", userRole);
        thymeleafContext.setVariable("user", user);

        String emailContent = templateEngine.process("Application", thymeleafContext);
        helper.setText(emailContent, true);

        helper.setTo(emailAddresses.toArray(new String[0]));
        helper.setSubject("Nieuwe aanvraag LMS");
        helper.setFrom("torelinsania725@gmail.com");
        emailSender.send(mimeMessage);
    }
}
