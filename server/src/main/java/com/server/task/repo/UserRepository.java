package com.server.task.repo;

import com.server.task.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.server.task.model.UserSession;
import sun.security.util.Password;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
    User findByUserName(String userName);
}