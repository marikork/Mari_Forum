package com.myforum.myforum.repository;

import com.myforum.myforum.models.Test;
import com.myforum.myforum.models.Topic;
import com.myforum.myforum.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long>{
    List<Topic> findAll();

    Topic save(Topic topic);



}
