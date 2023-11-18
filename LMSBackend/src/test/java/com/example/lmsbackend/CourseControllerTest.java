package com.example.lmsbackend;

import com.example.lmsbackend.controller.CourseController;
import com.example.lmsbackend.entity.CourseEntity;
import com.example.lmsbackend.repository.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class CourseControllerTest {

    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private CourseController courseController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetAllActiveCourses() {
        List<CourseEntity> mockCourses = new ArrayList<>();
        mockCourses.add(new CourseEntity());
        mockCourses.add(new CourseEntity());

        when(courseRepository.findByIsActive(true)).thenReturn(mockCourses);

        List<CourseEntity> result = courseController.getAllActiveCourses();

        assertEquals(mockCourses.size(), result.size());
    }

    @Test
    public void testGetCourseByIdValidId() {
        Long courseId = 1L;
        CourseEntity course = new CourseEntity();
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));

        Optional<CourseEntity> retrievedCourse = courseController.getCourseById(courseId);

        assertTrue(retrievedCourse.isPresent());
        assertEquals(course, retrievedCourse.get());
    }

    @Test
    public void testCreateCourseSuccess() {
        CourseEntity newCourse = new CourseEntity("testCourse", "testCourse.com", "fes", "vakinhoud", 2, 2F, true);
        CourseEntity savedCourse = new CourseEntity("testCourse", "testCourse.com", "fes", "vakinhoud", 2, 2F, true);
        when(courseRepository.save(any(CourseEntity.class))).thenReturn(savedCourse);

        ResponseEntity<CourseEntity> response = courseController.createCourse(newCourse);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());

        assertEquals(newCourse.getItem(), response.getBody().getItem());
        assertEquals(newCourse.getWebsite(), response.getBody().getWebsite());
    }

    @Test
    public void testUpdateCourseSuccess() {
        long courseId = 1L;
        CourseEntity existingCourse = new CourseEntity("testCourse", "testCourse.com", "fes", "vakinhoud", 2, 2F, true);
        CourseEntity updatedCourse = new CourseEntity("testCourse", "testCourse.com", "fes", "Certificering", 2, 2F, true);
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));
        when(courseRepository.save(any(CourseEntity.class))).thenReturn(updatedCourse);

        ResponseEntity<CourseEntity> response = courseController.updateCoursesByName(courseId, updatedCourse);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(updatedCourse, response.getBody());
    }

    @Test
    public void testSetCourseInactiveSuccess() throws NoSuchFieldException, IllegalAccessException {
        long courseId = 1L;
        boolean inactive = true;
        CourseEntity mockCourse = new CourseEntity();

        CourseRepository courseRepository = mock(CourseRepository.class);
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(mockCourse));
        when(courseRepository.save(any(CourseEntity.class))).thenReturn(mockCourse);

        CourseController courseController = new CourseController();

        Field privateRepository = CourseController.class.getDeclaredField("courseRepository");
        privateRepository.setAccessible(true);
        privateRepository.set(courseController, courseRepository);

        ResponseEntity<CourseEntity> response = courseController.setCourseInactive(courseId, inactive);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(inactive, response.getBody().isActive());
    }
}
