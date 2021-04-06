
package com.server.task.repo;

import com.server.task.model.entity.TaskEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskEntityRepository extends CrudRepository<TaskEntity, String> {
    TaskEntity findById(Long id);
}
