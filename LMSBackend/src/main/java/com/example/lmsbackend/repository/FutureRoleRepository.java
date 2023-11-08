package com.example.lmsbackend.repository;

import com.example.lmsbackend.entity.FutureRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FutureRoleRepository extends JpaRepository<FutureRoleEntity, Long> {
    List<FutureRoleEntity> findByPdp_Id(Long pdpId);
}
