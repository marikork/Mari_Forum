package com.myforum.myforum.service;
import java.util.List;

import com.myforum.myforum.models.Message;

public interface MessageService {
    List<Message> getAllMessagesByTopicId(Long topicId);
    Message createMessage(Long topicId, Message message);
    Message updateMessage(Message message, Long id);
}
