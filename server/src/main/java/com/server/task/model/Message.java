package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "messages")
public class Message implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "message_type")
    private String type;

    @Column(name = "content")
    private String content;

    @Column(name = "sender")
    private String sender;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "room")
    private String room;

    @Column(name = "time")
    private LocalDateTime dateTime=LocalDateTime.now();

    @OneToMany
    @JoinColumn(name = "message_id")
    private List<ChatFiles> files = new ArrayList<>();


    public List<ChatFiles> getFiles() {
        return files;
    }

    public void setFiles(List<ChatFiles> files) {
        this.files = files;
    }

    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getContent() {
        return content;
    }

    public String getSender() {
        return sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public String getRoom() {
        return room;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public void setRoom(String room) { this.room = room; }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
