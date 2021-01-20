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

    @RequestMapping(value = "/addTask", method=RequestMethod.GET)
    public String addNewTaskPage()
    {
        //ебануть страницу, а то некуда ходить.
        return "addTask";

    }


    //Я построил непроходимую стену, разворачивайся и уходи
    @RequestMapping(value="/addTask", method=RequestMethod.POST)
    public String addNewTaskPiece(@RequestParam(value="headid") String headid, @RequestParam(value="empid") String empid, @RequestParam(value="taskname") String taskname, @RequestParam(value="taskdesc") String taskdesc, @RequestParam(value="expdate") String expdate, @RequestParam(value="taskpriority") String taskpriority, @RequestParam(value="taskstatus") String taskstatus)
    {
        Task taskexp = new Task();
        taskexp.setHeadID(headid);
        taskexp.setEmpId(empid);
        taskexp.setTaskName(taskname);
        taskexp.setTascDesc(taskdesc);
        taskexp.setExpDate(expdate);
        taskexp.setTaskPriority(taskpriority);
        taskexp.setTaskStatus(taskstatus);

        TaskServ.save(taskexp); //дописать сервис и имплементацию для отправки в БД (дописал)
        return "redirect:/";
    }

    @RequestMapping(value="delete/{id}", method=RequestMethod.GET)
    public String deleteTask(@PathVariable Integer id)
    {
        Task taskexp = TaskServ.getById(id);
        TaskServ.delete(taskexp); // Удаляю из БД
        return "redirect:/";
    }



}