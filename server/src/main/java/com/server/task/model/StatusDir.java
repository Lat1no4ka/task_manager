package com.server.task.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "statusdir")
public class StatusDir implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "status_name", unique = true, nullable = false)
    private String statusName;

    public StatusDir() {
        this.id = null;
        this.statusName = null;
    }

    public StatusDir(Long id, String statusName) {
        this.id = id;
        this.statusName = statusName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStatusname(String stateName) { this.statusName = stateName; }

    public Long getId() {
        return id;
    }

    public String getStatusname() {
        return statusName;
    }






}