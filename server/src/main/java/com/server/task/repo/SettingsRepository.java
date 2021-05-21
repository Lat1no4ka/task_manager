
package com.server.task.repo;

import com.server.task.model.Settings;
import com.server.task.model.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SettingsRepository extends CrudRepository<Settings, String> {
    Settings findByUser(UserEntity user);
    Settings findById(Long id);
}
