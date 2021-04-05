package com.server.task.repo;

import com.server.task.model.User;
import com.server.task.model.UserAlterEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAlterEntityRepository extends CrudRepository<UserAlterEntity, String>{
    UserAlterEntity findById(Long idl);
}
