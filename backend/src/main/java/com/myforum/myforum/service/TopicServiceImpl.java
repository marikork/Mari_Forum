package com.myforum.myforum.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.myforum.myforum.models.Topic;
import com.myforum.myforum.repository.MessageRepository;
import com.myforum.myforum.repository.TopicRepository;
import com.myforum.myforum.exception.TopicNotFoundException;

@Service
public class TopicServiceImpl  implements TopicService{

    @Autowired
    TopicRepository topicRepository;

    @Autowired
    MessageRepository messageRepository;
    
    @Override
    public List<Topic> getAllTopics() {
        List<Topic> topics = topicRepository.findAll();
        return topics;
    }

    @Override
    public Topic getTopicById(Long id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new TopicNotFoundException(id));
        return topic;
    }

    @Override
    public Topic addTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    @Override
    public Topic updateTopic(Topic topicToUpdate, Long id) {
        Topic topic = topicRepository.findById(id).get();
        topic.setContent(topicToUpdate.getContent());
        topic.setCreator(topicToUpdate.getCreator());
        Topic _topic = topicRepository.save(topic);
        return _topic;
    }

    @Override
    public void deleteTopic(Long id) {
        topicRepository.deleteById(id);
        messageRepository.deleteByTopicId(id);
    }
}
