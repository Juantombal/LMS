package com.example.lmsbackend.dto;

import com.example.lmsbackend.entity.EvaluationEntity;

import java.time.LocalDate;

public class EmployeeCourseDTO {
    private long userId;
    private long courseId;
    private LocalDate completionDate;
    private EvaluationEntity evaluation;

    public EvaluationEntity getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(EvaluationEntity evaluation) {
        this.evaluation = evaluation;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getCourseId() {
        return courseId;
    }

    public void setCourseId(long courseId) {
        this.courseId = courseId;
    }

    public LocalDate getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(LocalDate completionDate) {
        this.completionDate = completionDate;
    }
}
