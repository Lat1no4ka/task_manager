package com.server.task.repo;

import com.server.task.model.User;
import com.server.task.model.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserEntityRepository extends CrudRepository<UserEntity, String>{
    UserEntity findById(Long id);
    UserEntity findByPictureId(Long id);
    List<UserEntity> findAll();
}
