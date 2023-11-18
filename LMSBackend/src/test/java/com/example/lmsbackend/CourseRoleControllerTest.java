package com.example.lmsbackend;

import com.example.lmsbackend.controller.CourseRoleController;
import com.example.lmsbackend.dto.CourseRoleDTO;
import com.example.lmsbackend.entity.CourseEntity;
import com.example.lmsbackend.entity.CourseRoleEntity;
import com.example.lmsbackend.entity.RoleEntity;
import com.example.lmsbackend.repository.CourseRepository;
import com.example.lmsbackend.repository.CourseRoleRepository;
import com.example.lmsbackend.repository.RoleRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CourseRoleControllerTest {

    @Autowired
    private CourseRoleController courseRoleController;

    @MockBean
    private CourseRoleRepository courseRoleRepository;

    @MockBean
    private CourseRepository courseRepository;

    @MockBean
    private RoleRepository roleRepository;

    @Test
    public void testGetAllActiveCourseRoles() {
        CourseEntity activeCourse = new CourseEntity();
        activeCourse.setId(1L);
        activeCourse.setActive(true);

        CourseRoleEntity activeCourseRole = new CourseRoleEntity();
        activeCourseRole.setId(1L);
        activeCourseRole.setCourse(activeCourse);
        activeCourseRole.setRole(new RoleEntity());
        activeCourseRole.setPrio("Prio1");

        List<CourseRoleEntity> mockCourseRoles = new ArrayList<>();
        mockCourseRoles.add(activeCourseRole);

        // Mock behavior of repositories
        when(courseRoleRepository.findAll()).thenReturn(mockCourseRoles);
        when(courseRepository.findById(1L)).thenReturn(Optional.of(activeCourse));

        List<CourseRoleEntity> result = courseRoleController.getAllActiveCourseRoles();

        assertEquals(1, result.size());
    }

    @Test
    public void testCreateCourseRole() {
        CourseRoleDTO courseRoleDTO = new CourseRoleDTO();
        courseRoleDTO.setCourseId(1L);
        courseRoleDTO.setRoleId(2L);
        courseRoleDTO.setPrio("Prio1");

        RoleEntity mockRole = new RoleEntity();
        mockRole.setId(2L);

        CourseEntity mockCourse = new CourseEntity();
        mockCourse.setId(1L);

        CourseRoleEntity savedCourseRole = new CourseRoleEntity();
        savedCourseRole.setId(1L);
        savedCourseRole.setRole(mockRole);
        savedCourseRole.setCourse(mockCourse);
        savedCourseRole.setPrio("Prio1");

        when(roleRepository.findById(2L)).thenReturn(Optional.of(mockRole));
        when(courseRepository.findById(1L)).thenReturn(Optional.of(mockCourse));
        when(courseRoleRepository.save(any(CourseRoleEntity.class))).thenReturn(savedCourseRole);

        ResponseEntity<CourseRoleEntity> responseEntity = courseRoleController.createCourseRole(courseRoleDTO);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(savedCourseRole, responseEntity.getBody());
    }

    @Test
    public void testDeleteCourseRoleSuccess() {
        long roleId = 1L;

        ResponseEntity<HttpStatus> responseEntity = courseRoleController.deleteCourseRole(roleId);

        assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
        verify(courseRoleRepository).deleteById(roleId);
    }
}