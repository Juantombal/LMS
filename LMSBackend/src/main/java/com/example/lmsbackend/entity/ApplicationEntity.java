package com.example.lmsbackend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "application")
public class ApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private CourseEntity course;

    @OneToMany(mappedBy = "application", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<ApplicationLineEntity> applicationLines;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "submission_date")
    private LocalDate submissionDate;


    public ApplicationEntity(UserEntity user, CourseEntity course, LocalDate startDate, LocalDate endDate, LocalDate submissionDate) {
        this.user = user;
        this.course = course;
        this.startDate = startDate;
        this.endDate = endDate;
        this.submissionDate = submissionDate;
    }

    public ApplicationEntity() {
    }

    public List<ApplicationLineEntity> getApplicationLines() {
        return applicationLines;
    }

    public void setApplicationLines(List<ApplicationLineEntity> applicationLines) {
        this.applicationLines = applicationLines;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public CourseEntity getCourse() {
        return course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalDate getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }
}
