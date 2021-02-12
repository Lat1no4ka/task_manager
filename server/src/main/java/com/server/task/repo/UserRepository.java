package com.server.task.repo;

import com.server.task.model.Task;
import com.server.task.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.server.task.model.UserSession;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String>{
    User findByUserName(String name);
    User findById(Long idl);
}
