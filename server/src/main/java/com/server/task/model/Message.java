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

    @Column(name = "file1")
    private String fileLink1;

    @Column(name = "file1name")
    private String fileName1;

    @Column(name = "file2")
    private String fileLink2;

    @Column(name = "file2name")
    private String fileName2;

    @Column(name = "file3")
    private String fileLink3;

    @Column(name = "file3name")
    private String fileName3;

    @Column(name = "file4")
    private String fileLink4;

    @Column(name = "file4name")
    private String fileName4;

    @Column(name = "file5")
    private String fileLink5;

    @Column(name = "file5name")
    private String fileName5;


    public String getFileName1() {
        return fileName1;
    }

    public String getFileName2() {
        return fileName2;
    }

    public String getFileName3() {
        return fileName3;
    }

    public String getFileName4() {
        return fileName4;
    }

    public String getFileName5() {
        return fileName5;
    }

    public void setFileName1(String fileName1) {
        this.fileName1 = fileName1;
    }

    public void setFileName2(String fileName2) {
        this.fileName2 = fileName2;
    }

    public void setFileName3(String fileName3) {
        this.fileName3 = fileName3;
    }

    public void setFileName4(String fileName4) {
        this.fileName4 = fileName4;
    }

    public void setFileName5(String fileName5) {
        this.fileName5 = fileName5;
    }

    public String getFileLink1() { return fileLink1; }

    public String getFileLink2() { return fileLink2; }

    public String getFileLink3() { return fileLink3; }

    public String getFileLink4() { return fileLink4; }

    public String getFileLink5() { return fileLink5; }

    public void setFileLink1(String fileLink1) { this.fileLink1 = fileLink1; }

    public void setFileLink2(String fileLink2) { this.fileLink2 = fileLink2; }

    public void setFileLink3(String fileLink3) { this.fileLink3 = fileLink3; }

    public void setFileLink4(String fileLink4) { this.fileLink4 = fileLink4; }

    public void setFileLink5(String fileLink5) { this.fileLink5 = fileLink5; }

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
