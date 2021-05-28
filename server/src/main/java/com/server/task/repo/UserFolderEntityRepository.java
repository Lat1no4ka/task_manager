package com.server.task.repo;

import com.server.task.model.User;
import com.server.task.model.entity.UserFolderEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFolderEntityRepository extends CrudRepository<UserFolderEntity, String>{
    List<UserFolderEntity> findAll();
    UserFolderEntity findById(Long id);
}
