package com.myforum.myforum.controllers;
import com.myforum.myforum.models.Message;
import com.myforum.myforum.models.Topic;
import com.myforum.myforum.repository.TestRepository;
import com.myforum.myforum.repository.TopicRepository;
import com.myforum.myforum.repository.MessageRepository;
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

    @Autowired
    MessageRepository messageRepository;

    @GetMapping("/topics")
    public ResponseEntity<List<Topic>> AllTopics(){
        List<Topic> topics=topicRepository.findAll();
        //topics.stream().map(t -> t.getMessages());
        return ResponseEntity.ok().body(topics);
    }

    @GetMapping("/topics/{id}")
    public ResponseEntity<Optional<Topic>> getTopicById(@PathVariable(value = "id") Long Id) {

        return ResponseEntity.ok().body(topicRepository.findById(Id));
    }

    @PostMapping("/topics")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        try {
            Topic _topic = topicRepository.save(topic);
            return new ResponseEntity<>(_topic, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/topics/{id}/messages")
    public ResponseEntity<List<Message>> getAllMessagesByTopicId(@PathVariable(value = "id") Long topicId) {

        if (!topicRepository.existsById(topicId)) {
            throw new Error("Not found Topic with id = " + topicId);
        }

        List<Message> messages = messageRepository.findByTopicId(topicId);
        //System.out.println(messages);
        //return new ResponseEntity<>(messages, HttpStatus.OK);
        return ResponseEntity.ok().body(messages);
    }

    @PostMapping("/topics/{id}/messages")
    public ResponseEntity<Message> createMessage(@PathVariable(value = "id")
                                                     Long topicId, @RequestBody Message messageRequest) {

        Message message = topicRepository.findById(topicId).map(topic -> {
            messageRequest.setTopicId(topicId);
            return messageRepository.save(messageRequest);
        }).orElseThrow(() -> new Error("Not found topic with id = " + topicId));

        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PutMapping("messages/{id}")
    public ResponseEntity<Message> updateMessages(@PathVariable(value = "id")
                                                     Long messageId, @RequestBody Message messageRequest) {

        Message message = messageRepository.findById(messageId).get();
        message.setMessage(messageRequest.getMessage());
        message.setTimeCreated(message.getTimeCreated());
        message.setWriter(message.getWriter());
        
        if(message != null){
            try {
                Message _message = messageRepository.save(message);
                return new ResponseEntity<Message>(_message, HttpStatus.OK);
            } catch (Exception e) {
                System.out.println(e);
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PutMapping("topics/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable(value = "id")
                                                     Long topicId, @RequestBody Topic topicRequest) {

        Topic topic = topicRepository.findById(topicId).get();
        topic.setContent(topicRequest.getContent());
        topic.setCreator(topicRequest.getCreator());
        
        if(topic != null){
            try {
                Topic _topic = topicRepository.save(topic);
                return new ResponseEntity<Topic>(_topic, HttpStatus.OK);
            } catch (Exception e) {
                System.out.println(e);
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return null;
    }

    @DeleteMapping("/topics/{id}")
	public ResponseEntity<HttpStatus> deleteTopic(@PathVariable("id") long id) {
        System.out.println(id);
		try {
			topicRepository.deleteById(id);
            messageRepository.deleteByTopicId(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


}
