package com.myforum.myforum.repository;

import com.myforum.myforum.models.Topic;
import com.myforum.myforum.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long>{
    Message save(Message message);

    List<Message> findByTopicId(Long topic_Id);

    List<Message> findAll();
}
