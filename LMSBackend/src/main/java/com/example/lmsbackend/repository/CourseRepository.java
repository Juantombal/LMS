package com.example.lmsbackend.repository;

import com.example.lmsbackend.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {
    List<CourseEntity> findByItem(String Item);
    List<CourseEntity> findByIsActive(boolean isActive);
}
