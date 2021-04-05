package com.server.task.model.dictionary;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "roledir")
public class Role implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "role_name", unique = true, nullable = false)
    private String roleName;


    public Role() {
        this.id = null;
        this.roleName = null;
    }

    public Role(Long id, String roleName) {
        this.id = id;
        this.roleName = roleName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoleName(String roleName) { this.roleName = roleName; }

    public Long getId() {
        return id;
    }

    public String getRoleName() {
        return roleName;
    }






}