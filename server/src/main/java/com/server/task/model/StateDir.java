package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "statedir")
public class StateDir implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "state_name", unique = true, nullable = false)
    private String stateName;

    public StateDir() {
        this.id = null;
        this.stateName = null;
    }

    public StateDir(Long id, String stateName) {
        this.id = id;
        this.stateName = stateName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStatename(String stateName) { this.stateName = stateName; }

    public Long getId() {
        return id;
    }

    public String getStatename() {
        return stateName;
    }






}