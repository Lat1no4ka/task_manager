package com.server.task.model.dictionary;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "statusdir")
public class Status implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "status_name", unique = true, nullable = false)
    private String statusName;

    public Status() {
        this.id = null;
        this.statusName = null;
    }

    public Status(Long id, String statusName) {
        this.id = id;
        this.statusName = statusName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStatusName(String statusName) { this.statusName = statusName; }

    public Long getId() {
        return id;
    }

    public String getStatusName() {
        return statusName;
    }






}