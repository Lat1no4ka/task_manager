
package com.server.task.repo;

import com.server.task.model.Statistics;
import com.server.task.model.User;
import com.server.task.model.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatisticsRepository extends CrudRepository<Statistics, String> {
    List<Statistics> findAll();
    Statistics findByUserId(Long Id);
}
