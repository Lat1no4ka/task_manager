
package com.server.task.repo;

import com.server.task.model.entity.FilesEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilesEntityRepository extends CrudRepository<FilesEntity, String> {
}
