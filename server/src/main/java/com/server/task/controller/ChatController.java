package com.server.task.controller;

import com.server.task.model.ChatMessage;
import com.server.task.model.Message;
import com.server.task.repo.FilesRepository;
import com.server.task.repo.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@Controller
public class ChatController {

    @Autowired
    MessageRepository messageRepository;

    /*-------------------- Group (Public) chat--------------------*/
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        messageRepository.save(message);
        return message;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/public")
    public Message addUser(@Payload Message message,
                           SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", message.getSender());
        return message;
    }


    /*--------------------Private chat--------------------*/
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendPrivateMessage")
    @SendTo("/queue/reply")
    public  Message sendPrivateMessage(@Payload Message message) {
        simpMessagingTemplate.convertAndSendToUser(
                message.getReceiver().trim(), "/reply", message);
        simpMessagingTemplate.convertAndSendToUser(
                message.getSender().trim(), "/reply", message);
        messageRepository.save(message);
        return message;
    }

    @MessageMapping("/addPrivateUser")
    @SendTo("/queue/reply")
    public Message addPrivateUser(@Payload Message message,
                                  SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("private-username", message.getSender());
        return message;
    }
}
