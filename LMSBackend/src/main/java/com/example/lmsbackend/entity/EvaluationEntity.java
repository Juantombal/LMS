package com.example.lmsbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "evaluation")
public class EvaluationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "Instance")
    private String instance;

    @Column(name = "teacher")
    private String teacher;

    @Column(name = "qualityCourse")
    private Integer qualityCourse;

    @Column(name = "speed")
    private Integer speed;

    @Column(name = "functioningTeacher")
    private Integer functioningTeacher;

    @Column(name = "qualityExecution")
    private Integer qualityExecution;

    @Column(name = "time")
    private Integer time;

    @Column(name = "enoughLearned")
    private Integer enoughLearned;

    @Column(name = "knowledgeTeacher")
    private Integer knowledgeTeacher;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

    @Column(name = "learnings", columnDefinition = "TEXT")
    private String learnings;

    @Column(name = "missedAreas", columnDefinition = "TEXT")
    private String missedAreas;

    @Column(name = "strengthsTraining", columnDefinition = "TEXT")
    private String strengthsTraining;

    @Column(name = "weaknessesTraining", columnDefinition = "TEXT")
    private String weaknessesTraining;

    @Column(name = "overallRating")
    private Integer overallRating;

    public EvaluationEntity() {
    }

    public EvaluationEntity(String instance, String teacher, Integer qualityCourse, Integer speed, Integer functioningTeacher, Integer qualityExecution, Integer time, Integer enoughLearned, Integer knowledgeTeacher, String comments, String learnings, String missedAreas, String strengthsTraining, String weaknessesTraining, Integer overallRating) {
        this.instance = instance;
        this.teacher = teacher;
        this.qualityCourse = qualityCourse;
        this.speed = speed;
        this.functioningTeacher = functioningTeacher;
        this.qualityExecution = qualityExecution;
        this.time = time;
        this.enoughLearned = enoughLearned;
        this.knowledgeTeacher = knowledgeTeacher;
        this.comments = comments;
        this.learnings = learnings;
        this.missedAreas = missedAreas;
        this.strengthsTraining = strengthsTraining;
        this.weaknessesTraining = weaknessesTraining;
        this.overallRating = overallRating;
    }

    public Integer getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(Integer overallRating) {
        this.overallRating = overallRating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstance() {
        return instance;
    }

    public void setInstance(String instance) {
        this.instance = instance;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public Integer getQualityCourse() {
        return qualityCourse;
    }

    public void setQualityCourse(Integer qualityCourse) {
        this.qualityCourse = qualityCourse;
    }

    public Integer getSpeed() {
        return speed;
    }

    public void setSpeed(Integer speed) {
        this.speed = speed;
    }

    public Integer getFunctioningTeacher() {
        return functioningTeacher;
    }

    public void setFunctioningTeacher(Integer functioningTeacher) {
        this.functioningTeacher = functioningTeacher;
    }

    public Integer getQualityExecution() {
        return qualityExecution;
    }

    public void setQualityExecution(Integer qualityExecution) {
        this.qualityExecution = qualityExecution;
    }

    public Integer getTime() {
        return time;
    }

    public void setTime(Integer time) {
        this.time = time;
    }

    public Integer getEnoughLearned() {
        return enoughLearned;
    }

    public void setEnoughLearned(Integer enoughLearned) {
        this.enoughLearned = enoughLearned;
    }

    public Integer getKnowledgeTeacher() {
        return knowledgeTeacher;
    }

    public void setKnowledgeTeacher(Integer knowledgeTeacher) {
        this.knowledgeTeacher = knowledgeTeacher;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getLearnings() {
        return learnings;
    }

    public void setLearnings(String learnings) {
        this.learnings = learnings;
    }

    public String getMissedAreas() {
        return missedAreas;
    }

    public void setMissedAreas(String missedAreas) {
        this.missedAreas = missedAreas;
    }

    public String getStrengthsTraining() {
        return strengthsTraining;
    }

    public void setStrengthsTraining(String strengthsTraining) {
        this.strengthsTraining = strengthsTraining;
    }

    public String getWeaknessesTraining() {
        return weaknessesTraining;
    }

    public void setWeaknessesTraining(String weaknessesTraining) {
        this.weaknessesTraining = weaknessesTraining;
    }
}
