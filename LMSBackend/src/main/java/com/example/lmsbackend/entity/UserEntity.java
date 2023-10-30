package com.example.lmsbackend.entity;

import com.example.lmsbackend.enums.Role;
import jakarta.persistence.*;

@Entity
@Table(name = "_user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "pdp_id", referencedColumnName = "id")
    private PdpEntity pdp;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "jobRole")
    private String jobRole;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    public UserEntity(PdpEntity pdp, String name, String email, String password, String jobRole, Role role) {
        this.pdp = pdp;
        this.name = name;
        this.email = email;
        this.password = password;
        this.jobRole = jobRole;
        this.role = role;
    }

    public UserEntity() {
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

    public Role getRole() {
        return role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }
}
