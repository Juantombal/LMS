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
    private int qualityCourse;

    @Column(name = "speed")
    private int speed;

    @Column(name = "functioningTeacher")
    private int functioningTeacher;

    @Column(name = "qualityExecution")
    private int qualityExecution;

    @Column(name = "time")
    private int time;

    @Column(name = "enoughLearned")
    private int enoughLearned;

    @Column(name = "knowledgeTeacher")
    private int knowledgeTeacher;

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
    private int overallRating;

    public EvaluationEntity() {
    }

    public EvaluationEntity(String instance, String teacher, int qualityCourse, int speed, int functioningTeacher, int qualityExecution, int time, int enoughLearned, int knowledgeTeacher, String comments, String learnings, String missedAreas, String strengthsTraining, String weaknessesTraining, int overallRating) {
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

    public int getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(int overallRating) {
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

    public int getQualityCourse() {
        return qualityCourse;
    }

    public void setQualityCourse(int qualityCourse) {
        this.qualityCourse = qualityCourse;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public int getFunctioningTeacher() {
        return functioningTeacher;
    }

    public void setFunctioningTeacher(int functioningTeacher) {
        this.functioningTeacher = functioningTeacher;
    }

    public int getQualityExecution() {
        return qualityExecution;
    }

    public void setQualityExecution(int qualityExecution) {
        this.qualityExecution = qualityExecution;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public int getEnoughLearned() {
        return enoughLearned;
    }

    public void setEnoughLearned(int enoughLearned) {
        this.enoughLearned = enoughLearned;
    }

    public int getKnowledgeTeacher() {
        return knowledgeTeacher;
    }

    public void setKnowledgeTeacher(int knowledgeTeacher) {
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
