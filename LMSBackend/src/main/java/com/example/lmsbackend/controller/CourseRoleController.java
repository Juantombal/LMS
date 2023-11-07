package com.example.lmsbackend.controller;

import com.example.lmsbackend.dto.CourseRoleDTO;
import com.example.lmsbackend.entity.*;
import com.example.lmsbackend.repository.CourseRepository;
import com.example.lmsbackend.repository.CourseRoleRepository;
import com.example.lmsbackend.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courserole")
@CrossOrigin("*")
public class CourseRoleController {
    @Autowired
    CourseRoleRepository courseRoleRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    RoleRepository roleRepository;

    @GetMapping("")
    public List<CourseRoleEntity> getAllCourseRole() {
        return courseRoleRepository.findAll();
    }

    @PostMapping("")
    public ResponseEntity<CourseRoleEntity> createCourseRole(@RequestBody CourseRoleDTO courseRole) {

        RoleEntity role = roleRepository.findById(courseRole.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        CourseEntity course = courseRepository.findById(courseRole.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));

        CourseRoleEntity newCourseRole = new CourseRoleEntity();
        newCourseRole.setRole(role);
        newCourseRole.setCourse(course);
        newCourseRole.setPrio(courseRole.getPrio());

        newCourseRole = courseRoleRepository.save(newCourseRole);

        return new ResponseEntity<>(newCourseRole , HttpStatus.CREATED);
    }
}
