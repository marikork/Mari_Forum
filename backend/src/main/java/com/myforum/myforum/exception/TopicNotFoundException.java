package com.myforum.myforum.exception;

public class TopicNotFoundException extends RuntimeException{
    
    public TopicNotFoundException(Long id) {

        super(String.format("Topic with Id %d not found", id));
    }
}
