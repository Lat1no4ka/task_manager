
package com.server.task.repo;

import com.server.task.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, String> {
    List<Task> findByempid(Long empid);
    Task findById(Long idl);
    List<Task> findByparid(Long pid);
    List<Task> findByheadid(Long headid);
    Task findFirstByHeadidOrderByIdDesc (Long headid);
}
