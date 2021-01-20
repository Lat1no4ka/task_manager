package com.server.task.repo;

import com.server.task.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.server.task.model.UserSession;

@Repository
public interface UserRepository extends CrudRepository<UserSession, String>{
    User findByUserName(String name);
}
