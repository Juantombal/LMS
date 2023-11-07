package com.example.lmsbackend.controller;

import com.example.lmsbackend.entity.CourseEntity;
import com.example.lmsbackend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/course")
@CrossOrigin("*")
public class CourseController{
    @Autowired
    CourseRepository courseRepository;

    @GetMapping("")
    public List<CourseEntity> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<CourseEntity> getCourseById(@PathVariable(value = "id") Long id) {
        return courseRepository.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<CourseEntity> createCourse(@RequestBody CourseEntity course) {
        CourseEntity _course = courseRepository.save(new CourseEntity(course.getItem(), course.getWebsite(), course.getDescription(),
                course.getType(), course.getCostAmount(), course.getCourseDays()));
        return new ResponseEntity<>(_course, HttpStatus.CREATED);
    }


    @PutMapping("/courses")
    public ResponseEntity<List<CourseEntity>> updateCoursesByName(@RequestParam("item") String itemName, @RequestBody CourseEntity updatedCourse) {
        List<CourseEntity> coursesToUpdate = courseRepository.findByItem(itemName);
        List<CourseEntity> updatedCourses = new ArrayList<>();

        for (CourseEntity course : coursesToUpdate) {
            course.setItem(updatedCourse.getItem());
            course.setWebsite(updatedCourse.getWebsite());
            course.setDescription(updatedCourse.getDescription());
            course.setType(updatedCourse.getType());
            course.setCostAmount(updatedCourse.getCostAmount());
            course.setCourseDays(updatedCourse.getCourseDays());

            updatedCourses.add(courseRepository.save(course));
        }

        return ResponseEntity.ok(updatedCourses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCourse(@PathVariable("id") long id) {
        try {
            courseRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
