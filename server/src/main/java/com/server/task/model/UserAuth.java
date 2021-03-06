package com.server.task.model;

import com.server.task.model.dictionary.Role;
import com.server.task.model.entity.TaskEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class UserAuth implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_name", unique = true, nullable = false)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "token")
    private String token;

    @Column(name = "blocked")
    private Long blocked;

    public UserAuth() {
        this.userName = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
    }

    public UserAuth(String userName, String password) {
        this.userName = userName;
        this.password = password;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
    }

    public UserAuth(Long id, String userName, String password, String firstName, String lastName, String email) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public Long getBlocked() {
        return blocked;
    }

    public void setBlocked(Long blocked) { this.blocked = blocked; }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }



}
