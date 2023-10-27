package com.example.lmsbackend.repository;

import com.example.lmsbackend.entity.PdpEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PdpRepository extends JpaRepository<PdpEntity, Long> {
}
