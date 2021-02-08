package com.server.task.repo;

import com.server.task.model.RoleDir;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleDirRepository extends CrudRepository<RoleDir, String> {
    List<RoleDir> findAll();
}
