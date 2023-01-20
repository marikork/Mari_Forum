package com.myforum.myforum.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.myforum.myforum.exception.MessageNotFoundException;
import com.myforum.myforum.models.Message;
import com.myforum.myforum.service.MessageService;
import com.myforum.myforum.service.TopicService;

import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@SpringBootTest
public class MessageControllerIT {

    @Autowired 
    TopicService topicService;

    @Autowired 
    MessageService messageService;
    
    @Test
    public void GetAllMessagesByTopicId_ReturnsListOfMessages() throws Exception 
    {
        long id = 2;
        List<Message> messages=messageService.getAllMessagesByTopicId(id);
        int size = messages.size();
        
        assertTrue(size > 0);
    }

    @Test
    public void CreateMessage_CreateNewMessage() throws Exception 
    {
        long id = 2;
        List<Message> messages=messageService.getAllMessagesByTopicId(id);
        int size = messages.size();
        Message message = new Message();
        message.setWriter("user1");;
        message.setMessage("testing");;
        message.setTopicId(id);
        ZonedDateTime timeCreated = ZonedDateTime.now();
        message.setTimeCreated(timeCreated);
        
        messageService.createMessage(id, message);
        List<Message> messagesAfter=messageService.getAllMessagesByTopicId(id);
        int sizeAfter = messagesAfter.size();

        assertEquals(size + 1, sizeAfter);
    }

    @Test
    public void UpdateMessage_GiveNewMessage_MessageChangedAfterUpdate() throws Exception 
    {
        long topicId = 2;
        long messageId = 54;
        Message message = new Message();
        message.setWriter("user1");;
        message.setMessage("updated");;
        message.setTopicId(topicId);
        ZonedDateTime timeCreated = ZonedDateTime.now();
        message.setTimeCreated(timeCreated);
        System.out.println(message);
        System.out.println(topicId);
        
        messageService.updateMessage(message, messageId);
        List<Message> messages=messageService.getAllMessagesByTopicId(topicId);
        Message updatedMessage = messages.stream()
            .filter(m -> m.getId().equals(messageId))
            .findAny()
            .orElse(null);

        assertEquals("updated", updatedMessage.getMessage());
        message.setMessage("testing");
        messageService.updateMessage(message, messageId);
        
    }

    @Test
    public void UpdateMessage_GiveIncorrectMessageId_GetException() throws Exception 
    {
        Message message = new Message();
        long id = -1;
        Exception exception = Assertions.assertThrows(MessageNotFoundException.class, () -> {
            messageService.updateMessage(message, id);
        });
        Assertions.assertEquals("Message with Id -1 not found", exception.getMessage());
    }
}
