package com.example.lmsbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "pdp")
public class PdpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "background", columnDefinition = "TEXT")
    private String background;

    @Column(name = "present", columnDefinition = "TEXT")
    private String present;

    @Column(name = "future", columnDefinition = "TEXT")
    private String future;

    @OneToMany(mappedBy = "pdp", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<FutureRoleEntity> futureRole;

    public PdpEntity() {
    }

    public PdpEntity(String background, String present, String future, List<FutureRoleEntity> futureRole) {
        this.background = background;
        this.present = present;
        this.future = future;
        this.futureRole = futureRole;
    }

    public List<FutureRoleEntity> getFutureRole() {
        return futureRole;
    }

    public void setFutureRole(List<FutureRoleEntity> futureRoles) {
        this.futureRole = futureRoles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public String getPresent() {
        return present;
    }

    public void setPresent(String present) {
        this.present = present;
    }

    public String getFuture() {
        return future;
    }

    public void setFuture(String future) {
        this.future = future;
    }
}
