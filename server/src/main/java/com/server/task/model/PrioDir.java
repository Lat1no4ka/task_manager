package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "priodir")
public class PrioDir implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "prio_name", nullable = false)
    private String prioName;


    public PrioDir() {
        this.id = null;
        this.prioName = null;
    }

    public PrioDir(Long id, String prioName) {
        this.id = id;
        this.prioName = prioName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPrioname(String prioName) { this.prioName = prioName; }

    public Long getId() {
        return id;
    }

    public String getPrioname() {
        return prioName;
    }






}