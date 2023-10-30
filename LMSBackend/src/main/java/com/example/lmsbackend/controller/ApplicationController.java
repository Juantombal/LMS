package com.example.lmsbackend.controller;

import com.example.lmsbackend.dto.ApplicationRequestDTO;
import com.example.lmsbackend.entity.*;
import com.example.lmsbackend.repository.ApplicationLineRepository;
import com.example.lmsbackend.repository.ApplicationRepository;
import com.example.lmsbackend.repository.CourseRepository;
import com.example.lmsbackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/application")
@CrossOrigin("*")
public class ApplicationController {
    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    ApplicationLineRepository applicationLineRepository;

    @GetMapping("")
    public List<ApplicationEntity> getAllApplications() {
        return applicationRepository.findAll();
    }

    @GetMapping("/user/{id}")
    public List<ApplicationEntity> getApplicationsByUserId(@PathVariable(value = "id") Long id) {
        return applicationRepository.findByUser_Id(id);
    }

    @GetMapping("/{id}")
    public Optional<ApplicationEntity> getApplicationById(@PathVariable(value = "id") Long id) {
        return applicationRepository.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<ApplicationEntity> createApplication(@RequestBody ApplicationRequestDTO applicationDTO) {

        UserEntity user = userRepository.findById(applicationDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Gebruiker niet gevonden"));

        CourseEntity course = courseRepository.findById(applicationDTO.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Gebruiker niet gevonden"));

        ApplicationEntity newApplication = new ApplicationEntity();

        newApplication.setUser(user);
        newApplication.setCourse(course);
        newApplication.setStartDate(applicationDTO.getStartDate());
        newApplication.setEndDate(applicationDTO.getEndDate());
        newApplication.setSubmissionDate(LocalDate.now());

        newApplication = applicationRepository.save(newApplication);

        ApplicationLineEntity applicationLine = new ApplicationLineEntity();
        applicationLine.setApplication(newApplication);
        applicationLine.setStatus("NEW");
        applicationLine.setComment(applicationDTO.getComment());
        applicationLine.setLastModification(LocalDate.now());

        applicationLineRepository.save(applicationLine);

        return new ResponseEntity<>(newApplication , HttpStatus.CREATED);
    }

}
