package com.server.task.controller;

import com.server.task.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.server.task.model.Task;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AddTaskController
{
    @Autowired
    TaskRepository taskRepository;

    @RequestMapping(value={"/addTask"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task addNewTaskPiece(@RequestBody Task task)
    {
        taskRepository.save(task);
        return task;
    }

    @RequestMapping(value={"/delete"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task deleteTask(@RequestBody Task task)
    {
        taskRepository.delete(task);
        return task;
    }

    //TODO обновить фронд под новые функции в UserController (2 нижних уходят)

    @RequestMapping(value={"/listTask"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<Task> ListTask(@RequestBody Task task)
    {
        String empl = task.getEmpid();
        List<Task> emplist = taskRepository.findByempid(empl);
        return emplist;
    }

    @RequestMapping(value={"/listTaskId"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<Task> ListTaskId(@RequestBody Task task)
    {
        Long idl = task.getId();
        List<Task> idlist = taskRepository.findById(idl);
        return idlist;
    }

    //ловит id родителя и кидает его подзадачи
    @RequestMapping(value={"/getSubtasks"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<Task> ListSubtask(@RequestBody Task task)
    {
        Long parid = task.getId();
        List<Task> subtlist = taskRepository.findByparid(parid);
        return subtlist;
    }






}