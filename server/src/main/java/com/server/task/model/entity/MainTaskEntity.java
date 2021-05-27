package com.server.task.model.entity;

import com.server.task.model.Files;
import com.server.task.model.dictionary.Priority;
import com.server.task.model.dictionary.Status;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "tasks")
public class MainTaskEntity implements Serializable {

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
    private Date endDate;

    @ManyToOne
    @JoinColumn(name ="head_id", nullable = false)
    private UserEntity author;

    @ManyToOne
    @JoinColumn(name ="emp_id", nullable = false)
    private UserEntity employee;

    @Column(name ="task_priority_id")
    private Long priorityId;

    @Column(name = "task_status_id")
    private Long statusId;

    @Column(name = "par_task_id")
    private Long parentId;

    @OneToMany
    @JoinColumn(name = "task_id")
    private List<Files> files = new ArrayList<>();

    @Column(name = "overdue")
    private String overdue;

    @Column(name = "stat_change")
    private Date lastChange;

    public MainTaskEntity(Long id, String taskName, Date begDate, Date endDate, String taskDesc, UserEntity author, UserEntity employee, Long parentId) {
        this.id = id;
        this.taskName = taskName;
        this.taskDesc = taskDesc;
        this.begDate = begDate;
        this.endDate = endDate;
        this.author = author;
        this.employee = employee;
        this.parentId = parentId;

    }

    public MainTaskEntity(Long id, UserEntity author, UserEntity employee) {
        this.id = id;
        this.author = author;
        this.employee = employee;
    }

    public MainTaskEntity() {
        this.id = null;
        this.taskName = null;
        this.taskDesc = null;
        //this.begDate = null;
        this.endDate = null;
        this.author = null;
        this.employee = null;
        this.parentId = null;
    }

    public void setPriorityId(Long priorityId) { this.priorityId = priorityId; }

    public void setStatusId(Long statusId) { this.statusId = statusId; }

    public Long getPriorityId() { return priorityId; }

    public Long getStatusId() { return statusId; }

    public void setAuthor(UserEntity author) { this.author = author; }

    public void setEmployee(UserEntity employee) { this.employee = employee; }

    public String getOverdue() {return overdue;}

    public void setOverdue(String overdue) {this.overdue = overdue;}

    public Date getLastChange() {return lastChange;}

    public void setLastChange(Date lastChange) {this.lastChange = lastChange;}

    public List<Files> getFiles() {return files;}

    public void setFiles(List<Files> files) { this.files = files; }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskName(String taskName) { this.taskName = taskName; }

    public void setTaskDesc(String taskDesc) { this.taskDesc = taskDesc; }

    public void setBegDate(Date begDate) { this.begDate = begDate; }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public void setParentId(Long parentId) {
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

    public Date getBegDate() {return begDate;}

    public Date getEndDate() {
        return endDate;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public UserEntity getEmployee() { return employee; }

    public Long getParentId() {
        return parentId;
    }

}
