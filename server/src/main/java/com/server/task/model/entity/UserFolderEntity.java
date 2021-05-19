package com.server.task.model.entity;

import com.server.task.model.dictionary.Role;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class UserFolderEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_name", unique = true, nullable = false)
    private String userName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "utconnector",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    List<TaskEntity> tasks = new ArrayList<>();

    public UserFolderEntity() {
        this.userName = null;
        this.firstName = null;
        this.lastName = null;
    }

    public UserFolderEntity(String userName, String password) {
        this.userName = userName;
        this.firstName = null;
        this.lastName = null;
    }

    public UserFolderEntity(Long id, String userName, String password, String firstName, String lastName, String email) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public List<TaskEntity> getTasks() {return tasks;}

    public void setTasks(List<TaskEntity> tasks) {
        this.tasks = tasks;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

}
