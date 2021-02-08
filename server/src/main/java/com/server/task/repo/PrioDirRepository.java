package com.server.task.repo;

import com.server.task.model.PrioDir;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrioDirRepository extends CrudRepository<PrioDir, String> {
    List<PrioDir> findAll();
}
