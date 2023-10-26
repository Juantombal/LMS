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

    public UserEntity(String name, String email, String password, String jobRole, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.jobRole = jobRole;
        this.role = role;
    }

    public UserEntity() {
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
