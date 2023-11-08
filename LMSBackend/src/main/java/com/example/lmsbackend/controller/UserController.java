package com.example.lmsbackend.controller;
import com.example.lmsbackend.entity.PdpEntity;
import com.example.lmsbackend.entity.UserEntity;
import com.example.lmsbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping("/{id}")
    public Optional<UserEntity> getUserById(@PathVariable(value = "id") Long id) {
        return userRepository.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<UserEntity> createUser(@RequestBody UserEntity user) {
        PdpEntity pdp = new PdpEntity();
        pdp.setBackground("-");
        pdp.setPresent("-");
        pdp.setFuture("-");
        UserEntity _user = userRepository.save(new UserEntity(pdp, user.getName(), user.getEmail(), user.getPassword(), user.getJobRole(), user.getRole()));
        return new ResponseEntity<>(_user, HttpStatus.CREATED);
    }
}
