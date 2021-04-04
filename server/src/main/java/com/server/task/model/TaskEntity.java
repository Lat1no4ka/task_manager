package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "tasks")
public class TaskEntity implements Serializable {

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

    @ManyToOne
    @JoinColumn(name ="head_id", nullable = false)
    private UserEntity headid;

    @ManyToOne
    @JoinColumn(name ="emp_id", nullable = false)
    private UserEntity empid;

    @ManyToOne
    @JoinColumn(name ="task_priority_id")
    private PrioDir prioDir;

    @ManyToOne
    @JoinColumn(name = "task_status_id")
    private StatusDir statusDir;

    @ManyToMany(mappedBy = "tasks")
    private List<User> users = new ArrayList<>();

    @Column(name = "par_task_id")
    private Long parid;

    public TaskEntity(Long id, String taskname, String begdate, String expdate, String taskdesc, UserEntity headid, UserEntity empid, Long parid) {
        this.id = id;
        this.taskname = taskname;
        this.taskdesc = taskdesc;
        this.begdate = begdate;
        this.expdate = expdate;
        this.headid = headid;
        this.empid = empid;
        this.parid = parid;

    }

    public TaskEntity(Long id, UserEntity headid, UserEntity empid) {
        this.id = id;
        this.headid = headid;
        this.empid = empid;
    }

    public TaskEntity() {
        this.id = null;
        this.taskname = null;
        this.taskdesc = null;
        this.begdate = null;
        this.expdate = null;
        this.headid = null;
        this.empid = null;
        this.parid = null;
    }

    public PrioDir getPriority() {
        return prioDir;
    }

    public void setPriority(PrioDir prioDir) {
        this.prioDir = prioDir;
    }

    //public Set<User> getUsers() {return users;}
    //public void setUsers(Set<User> users) { this.users = users;}
    //они пока не нужны, при необходимости можно подрубить

    public StatusDir getStatus() {
        return statusDir;
    }

    public void setStatus(StatusDir statusDir) {
        this.statusDir = statusDir;
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

    public void setHeadid(UserEntity headid) {
        this.headid = headid;
    }

    public void setEmpid(UserEntity emp) {
        this.empid = emp;
    }

    public void setParid(Long parid) {
        this.parid = parid;
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

    public Long getHeadid() {
        return headid.getId();
    }
    public UserEntity getHead() {
        return headid;
    }

    public Long getEmpid() {
        return empid.getId();
    }

    public UserEntity getEmp() {
        return empid;
    }
    public Long getParid() {
        return parid;
    }

}
