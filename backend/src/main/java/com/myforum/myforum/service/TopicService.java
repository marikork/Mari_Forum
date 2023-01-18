package com.myforum.myforum.service;
import java.util.List;
import java.util.Optional;

import com.myforum.myforum.models.Topic;

public interface TopicService {
    
    List<Topic> getAllTopics();
    Topic getTopicById(Long id);
    Topic addTopic(Topic topic);
    Topic updateTopic(Topic topic, Long id);
    void deleteTopic(Long id);
}
