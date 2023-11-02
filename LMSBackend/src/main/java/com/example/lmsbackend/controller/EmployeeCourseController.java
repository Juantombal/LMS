package com.example.lmsbackend.controller;

import com.example.lmsbackend.dto.ApplicationRequestDTO;
import com.example.lmsbackend.dto.EmployeeCourseDTO;
import com.example.lmsbackend.entity.*;
import com.example.lmsbackend.repository.CourseRepository;
import com.example.lmsbackend.repository.EmployeeCourseRepository;
import com.example.lmsbackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/employeecourse")
@CrossOrigin("*")
public class EmployeeCourseController {
    @Autowired
    EmployeeCourseRepository employeeCourseRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CourseRepository courseRepository;

    @GetMapping("/user/{id}")
    public List<EmployeeCourseEntity> getEmployeeCoursesByUserId(@PathVariable(value = "id") Long id) {
        return employeeCourseRepository.findByUser_Id(id);
    }

    @PostMapping("")
    public ResponseEntity<EmployeeCourseEntity> createEmployeeCourse(@RequestBody EmployeeCourseDTO employeeCourse) {

        UserEntity user = userRepository.findById(employeeCourse.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        CourseEntity course = courseRepository.findById(employeeCourse.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        EmployeeCourseEntity newEmployeeCourse = new EmployeeCourseEntity();
        newEmployeeCourse.setUser(user);
        newEmployeeCourse.setCourse(course);
        newEmployeeCourse.setCompletionDate(employeeCourse.getCompletionDate());

        newEmployeeCourse = employeeCourseRepository.save(newEmployeeCourse);

        return new ResponseEntity<>(newEmployeeCourse , HttpStatus.CREATED);
    }
}
