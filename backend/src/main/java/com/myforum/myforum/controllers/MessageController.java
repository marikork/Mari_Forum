package com.myforum.myforum.controllers;
import com.myforum.myforum.models.Message;
import com.myforum.myforum.repository.TopicRepository;
import com.myforum.myforum.repository.MessageRepository;
import com.myforum.myforum.service.MessageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageController {
    @Autowired
    TopicRepository topicRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    private MessageService messageService;

    @GetMapping("/topics/{id}/messages")
    public List<Message> getAllMessagesByTopicId(@PathVariable(value = "id") Long topicId) {
        System.out.println("MessageControllerissa");
        return messageService.getAllMessagesByTopicId(topicId);
    }

    @PostMapping("/topics/{id}/messages")
    public Message createMessage(@PathVariable(value = "id") Long topicId, @RequestBody Message messageRequest) {
        return messageService.createMessage(topicId, messageRequest);
    }

    @PutMapping("messages/{id}")
    public Message updateMessage(@PathVariable(value = "id") Long messageId, @RequestBody Message messageRequest) {
        return messageService.updateMessage(messageRequest, messageId);
    }
    
}
