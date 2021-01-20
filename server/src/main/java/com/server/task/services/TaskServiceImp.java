package com.server.task.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.server.task.model.Task;
import com.server.task.service.TaskService;
import com.server.task.repo.TaskRepository;
import com.server.task.repo.TaskRepositoryImp;

@Service
public class TaskServiceImp implements TaskService
{
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task addTask(Task task)
    {
        Task savedtask = taskRepository.save(task);
        return savedtask;
    }

    @Override
    public void delete(long id)
    {
        taskRepository.delete(id);
    }

    @Override
    public Task getById(long id)
    {
        return taskRepository.findById(id);
    }

    @Override
    public Task getByEmpId(string empid)
    {
        return taskRepository.findByEmpId(empid);
    }

    @Override
    public Task editTask(Task task)
    {
        return taskRepository.save(task);
    }
}

