package com.server.task.model.dictionary;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "priodir")
public class Priority implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "prio_name", nullable = false)
    private String priorityName;

    @Column(name = "prio_color", nullable = false)
    private String priorityColor;


    public Priority() {
        this.id = null;
        this.priorityName = null;
    }

    public Priority(Long id, String priorityName) {
        this.id = id;
        this.priorityName = priorityName;
    }

    public String getPriorityColor() { return priorityColor; }

    public void setPriorityColor(String priorityColor) { this.priorityColor = priorityColor; }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPriorityName(String priorityName) { this.priorityName = priorityName; }

    public Long getId() {
        return id;
    }

    public String getPriorityName() {
        return priorityName;
    }






}