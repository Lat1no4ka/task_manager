//Нихуя не понимаю как это работает

package com.server.task.repo;

import com.server.task.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

import com.server.task.model.Task;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, String> {

    public void save(Task taskexp)
    {


    }

    public void delete(Task Taskexp)
    {


    }

}
