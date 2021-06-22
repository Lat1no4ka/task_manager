package com.server.task.model.entity;

import com.server.task.model.Files;
import com.server.task.model.User;
import com.server.task.model.dictionary.Priority;
import com.server.task.model.dictionary.Status;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "tasks")
public class TaskEntity implements Serializable {

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

    @ManyToOne
    @JoinColumn(name ="head_id", nullable = false)
    private UserEntity author;

    @ManyToMany(mappedBy = "tasksEntity")
    private List<UserEntity> employee = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name ="task_priority_id")
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "task_status_id")
    private Status status;

    @Column(name = "par_task_id")
    private Long parentId;

    @OneToMany
    @JoinColumn(name = "task_id")
    private List<Files> files = new ArrayList<>();

    @Column(name = "overdue")
    private String overdue;

    @Column(name = "stat_change")
    private Date lastChange;

    @OneToMany
    @JoinColumn(name = "task_answer_id")
    private List<Files> answer = new ArrayList<>();

    public TaskEntity(Long id, String taskName, String begDate, String endDate, String taskDesc, UserEntity author, List<UserEntity> employee, Long parentId) {
        this.id = id;
        this.taskName = taskName;
        this.taskDesc = taskDesc;
        this.begDate = begDate;
        this.endDate = endDate;
        this.author = author;
        this.employee = employee;
        this.parentId = parentId;

    }

    public TaskEntity(Long id, UserEntity author, List<UserEntity> employee) {
        this.id = id;
        this.author = author;
        this.employee = employee;
    }

    public TaskEntity() {
        this.id = null;
        this.taskName = null;
        this.taskDesc = null;
        //this.begDate = null;
        this.endDate = null;
        this.author = null;
        this.employee = null;
        this.parentId = null;
    }

    public List<Files> getAnswer() { return answer; }

    public void setBegDate(String begDate) { this.begDate = begDate; }

    public void setAuthor(UserEntity author) { this.author = author; }

    public void setAnswer(List<Files> answer) { this.answer = answer; }

    public List<UserEntity> getEmployee() { return employee; }

    public void setEmployee(List<UserEntity> employee) { this.employee = employee; }

    public String getOverdue() {return overdue;}

    public void setOverdue(String overdue) {this.overdue = overdue;}

    public Date getLastChange() {return lastChange;}

    public void setLastChange(Date lastChange) {this.lastChange = lastChange;}

    public List<Files> getFiles() {return files;}

    public void setFiles(List<Files> files) { this.files = files; }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskName(String taskName) { this.taskName = taskName; }

    public void setTaskDesc(String taskDesc) { this.taskDesc = taskDesc; }

   // public void setBegDate(String begDate) { this.begDate = begDate; }

    public void setEndDate(String endDate) {
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

    public String getBegDate() {return begDate;}

    public String getEndDate() {
        return endDate;
    }

    public UserEntity getAuthor() {
        return author;
    }



    public Long getParentId() {
        return parentId;
    }

}
