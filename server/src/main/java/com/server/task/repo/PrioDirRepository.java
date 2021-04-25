package com.server.task.repo;

import com.server.task.model.dictionary.Priority;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrioDirRepository extends CrudRepository<Priority, String> {
    List<Priority> findAll();
    List<Priority> getById(Long id);
}
