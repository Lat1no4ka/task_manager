package com.server.task.model;

import com.server.task.model.entity.UserEntity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "settings")
public class Settings implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user = new UserEntity();

    @Column(name = "emp_view_set")
    private Long empViewSet;

    @Column(name = "task_view_set")
    private Long taskViewSet;

    @Column(name = "background_image_set")
    private String backgroundImageSet;

    @Column(name = "font_size_set")
    private Long fontSizeSet;

    @Column(name = "notification_set")
    private Long notificationSet;

    public Long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public Long getEmpViewSet() {
        return empViewSet;
    }

    public Long getTaskViewSet() {
        return taskViewSet;
    }

    public String getBackgroundImageSet() {
        return backgroundImageSet;
    }

    public Long getFontSizeSet() {
        return fontSizeSet;
    }

    public Long getNotificationSet() {
        return notificationSet;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setEmpViewSet(Long empViewSet) {
        this.empViewSet = empViewSet;
    }

    public void setTaskViewSet(Long taskViewSet) {
        this.taskViewSet = taskViewSet;
    }

    public void setBackgroundImageSet(String backgroundImageSet) {
        this.backgroundImageSet = backgroundImageSet;
    }

    public void setFontSizeSet(Long fontSizeSet) {
        this.fontSizeSet = fontSizeSet;
    }

    public void setNotificationSet(Long notificationSet) {
        this.notificationSet = notificationSet;
    }
}
