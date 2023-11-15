package com.example.lmsbackend.entity;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "course")
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "item")
    private String item;

    @Column(name = "website", columnDefinition = "TEXT")
    private String website;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "type")
    private String type;

    @Column(name = "costAmount")
    private float costAmount;

    @Column(name = "courseDays")
    private Float courseDays;

    @Column(name = "isActive")
    private boolean isActive;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CourseRoleEntity> courseRoles = new HashSet<>();

    public CourseEntity() {
    }

    public CourseEntity(String item, String website, String description, String type, float costAmount, Float courseDays, boolean isActive) {
        this.item = item;
        this.website = website;
        this.description = description;
        this.type = type;
        this.costAmount = costAmount;
        this.courseDays = courseDays;
        this.isActive = isActive;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getCostAmount() {
        return costAmount;
    }

    public void setCostAmount(float costAmount) {
        this.costAmount = costAmount;
    }

    public Float getCourseDays() {
        return courseDays;
    }

    public void setCourseDays(Float courseDays) {
        this.courseDays = courseDays;
    }
}
