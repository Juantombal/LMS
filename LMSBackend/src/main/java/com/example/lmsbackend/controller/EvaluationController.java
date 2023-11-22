package com.example.lmsbackend.controller;

import com.example.lmsbackend.repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/evaluation")
@CrossOrigin("*")
public class EvaluationController {
    @Autowired
    EvaluationRepository evaluationRepository;

}
