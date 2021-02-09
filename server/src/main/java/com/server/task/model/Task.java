package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "tasks")
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "task_name")
    private String taskname;

    @Column(name = "task_desc")
    private String taskdesc;

    @Column(name = "beg_date")
    private String begdate;

    @Column(name = "exp_date")
    private String expdate;

    @Column(name = "head_id", nullable = false)
    private String headid;

    @Column(name = "emp_id", nullable = false)
    private String empid;

    @Column(name = "task_priority_id")
    private String taskpriorityid;

    @Column(name = "task_status_id")
    private String taskstatusid;

    public Task(Long id, String taskname,String begdate, String expdate, String taskdesc, String headid, String empid, String taskpriority, String taskstatus) {
        this.id = id;
        this.taskname = taskname;
        this.taskdesc = taskdesc;
        this.begdate = begdate;
        this.expdate = expdate;
        this.headid = headid;
        this.empid = empid;
        this.taskpriorityid = taskpriority;
        this.taskstatusid = taskstatus;
    }

    public Task(Long id, String headid, String empid) {
        this.id = id;
        this.headid = headid;
        this.empid = empid;
    }

    public Task() {
        this.id = null;
        this.taskname = null;
        this.taskdesc = null;
        this.begdate = null;
        this.expdate = null;
        this.headid = null;
        this.empid = null;
        this.taskpriorityid = null;
        this.taskstatusid = null;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskname(String taskname) { this.taskname = taskname; }

    public void setTaskdesc(String taskdesc) { this.taskdesc = taskdesc; }

    public void setBegdate(String begdate) { this.begdate = begdate; }

    public void setExpdate(String expdate) {
        this.expdate = expdate;
    }

    public void setHeadid(String headid) {
        this.headid = headid;
    }

    public void setEmpid(String empid) {
        this.empid = empid;
    }

    public void setTaskpriorityid(String taskpriorityid) {
        this.taskpriorityid = taskpriorityid;
    }

    public void setTaskstatusid(String taskstatusid) {
        this.taskstatusid = taskstatusid;
    }

    public Long getId() {
        return id;
    }

    public String getTaskname() {
        return taskname;
    }

    public String getTaskdesc() {
        return taskdesc;
    }

    public String getBegdate() {
        return begdate;
    }

    public String getExpdate() {
        return expdate;
    }

    public String getHeadid() {
        return headid;
    }

    public String getEmpid() {
        return empid;
    }

    public String getTaskpriorityid() {
        return taskpriorityid;
    }

    public String getTaskstatusid() {
        return taskstatusid;
    }
}
