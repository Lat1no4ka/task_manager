package com.server.task.repo;

import com.server.task.model.dictionary.Status;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusDirRepository extends CrudRepository<Status, String> {
    List<Status> findAll();
    List<Status> getById(Long id);
}
