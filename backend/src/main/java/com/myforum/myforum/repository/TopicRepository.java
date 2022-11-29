package com.myforum.myforum.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.myforum.myforum.models.Topic;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, Long>{
    List<Topic> findAll();
}
