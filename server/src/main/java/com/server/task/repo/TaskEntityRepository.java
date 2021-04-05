
package com.server.task.repo;

import com.server.task.model.TaskEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskEntityRepository extends CrudRepository<TaskEntity, String> {
    TaskEntity findById(Long idl);
}
