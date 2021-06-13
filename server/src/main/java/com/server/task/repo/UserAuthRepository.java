package com.server.task.repo;

import com.server.task.model.UserAuth;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAuthRepository extends CrudRepository<UserAuth, String>{
    UserAuth findByUserName(String name);
    UserAuth findById(Long id);
}
