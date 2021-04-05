package com.server.task.repo;

import com.server.task.model.entity.UserAlterEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAlterEntityRepository extends CrudRepository<UserAlterEntity, String>{
    UserAlterEntity findById(Long id);
}
