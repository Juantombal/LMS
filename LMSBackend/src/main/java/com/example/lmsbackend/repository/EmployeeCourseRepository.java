package com.example.lmsbackend.repository;

import com.example.lmsbackend.entity.EmployeeCourseEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeCourseRepository extends JpaRepository<EmployeeCourseEntity, Long> {
    List<EmployeeCourseEntity> findByUser_Id(Long userId);

    List<EmployeeCourseEntity> findByCourseId(Long courseId);
    @Transactional
    void deleteByCourseId(Long courseId);
}
