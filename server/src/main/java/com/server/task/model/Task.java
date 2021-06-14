package com.server.task.model;

import com.server.task.model.entity.UserEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
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
    private Date begDate;

    @Column(name = "exp_date")
    private String endDate;

    @Column(name = "head_id", nullable = false)
    private Long authorId;

    @ManyToMany(mappedBy = "tasksEntity")
    private List<UserEntity> employee = new ArrayList<>();

    /*
    @Column(name = "emp_id", nullable = false)
    private Long employeeId;
     */

    @Column(name ="task_priority_id")
    private Long priorityId;

    @Column(name = "task_status_id")
    private Long statusId;

    @Column(name = "par_task_id")
    private Long parentId;

    @Column(name = "stat_change")
    private Date lastChange;


    public Task(Long id, String taskName, Date begDate, String endDate, String taskDesc, Long authorId, List<UserEntity> employee, Long parentId) {
        this.id = id;
        this.taskName = taskName;
        this.taskDesc = taskDesc;
        this.begDate = begDate;
        this.endDate = endDate;
        this.authorId = authorId;
        this.employee = employee;
        this.parentId = parentId;

    }

    public Task(Long id, Long authorId, List<UserEntity> employee) {
        this.id = id;
        this.authorId = authorId;
        this.employee = employee;
    }

    public Task() {
        this.id = null;
        this.taskName = null;
        this.taskDesc = null;
        this.begDate = null;
        this.endDate = null;
        this.authorId = null;
        this.employee = null;
        this.parentId = null;
    }

    public Date getLastChange(){return lastChange;}

    public void setLastChange(Date lastChange) { this.lastChange = lastChange; }

    public Long getPriority() {
        return priorityId;
    }

    public void setPriority(Long priorityId) {
        this.priorityId = priorityId;
    }

    public Long getStatus() {
        return statusId;
    }

    public void setStatus(Long statusId) {
        this.statusId = statusId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskName(String taskName) { this.taskName = taskName; }

    public void setTaskDesc(String taskDesc) { this.taskDesc = taskDesc; }

    public void setBegDate(Date begDate) { this.begDate = begDate; }

    public void setEndDate(String endDate) { this.endDate = endDate; }

    public void setAuthor(Long authorId) { this.authorId = authorId; }

    public void setEmployee(List<UserEntity> employee) { this.employee = employee; }

    public void setParent(Long parentId) { this.parentId = parentId; }

    public Long getId() { return id; }

    public String getTaskName() { return taskName; }

    public String getTaskDesc() { return taskDesc; }

    public Date getBegDate() { return begDate; }

    public String getEndDate() {
        return endDate;
    }

    public Long getAuthor() {
        return authorId;
    }

    public List<UserEntity> getEmployee() { return employee; }

    public Long getParent() {
        return parentId;
    }

}
