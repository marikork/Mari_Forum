package com.myforum.myforum;
import com.myforum.myforum.models.Test;
import com.myforum.myforum.models.Topic;
import com.myforum.myforum.repository.TestRepository;
import com.myforum.myforum.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
public class TestController {
    @Autowired
    TestRepository testRepository;
    //TopicRepository topicRepository;
    @GetMapping("/hello")
    public ResponseEntity<List<Test>> hello(){
        List<Test> testit=testRepository.findAll();
        return ResponseEntity.ok().body(testit);
    }

}
