package com.example.lmsbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "course")
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "item")
    private String item;

    @Column(name = "website")
    private String website;

    @Column(name = "prio")
    private String prio;

    @Column(name = "type")
    private String type;

    @Column(name = "costAmount")
    private float costAmount;

    @Column(name = "courseDays")
    private int courseDays;

    @Column(name = "role")
    private String role;

    public CourseEntity() {
    }

    public CourseEntity(int id, String item, String website, String prio, String type, float costAmount, int courseDays, String role) {
        this.id = id;
        this.item = item;
        this.website = website;
        this.prio = prio;
        this.type = type;
        this.costAmount = costAmount;
        this.courseDays = courseDays;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getPrio() {
        return prio;
    }

    public void setPrio(String prio) {
        this.prio = prio;
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

    public int getCourseDays() {
        return courseDays;
    }

    public void setCourseDays(int courseDays) {
        this.courseDays = courseDays;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
