//Нихуя не понимаю как это работает

package com.server.task.repo;

import com.server.task.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.server.task.model.task;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, String> {

    void save();

    void delete();
}
