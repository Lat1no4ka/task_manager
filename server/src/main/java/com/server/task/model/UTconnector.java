package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "utconnector")
public class UTconnector implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

}