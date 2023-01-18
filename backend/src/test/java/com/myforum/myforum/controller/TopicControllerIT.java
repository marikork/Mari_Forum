package com.myforum.myforum.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.myforum.myforum.models.Topic;
import com.myforum.myforum.repository.TopicRepository;
import com.myforum.myforum.service.TopicService;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@SpringBootTest
public class TopicControllerIT {
    @Autowired 
    TopicRepository topicRepository;

    @Autowired 
    TopicService topicService;

    @Test
    public void GetAllTopics_ReturnsListOfTopics() throws Exception 
    {
        List<Topic> topics=topicService.getAllTopics();
        int size = topics.size();

        assertTrue(size > 0);
    }

    @Test
    public void getTopicById_GiveId_GetCorrectTopic() throws Exception 
    {
        long id = 4;
        //Optional<Topic> topic=topicService.getTopicById(id);
        Topic topic=topicService.getTopicById(id);
        //String actualCreator = topic.get().getCreator();
        String actualCreator = topic.getCreator();
        //Long actualId = topic.get().getId();
        Long actualId = topic.getId();

        assertEquals("user1", actualCreator);
        assertEquals(id, actualId);
    }
    
    @Test
    public void AddTopic_CreateNewTopic() throws Exception 
    {
        List<Topic> topics=topicService.getAllTopics();
        int size = topics.size();
        Topic topic = new Topic();
        topic.setContent("testing");
        topic.setCreator("user1");
        topic.setMessages(null);
        topicService.addTopic(topic);
        List<Topic> topicsAfter=topicService.getAllTopics();
        int sizeAfter = topicsAfter.size();

        assertEquals(size + 1, sizeAfter);
    }

    @Test
    public void UpdateTopic_GiveNewContent_ContentChangedAfterUpdate() throws Exception 
    {
        long id = 14;
        Topic topic = new Topic();
        topic.setContent("updated");
        topic.setCreator("user1");
        topic.setMessages(null);
        topicService.updateTopic(topic, id);
        //Optional<Topic> topicUpdated=topicService.getTopicById(id);
        Topic topicUpdated=topicService.getTopicById(id);
        //String updatedContent = topicUpdated.get().getContent();
        String updatedContent = topicUpdated.getContent();

        assertEquals("updated", updatedContent);
        topic.setContent("testing");
        topicService.updateTopic(topic, id);
    }

    @Test
    public void DeleteTopic_CreateNewTopicAndDeleteIt_TopicIsDeleted() throws Exception 
    {
        Topic topic = new Topic();
        topic.setContent("testing delete");
        topic.setCreator("user1");
        topic.setMessages(null);
        topicService.addTopic(topic);
        List<Topic> topics=topicService.getAllTopics();
        int sizeBeforeDeleting = topics.size();
        Topic lastInList = topics.get(topics.size() - 1);
        Long idBeforeDeleting = lastInList.getId();
        topicService.deleteTopic(idBeforeDeleting);

        List<Topic> topicsAfterDeleting=topicService.getAllTopics();
        int sizeAfterDeleting = topicsAfterDeleting.size();
        
        assertEquals(sizeBeforeDeleting - 1, sizeAfterDeleting);
    }
}


