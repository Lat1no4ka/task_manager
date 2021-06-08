
package com.server.task.repo;

import com.server.task.model.ChatFiles;
import com.server.task.model.Files;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatFilesRepository extends CrudRepository<ChatFiles, String> {
    ChatFiles findById(Long id);
    List<ChatFiles> findByMessageId(Long id);
    List<ChatFiles> findAll();
}
