package com.example.lmsbackend.repository;

import com.example.lmsbackend.entity.UserEntity;
import com.example.lmsbackend.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    List<UserEntity> findByRole(Role role);
}
