package com.example.lmsbackend;
import com.example.lmsbackend.controller.PdpController;
import com.example.lmsbackend.entity.PdpEntity;
import com.example.lmsbackend.repository.PdpRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@SpringBootTest
public class PdpControllerTest {

    @Autowired
    private PdpController pdpController;

    @MockBean
    private PdpRepository pdpRepository;

    @Test
    public void testUpdatePdp() {
        long pdpId = 1L;
        PdpEntity existingPdpEntity = new PdpEntity();

        when(pdpRepository.findById(pdpId)).thenReturn(Optional.of(existingPdpEntity));

        PdpEntity updatedPdpEntity = new PdpEntity();
        updatedPdpEntity.setBackground("Updated Background");
        updatedPdpEntity.setPresent("Updated Present");
        updatedPdpEntity.setFuture("Updated Future");

        when(pdpRepository.save(existingPdpEntity)).thenReturn(updatedPdpEntity);

        ResponseEntity<PdpEntity> responseEntity = pdpController.updatePdp(pdpId, updatedPdpEntity);

        assertNotNull(responseEntity);
        assertNotNull(responseEntity.getBody());

        assertEquals("Updated Background", responseEntity.getBody().getBackground());
        assertEquals("Updated Present", responseEntity.getBody().getPresent());
        assertEquals("Updated Future", responseEntity.getBody().getFuture());
    }
}