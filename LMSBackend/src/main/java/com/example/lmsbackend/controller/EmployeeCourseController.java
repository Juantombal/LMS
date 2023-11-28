package com.example.lmsbackend.controller;

import com.example.lmsbackend.dto.EmployeeCourseDTO;
import com.example.lmsbackend.entity.*;
import com.example.lmsbackend.repository.CourseRepository;
import com.example.lmsbackend.repository.EmployeeCourseRepository;
import com.example.lmsbackend.repository.EvaluationRepository;
import com.example.lmsbackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    EvaluationRepository evaluationRepository;

    @GetMapping("/user/{id}")
    public List<EmployeeCourseEntity> getEmployeeCoursesByUserId(@PathVariable(value = "id") Long id) {
        return employeeCourseRepository.findByUser_Id(id);
    }

    @GetMapping("/course/{id}")
    public List<EmployeeCourseEntity> getEmployeeCoursesByCourseId(@PathVariable(value = "id") Long id) {
        return employeeCourseRepository.findByCourseId(id);
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

        if (course.getType().contains("cursus") || course.getType().contains("training")) {
            EvaluationEntity evaluation = new EvaluationEntity(employeeCourse.getEvaluation().getInstance(), employeeCourse.getEvaluation().getTeacher(),
                    employeeCourse.getEvaluation().getQualityCourse(), employeeCourse.getEvaluation().getSpeed(), employeeCourse.getEvaluation().getFunctioningTeacher(),
                    employeeCourse.getEvaluation().getQualityExecution(),employeeCourse.getEvaluation().getTime(), employeeCourse.getEvaluation().getEnoughLearned(),
                    employeeCourse.getEvaluation().getKnowledgeTeacher(), employeeCourse.getEvaluation().getComments(), employeeCourse.getEvaluation().getLearnings(),
                    employeeCourse.getEvaluation().getMissedAreas(), employeeCourse.getEvaluation().getStrengthsTraining(), employeeCourse.getEvaluation().getWeaknessesTraining(),
                    employeeCourse.getEvaluation().getOverallRating());

            evaluation = evaluationRepository.save(evaluation);

            newEmployeeCourse.setEvaluation(evaluation);
        }

        newEmployeeCourse = employeeCourseRepository.save(newEmployeeCourse);

        return new ResponseEntity<>(newEmployeeCourse , HttpStatus.CREATED);
    }
}
