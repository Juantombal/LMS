package com.example.lmsbackend.repository;

import com.example.lmsbackend.entity.ApplicationLineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationLineRepository extends JpaRepository<ApplicationLineEntity, Long> {
}
