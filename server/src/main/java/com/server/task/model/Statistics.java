package com.server.task.model;

import com.server.task.model.entity.FilesEntity;
import com.server.task.model.entity.UserEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "statistics")
public class Statistics implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user = new UserEntity();

    @Column(name = "task_counter")
    private int taskCounter;

    @Column(name = "stat_1")
    private int newTask;

    @Column(name = "stat_2")
    private int workTask;

    @Column(name = "stat_3")
    private int checkTask;

    @Column(name = "stat_4")
    private int revisionTask;

    @Column(name = "stat_5")
    private int acceptedTask;

    @Column(name = "stat_6")
    private int closedTask;

    @Column(name = "author")
    private int isAuthor;

    public Long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public int getTaskCounter() {
        return taskCounter;
    }

    public int getNewTask() {
        return newTask;
    }

    public int getWorkTask() {
        return workTask;
    }

    public int getCheckTask() {
        return checkTask;
    }

    public int getRevisionTask() {
        return revisionTask;
    }

    public int getAcceptedTask() {
        return acceptedTask;
    }

    public int getClosedTask() {
        return closedTask;
    }

    public int getIsAuthor() {
        return isAuthor;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setTaskCounter(int taskCounter) {
        this.taskCounter = taskCounter;
    }

    public void setNewTask(int newTask) {
        this.newTask = newTask;
    }

    public void setWorkTask(int workTask) {
        this.workTask = workTask;
    }

    public void setCheckTask(int checkTask) {
        this.checkTask = checkTask;
    }

    public void setRevisionTask(int revisionTask) {
        this.revisionTask = revisionTask;
    }

    public void setAcceptedTask(int acceptedTask) {
        this.acceptedTask = acceptedTask;
    }

    public void setClosedTask(int closedTask) {
        this.closedTask = closedTask;
    }

    public void setIsAuthor(int isAuthor) {
        this.isAuthor = isAuthor;
    }
}
