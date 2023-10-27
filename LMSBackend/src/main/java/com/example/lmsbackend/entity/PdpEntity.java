package com.example.lmsbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pdp")
public class PdpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "background")
    private String background;

    @Column(name = "present")
    private String present;

    @Column(name = "future")
    private String future;

    public PdpEntity() {
    }

    public PdpEntity(String background, String present, String future) {
        this.background = background;
        this.present = present;
        this.future = future;
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
