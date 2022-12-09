package com.myforum.myforum;
import com.myforum.myforum.models.Topic;
import com.myforum.myforum.repository.TestRepository;
import com.myforum.myforum.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
public class TestController {
    @Autowired
    TestRepository testRepository;
    @Autowired
    TopicRepository topicRepository;
    @GetMapping("/topics")
    public ResponseEntity<List<Topic>> AllTopics(){
        List<Topic> topics=topicRepository.findAll();
        return ResponseEntity.ok().body(topics);
    }

    @GetMapping("/topics/{id}")
    public Optional<Topic> getTopicById(@PathVariable(value = "id") Long Id) {
        return topicRepository.findById(Id);
    }

    @PostMapping("/topics")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        try {
            Topic _topic = topicRepository
                    .save(new Topic(topic.getCreator(), topic.getContent()));
            return new ResponseEntity<>(_topic, HttpStatus.CREATED);
            /*
            Topic _topic = new Topic(topic.getCreator(), topic.getContent());
            System.out.println(_topic.getCreator());
            System.out.println(_topic.getContent());
            System.out.println(_topic.getId());
            topicRepository.save(_topic);
            return new ResponseEntity<>(_topic, HttpStatus.CREATED);
            */
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
