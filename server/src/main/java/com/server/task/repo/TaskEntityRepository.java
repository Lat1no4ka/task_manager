
package com.server.task.repo;

import com.server.task.model.entity.TaskEntity;
import com.server.task.model.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskEntityRepository extends CrudRepository<TaskEntity, String> {
    TaskEntity findById(Long id);
    List<UserEntity> findByAuthor(Long authorId);
    List<TaskEntity> findByParentId(Long parentId);
    List<TaskEntity> findByEmployee(UserEntity emp);
    List<TaskEntity> findByEmployeeAndParentIdIsNull(UserEntity emp);
    List<TaskEntity> findByEmployeeAndAuthorAndParentIdIsNull(UserEntity employee, UserEntity author);
}
