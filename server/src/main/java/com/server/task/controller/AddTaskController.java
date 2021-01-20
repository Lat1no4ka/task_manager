package com.server.task.controller;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.stereotype.Controller;

import com.server.task.model.Task;
import com.server.task.repo.TaskService;
import com.server.task.repo.TaskServiceImp;

import javax.annotation.Resource;
import java.util.List;


@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AddTask
{

    @Autowired
    TaskService TaskServ;
    @Autowired
    TaskServiceImp TaskServImp;


    //Я построил непроходимую стену, разворачивайся и уходи
    @RequestMapping(value="/addTask", method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task addNewTaskPiece(@RequestBody Task task)
    {
        Task taskexp = new Task();

        TaskServ.save(taskexp); //дописать сервис и имплементацию для отправки в БД (дописал)
        return task;
    }

    @RequestMapping(value="delete/{id}", method=RequestMethod.GET, headers = {"Content-type=application/json"})
    public Task deleteTask(@PathVariable Integer id)
    {
        Task taskexp = TaskServ.getById(id);
        TaskServ.delete(taskexp); // Удаляю из БД
        return task;
    }



}