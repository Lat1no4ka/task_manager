package com.server.task.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "files")
public class Files implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "task_id")
    private Long taskId;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "task_answer_id")
    private Long answer;

    @Column(name = "file_link")
    private String fileLink;

    @Column(name = "hashname")
    private String hashname;

    public String getHashname() { return hashname; }

    public void setHashname(String hashname) { this.hashname = hashname; }

    public String getFileLink() { return fileLink; }

    public void setFileLink(String fileLink) { this.fileLink = fileLink; }

    public Long getAnswer() { return answer; }

    public void setAnswer(Long answer) { this.answer = answer; }

    public Long getId() {
        return id;
    }

    public Long getTaskId() {
        return taskId;
    }

    public String getFilePath() {
        return filePath;
    }

    public String getFileName() {
        return fileName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}