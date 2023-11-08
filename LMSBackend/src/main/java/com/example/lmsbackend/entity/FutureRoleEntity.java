package com.example.lmsbackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "futurerole")
public class FutureRoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pdp_id", referencedColumnName = "id")
    @JsonBackReference
    private PdpEntity pdp;

    @Column(name = "name")
    private String name;

    @Column(name = "achievementDate")
    private LocalDate achievementDate;

    public FutureRoleEntity() {
    }

    public FutureRoleEntity(PdpEntity pdp, String name, LocalDate achievementDate) {
        this.pdp = pdp;
        this.name = name;
        this.achievementDate = achievementDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PdpEntity getPdp() {
        return pdp;
    }

    public void setPdp(PdpEntity pdp) {
        this.pdp = pdp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getAchievementDate() {
        return achievementDate;
    }

    public void setAchievementDate(LocalDate achievementDate) {
        this.achievementDate = achievementDate;
    }
}
