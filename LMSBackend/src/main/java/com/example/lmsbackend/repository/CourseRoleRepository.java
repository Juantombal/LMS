package com.example.lmsbackend.repository;
import com.example.lmsbackend.entity.ApplicationEntity;
import com.example.lmsbackend.entity.CourseRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRoleRepository extends JpaRepository<CourseRoleEntity, Long> {
    List<CourseRoleEntity> findByCourse_Id(Long courseId);
}
