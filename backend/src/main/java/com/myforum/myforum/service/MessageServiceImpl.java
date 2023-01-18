package com.myforum.myforum.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myforum.myforum.exception.MessageNotFoundException;
import com.myforum.myforum.exception.TopicNotFoundException;
import com.myforum.myforum.models.Message;
import com.myforum.myforum.models.Topic;
import com.myforum.myforum.repository.MessageRepository;
import com.myforum.myforum.repository.TopicRepository;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    MessageRepository messageRepository;

    @Override
    public List<Message> getAllMessagesByTopicId(Long topicId) {
        topicRepository.findById(topicId).orElseThrow(() -> new TopicNotFoundException(topicId));
        List<Message> messages = messageRepository.findByTopicId(topicId);
        return messages;
    }

    @Override
    public Message createMessage(Long topicId, Message messageRequest) {
        Message message = topicRepository.findById(topicId).map(topic -> {
            messageRequest.setTopicId(topicId);
            return messageRepository.save(messageRequest);
        }).orElseThrow(() -> new TopicNotFoundException(topicId));
        return message;
    }

    @Override
    public Message updateMessage(Message messageRequest, Long id) {
        Message message = messageRepository.findById(id).orElseThrow(() -> new MessageNotFoundException(id));
        message.setMessage(messageRequest.getMessage());
        message.setTimeCreated(messageRequest.getTimeCreated());
        message.setWriter(messageRequest.getWriter());
    
        Message _message = messageRepository.save(message);
        return _message;
    }
    
}
