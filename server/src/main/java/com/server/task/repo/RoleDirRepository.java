package com.server.task.repo;

import com.server.task.model.dictionary.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleDirRepository extends CrudRepository<Role, String> {
    List<Role> findAll();
    List<Role> getById(Long id);
}
