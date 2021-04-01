package com.server.task.repo;

import com.server.task.model.StatusDir;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusDirRepository extends CrudRepository<StatusDir, String> {
    List<StatusDir> findAll();
    List<StatusDir> getById(Long id);
}
