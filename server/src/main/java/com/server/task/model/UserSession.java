package com.server.task.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;


@RedisHash("Student")
public class UserSession {


    @Id
    private String id;
    private String token;

    public UserSession(String id, String token) {
        this.id = id;
        this.token = token;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return token;
    }

    public void setName(String name) {
        this.token = name;
    }


}

