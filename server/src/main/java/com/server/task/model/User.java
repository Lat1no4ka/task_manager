package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements Serializable {

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
    private RoleDir roleDir;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "utconnector",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    Set<Task> tasks = new HashSet<>();

    public User() {
        this.userName = null;
        this.password = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
    }

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
    }

    public User(Long id,String userName, String password, String firstName, String lastName, String email, int roleid) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public RoleDir getRole() {
        return roleDir;
    }

    public void setRole(RoleDir roleDir) {
        this.roleDir = roleDir;
    }

    public Set<Task> getTasks() {return tasks;}

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
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



}
