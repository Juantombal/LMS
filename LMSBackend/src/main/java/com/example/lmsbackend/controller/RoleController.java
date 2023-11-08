package com.example.lmsbackend.controller;

import com.example.lmsbackend.entity.CourseEntity;
import com.example.lmsbackend.entity.RoleEntity;
import com.example.lmsbackend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/role")
@CrossOrigin("*")
public class RoleController {
    @Autowired
    RoleRepository roleRepository;

    @GetMapping("")
    public List<RoleEntity> getAllRoles() {
        return roleRepository.findAll();
    }

    @PostMapping("")
    public ResponseEntity<RoleEntity> createRole(@RequestBody RoleEntity role) {
        RoleEntity _role = roleRepository.save(new RoleEntity(role.getName()));
        return new ResponseEntity<>(_role, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRole(@PathVariable("id") long id) {
        try {
            roleRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
