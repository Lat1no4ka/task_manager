package com.server.task.model;

import com.server.task.model.entity.FilesEntity;
import com.server.task.model.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "statistics")
public class Statistics implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user = new UserEntity();

    @Column(name = "task_counter")
    private int taskCounter;

    @Column(name = "stat_1")
    private int stat1;

    @Column(name = "stat_2")
    private int stat2;

    @Column(name = "stat_3")
    private int stat3;

    @Column(name = "stat_4")
    private int stat4;

    @Column(name = "stat_5")
    private int stat5;

    @Column(name = "stat_6")
    private int stat6;

    @Column(name = "author")
    private int isAuthor;

}