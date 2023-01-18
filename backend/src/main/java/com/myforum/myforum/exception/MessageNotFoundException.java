package com.myforum.myforum.exception;

public class MessageNotFoundException extends RuntimeException{
    
    public MessageNotFoundException(Long id) {

        super(String.format("Message with Id %d not found", id));
    }
}
