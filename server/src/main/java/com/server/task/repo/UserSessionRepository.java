package com.server.task.repo;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.server.task.model.UserSession;

@Repository
public interface UserSessionRepository extends CrudRepository<UserSession, String> {}
