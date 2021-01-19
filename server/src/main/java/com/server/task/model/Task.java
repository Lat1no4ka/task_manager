package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;

@Entity
@Table(name = "tasks")
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "head_id", nullable = false)
    private String headid;

    @Column(name = "emp_id", nullable = false)
    private String empid;

    @Column(name = "task_name")
    private String taskname;

    @Column(name = "task_desc")
    private String taskdesc;

    @Column(name = "exp_date")
    private String expdate;

    @Column(name = "task_priority")
    private String taskpriority;

    @Column(name = "task_status")
    private String taskstatus;

    public Task()
    {
        this.headid = null;
        this.empid = null;
        this.taskname = null;
        this.taskdesc = null;
        this.expdate = null;
        this.taskpriority = null;
        this.taskstatus = null;
    }

    public Task(String headid, String empid)
    {
        this.headid = headid;
        this.empid = empid;
        this.taskname = null;
        this.taskdesc = null;
        this.expdate = null;
        this.taskpriority = null;
        this.taskstatus = null;
    }

    public Task(Long id,String headid, String empid, String taskname, String taskdesc, String expdate, String taskpriority, String taskstatus)
    {
        this.headid = headid;
        this.empid = empid;
        this.taskname = taskname;
        this.taskdesc = tascdesc;
        this.expdate = expdate;
        this.taskpriority = taskpriority;
        this.taskstatus = taskstatus;
    }

    //Сеты

    public void setHeadId(String headid)
    {
        this.headid = headid;
    }

    public void setEmpId(String empid)
    {
        this.empid = empid;
    }

    public void setTaskName(String taskname)
    {
        this.taskname = taskname;
    }

    public void setTascDesc(String taskdesc)
    {
        this.taskdesc = tascdesc;
    }

    public void setExpDate(String expdate)
    {
        this.expdate = expdate;
    }

    public void setTaskPriority(String taskpriority)
    {
        this.taskpriority = taskpriority;
    }

    public void setTaskStatus(String taskstatus)
    {
        this.taskstatus = taskstatus;
    }

    //Геты

    public Long getId() {
        return id;
    }

    public String getHeadId()
    {
        return headid;
    }

    public String getEmpId()
    {
        return empid;
    }

    public String getTaskName()
    {
        return taskname;
    }

    public String setTascDesc()
    {
        return tascdesc;
    }

    public String getExpDate()
    {
        return expdate;
    }

    public String getTaskPriority()
    {
        return taskpriority;
    }

    public String getTaskStatus()
    {
        return taskstatus;
    }


}
