package com.myforum.myforum;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@RestController
public class TestController {
    @GetMapping("/hello")
    public ResponseEntity<HelloPOJO> hello(){
        return ResponseEntity.ok().body(new HelloPOJO("hello"));
    }
}
