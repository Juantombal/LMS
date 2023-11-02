package com.example.lmsbackend.controller;

import com.example.lmsbackend.entity.ApplicationEntity;
import com.example.lmsbackend.entity.ApplicationLineEntity;
import com.example.lmsbackend.entity.UserEntity;
import com.example.lmsbackend.repository.ApplicationLineRepository;
import com.example.lmsbackend.repository.ApplicationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/applicationline")
@CrossOrigin("*")
public class ApplicationLineController {
    @Autowired
    ApplicationLineRepository applicationLineRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @PostMapping("")
    public ResponseEntity<ApplicationLineEntity> createApplicationLine(@PathVariable(value = "id") Long id, @RequestBody ApplicationLineEntity applicationLine) {
        ApplicationEntity application = applicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Application not found"));

        ApplicationLineEntity newApplicationLine = new ApplicationLineEntity();

        newApplicationLine.setApplication(application);
        newApplicationLine.setComment(applicationLine.getComment());
        newApplicationLine.setStatus(applicationLine.getStatus());
        newApplicationLine.setLastModification(LocalDate.now());

        newApplicationLine = applicationLineRepository.save(newApplicationLine);

        return new ResponseEntity<>(newApplicationLine , HttpStatus.CREATED);
    }
}
