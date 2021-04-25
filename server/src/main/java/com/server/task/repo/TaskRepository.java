
package com.server.task.repo;

import com.server.task.model.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, String> {
    List<Task> findByEmployeeId(Long employeeId);
    Task findById(Long id);
    List<Task> findByParentId(Long parentId);
    List<Task> findByAuthorId(Long authorId);
    Task findFirstByAuthorIdOrderByIdDesc (Long authorId);
}
