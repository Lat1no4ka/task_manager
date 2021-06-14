
package com.server.task.repo;

import com.server.task.model.Files;
import com.server.task.model.entity.TaskEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FilesRepository extends CrudRepository<Files, String> {
    Files findById(Long id);
    List<Files> findByTaskId(Long id);
    Files findByFileName(String filename);
}
