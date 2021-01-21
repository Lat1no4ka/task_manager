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

    @Column(name = "task_priority")
    private String taskpriority;

    @Column(name = "task_status")
    private String taskstatus;

    public Task(Long id, String taskname,String begdate, String expdate, String taskdesc, String headid, String empid, String taskpriority, String taskstatus) {
        this.id = id;
        this.taskname = taskname;
        this.taskdesc = taskdesc;
        this.begdate = begdate;
        this.expdate = expdate;
        this.headid = headid;
        this.empid = empid;
        this.taskpriority = taskpriority;
        this.taskstatus = taskstatus;
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
        this.taskpriority = null;
        this.taskstatus = null;
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

    public void setTaskpriority(String taskpriority) {
        this.taskpriority = taskpriority;
    }

    public void setTaskstatus(String taskstatus) {
        this.taskstatus = taskstatus;
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

    public String getTaskpriority() {
        return taskpriority;
    }

    public String getTaskstatus() {
        return taskstatus;
    }
}
