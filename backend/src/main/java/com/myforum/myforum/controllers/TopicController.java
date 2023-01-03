package com.myforum.myforum.controllers;
import com.myforum.myforum.models.Topic;
import com.myforum.myforum.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
public class TopicController {
    
    @Autowired
    private TopicService topicService;

    @GetMapping("/topics")
    public List<Topic> getAllTopics(){
        return topicService.getAllTopics();
    }

    @GetMapping("/topics/{id}")
    public Optional<Topic> getTopicById(@PathVariable(value = "id") Long Id) {
        return topicService.getTopicById(Id);
    }

    @PostMapping("/topics")
    public Topic createTopic(@RequestBody Topic topic) {
        return topicService.addTopic(topic);
    }

    @PutMapping("topics/{id}")
    public Topic updateTopic(@PathVariable(value = "id") Long topicId, @RequestBody Topic topicRequest) {
        return topicService.updateTopic(topicRequest, topicId);
    }

    @DeleteMapping("/topics/{id}")
	public ResponseEntity<HttpStatus> deleteTopic(@PathVariable("id") long id) {
        topicService.deleteTopic(id);
        return new ResponseEntity<>(HttpStatus.OK);
	}


}
