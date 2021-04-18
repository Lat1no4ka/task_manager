package com.server.task.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
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

}
