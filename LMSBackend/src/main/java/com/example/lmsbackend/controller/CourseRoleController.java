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
import java.util.stream.Collectors;

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
    public List<CourseRoleEntity> getAllActiveCourseRoles() {
        List<CourseRoleEntity> allCourseRoles = courseRoleRepository.findAll();

        return allCourseRoles.stream()
                .filter(courseRole -> courseRole.getCourse().isActive())
                .collect(Collectors.toList());
    }

    @GetMapping("/course/{id}")
    public List<CourseRoleEntity> getCourseById(@PathVariable(value = "id") Long id) {
        return courseRoleRepository.findByCourse_Id(id);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCourseRole(@PathVariable("id") long id) {
        try {
            courseRoleRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
