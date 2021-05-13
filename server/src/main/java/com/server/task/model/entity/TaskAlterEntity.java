package com.server.task.model.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "tasks")
public class TaskAlterEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "task_name")
    private String taskName;

    @Column(name = "task_desc")
    private String taskDesc;

   /* @Column(name = "beg_date")
    private Date begDate;
    */

    @Column(name = "exp_date")
    private String endDate;

    @Column(name ="emp_id", nullable = false)
    private Long employee;

    @Column(name ="task_priority_id")
    private Long priority;

    @Column(name = "task_status_id")
    private Long status;

    public Long getId() {
        return id;
    }

    public String getTaskName() {
        return taskName;
    }

    public String getTaskDesc() {
        return taskDesc;
    }

    public String getEndDate() {
        return endDate;
    }

    public Long getEmployee() {
        return employee;
    }

    public Long getPriority() {
        return priority;
    }

    public Long getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public void setTaskDesc(String taskDesc) {
        this.taskDesc = taskDesc;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public void setEmployee(Long employee) {
        this.employee = employee;
    }

    public void setPriority(Long priority) {
        this.priority = priority;
    }

    public void setStatus(Long status) {
        this.status = status;
    }
}
