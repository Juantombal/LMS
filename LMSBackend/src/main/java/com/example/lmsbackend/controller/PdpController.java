package com.example.lmsbackend.controller;

import com.example.lmsbackend.entity.CourseEntity;
import com.example.lmsbackend.entity.PdpEntity;
import com.example.lmsbackend.repository.PdpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/pdp")
@CrossOrigin("*")
public class PdpController {
    @Autowired
    PdpRepository pdpRepository;

    @PutMapping("/{id}")
    public ResponseEntity<PdpEntity> updatePdp(@PathVariable(value = "id") Long id, @RequestBody PdpEntity pdpDetails){

        Optional<PdpEntity> optionalPdp = pdpRepository.findById(id);
        PdpEntity updatedPdp = null;

        if(optionalPdp.isPresent()){
            PdpEntity pdp = optionalPdp.get();

            pdp.setBackground(pdpDetails.getBackground());
            pdp.setPresent(pdpDetails.getPresent());
            pdp.setFuture(pdpDetails.getFuture());

            updatedPdp = pdpRepository.save(pdp);
        }
        return ResponseEntity.ok(updatedPdp);
    }
}
