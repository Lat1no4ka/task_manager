package com.server.task.controller;

import com.server.task.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.server.task.repo.MessageRepository;


@CrossOrigin("*")
@Controller
public class ChatController {

    @Autowired
    MessageRepository messageRepository;

    /*-------------------- Group (Public) chat--------------------*/
    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message chatMessage) {
        return chatMessage;
    }


    @MessageMapping("/addUser")
    @SendTo("/topic/public")
    public Message addUser(@Payload Message chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }


    /*--------------------Private chat--------------------*/
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendPrivateMessage")
    @SendTo("/queue/reply")
    public Message sendPrivateMessage(@Payload Message chatMessage) {
        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getReceiver().trim(), "/reply", chatMessage);
        messageRepository.save(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/addPrivateUser")
    @SendTo("/queue/reply")
    public Message addPrivateUser(@Payload Message chatMessage,
                                      SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("private-username", chatMessage.getSender());
        return chatMessage;
    }
}
