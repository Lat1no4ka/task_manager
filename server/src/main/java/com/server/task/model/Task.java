package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "tasks")
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "task_name")
    private String taskName;

    @Column(name = "task_desc")
    private String taskDesc;

    @Column(name = "beg_date")
    private String begDate;

    @Column(name = "exp_date")
    private String endDate;

    @Column(name = "head_id", nullable = false)
    private Long authorId;

    @Column(name = "emp_id", nullable = false)
    private Long employeeId;

    @Column(name ="task_priority_id")
    private int priorityId;

    @Column(name = "task_status_id")
    private int statusId;

    @ManyToMany(mappedBy = "tasks")
    private List<User> users = new ArrayList<>();

    @Column(name = "par_task_id")
    private Long parentId;

    public Task(Long id, String taskName,String begDate, String endDate, String taskDesc, Long authorId, Long employeeId, Long parentId) {
        this.id = id;
        this.taskName = taskName;
        this.taskDesc = taskDesc;
        this.begDate = begDate;
        this.endDate = endDate;
        this.authorId = authorId;
        this.employeeId = employeeId;
        this.parentId = parentId;

    }

    public Task(Long id, Long authorId, Long employeeId) {
        this.id = id;
        this.authorId = authorId;
        this.employeeId = employeeId;
    }

    public Task() {
        this.id = null;
        this.taskName = null;
        this.taskDesc = null;
        this.begDate = null;
        this.endDate = null;
        this.authorId = null;
        this.employeeId = null;
        this.parentId = null;
    }

    public int getPriority() {
        return priorityId;
    }

    public void setPriority(int priorityId) {
        this.priorityId = priorityId;
    }

    public int getStatus() {
        return statusId;
    }

    public void setStatus(int statusId) {
        this.statusId = statusId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskName(String taskName) { this.taskName = taskName; }

    public void setTaskDesc(String taskDesc) { this.taskDesc = taskDesc; }

    public void setBegDate(String begDate) { this.begDate = begDate; }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setAuthor(Long authorId) {
        this.authorId = authorId;
    }

    public void setEmployee(Long employeeId) {
        this.employeeId = employeeId;
    }

    public void setParent(Long parentId) {
        this.parentId = parentId;
    }


    public Long getId() {
        return id;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getTaskDesc() {
        return taskDesc;
    }

    public String getBegDate() {
        return begDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public Long getAuthor() {
        return authorId;
    }

    public Long getEmployee() {
        return employeeId;
    }

    public Long getParent() {
        return parentId;
    }

}
