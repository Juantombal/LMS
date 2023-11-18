package com.example.lmsbackend;

import com.example.lmsbackend.controller.ApplicationController;
import com.example.lmsbackend.dto.ApplicationRequestDTO;
import com.example.lmsbackend.entity.ApplicationEntity;
import com.example.lmsbackend.entity.CourseEntity;
import com.example.lmsbackend.entity.UserEntity;
import com.example.lmsbackend.repository.ApplicationLineRepository;
import com.example.lmsbackend.repository.ApplicationRepository;
import com.example.lmsbackend.repository.CourseRepository;
import com.example.lmsbackend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationControllerTest {

    @MockBean
    private ApplicationRepository applicationRepository;

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private ApplicationController applicationController;

    @MockBean
    private CourseRepository courseRepository;

    @MockBean
    private ApplicationLineRepository applicationLineRepository;

    @Test
    public void testGetAllApplications() {
        List<ApplicationEntity> mockApplications = new ArrayList<>();
        mockApplications.add(new ApplicationEntity());
        mockApplications.add(new ApplicationEntity());

        when(applicationRepository.findAll()).thenReturn(mockApplications);

        List<ApplicationEntity> result = applicationController.getAllApplications();

        assertEquals(mockApplications.size(), result.size());
    }

    @Test
    public void testGetApplicationsByUserId() {
        List<ApplicationEntity> mockApplications = new ArrayList<>();
        mockApplications.add(new ApplicationEntity());
        mockApplications.add(new ApplicationEntity());

        when(applicationRepository.findByUser_Id(anyLong())).thenReturn(mockApplications);

        List<ApplicationEntity> result = applicationController.getApplicationsByUserId(123L);

        assertEquals(mockApplications.size(), result.size());
    }

    @Test
    public void testGetApplicationById() {
        ApplicationEntity mockApplication = new ApplicationEntity();

        when(applicationRepository.findById(anyLong())).thenReturn(Optional.of(mockApplication));

        Optional<ApplicationEntity> result = applicationController.getApplicationById(123L);

        assertTrue(result.isPresent());
        assertEquals(mockApplication, result.get());
    }

    @Test
    public void testCreateApplication() throws Exception {
        ApplicationRequestDTO applicationDTO = new ApplicationRequestDTO();

        UserEntity mockUser = new UserEntity();
        CourseEntity mockCourse = new CourseEntity();
        ApplicationEntity mockApplication = new ApplicationEntity();

        when(userRepository.findById(anyLong())).thenReturn(Optional.of(mockUser));
        when(courseRepository.findById(anyLong())).thenReturn(Optional.of(mockCourse));
        when(applicationRepository.save(any(ApplicationEntity.class))).thenReturn(mockApplication);

        ResponseEntity<ApplicationEntity> response = applicationController.createApplication(applicationDTO);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}
