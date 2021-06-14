
package com.server.task.repo;

import com.server.task.model.Task;
import com.server.task.model.entity.MainTaskEntity;
import com.server.task.model.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MainTaskEntityRepository extends CrudRepository<MainTaskEntity, String> {
    List<MainTaskEntity> findAll();
    MainTaskEntity findById(Long id);
}
