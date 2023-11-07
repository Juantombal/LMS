package com.example.lmsbackend.repository;
import com.example.lmsbackend.entity.CourseRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRoleRepository extends JpaRepository<CourseRoleEntity, Long> {
}
