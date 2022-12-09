package com.myforum.myforum.repository;

import com.myforum.myforum.models.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TestRepository extends JpaRepository<Test, Long> {
    List<Test> findAll();

    Test findById(Integer id);
}
