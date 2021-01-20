package com.server.task.controller;

import com.server.task.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.server.task.model.Task;


@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AddTaskController
{
    @Autowired
    TaskRepository taskRepository;

    @RequestMapping(value="/addTask", method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task addNewTaskPiece(@RequestBody Task task)
    {
        taskRepository.save(task);
        return task;
    }

    @RequestMapping(value="delete", method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task deleteTask(@RequestBody Task task)
    {
        taskRepository.delete(task);
        return task;
    }



}