package com.example.lmsbackend.controller;

import com.example.lmsbackend.entity.*;
import com.example.lmsbackend.repository.FutureRoleRepository;
import com.example.lmsbackend.repository.PdpRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/futurerole")
@CrossOrigin("*")
public class FutureRoleController {
    @Autowired
    FutureRoleRepository futureRoleRepository;

    @Autowired
    PdpRepository pdpRepository;

    @GetMapping("/{id}")
    public List<FutureRoleEntity> getEmployeeCoursesByUserId(@PathVariable(value = "id") Long id) {
        return futureRoleRepository.findByPdp_Id(id);
    }

    @PostMapping("/{id}")
    public ResponseEntity<FutureRoleEntity> createFutureRole(@PathVariable(value = "id") Long id, @RequestBody FutureRoleEntity futureRole) {

        PdpEntity pdp  = pdpRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Application not found"));

        FutureRoleEntity newFutureRole = new FutureRoleEntity();

        newFutureRole.setPdp(pdp);
        newFutureRole.setName(futureRole.getName());
        newFutureRole.setAchievementDate(futureRole.getAchievementDate());

        newFutureRole = futureRoleRepository.save(newFutureRole);

        return new ResponseEntity<>(newFutureRole , HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteFutureRole(@PathVariable("id") long id) {
        try {
            futureRoleRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
