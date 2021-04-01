
package com.server.task.repo;

import com.server.task.model.Task;
import com.server.task.model.UTconnector;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UTconnectorRepository extends CrudRepository<UTconnector, String> {
    List<UTconnector> findBycTaskId(Long tid);
}
