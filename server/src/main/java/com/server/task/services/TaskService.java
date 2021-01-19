package com.server.task.services;

import com.server.task.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService
{
    Task addTask(Task task);
    void delete(long id);
    //Не ебу какие нужны, напиши - я добавлю
    //Могу несколько отдельных методов ебануть в репозитории если надо

}

