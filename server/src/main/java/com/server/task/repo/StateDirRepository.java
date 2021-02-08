package com.server.task.repo;

import com.server.task.model.StateDir;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateDirRepository extends CrudRepository<StateDir, String> {
    List<StateDir> findAll();
}
