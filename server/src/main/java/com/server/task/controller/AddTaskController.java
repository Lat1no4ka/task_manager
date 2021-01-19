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
    TaskRepository TaskRep;
    @Autowired
    TaskRepositoryImp TaskRepImp;

    @RequestMapping(value = "/addTask", method=RequestMethod.GET)
    public String addNewTaskPage()
    {
        //ебануть страницу, а то некуда ходить.
        return "addTask";
    }


    @RequestMapping(value="/add-new-order", method=RequestMethod.POST)
    public String addNewTaskPiece(@RequestParam(value="title") String title, @RequestParam(value="price") Double price) {
        Task taskexp = new Task();
        taskexp.setHeadID(headid);
        taskexp.setEmpId(empid);
        taskexp.setTaskName(taskname);
        taskexp.setTascDesc(taskdesc);
        taskexp.setExpDate(expdate);
        taskexp.setTaskPriority(taskpriority);
        taskexp.setTaskStatus(taskstatus);

        TaskRep.save(taskexp); //дописать сервис и имплементацию для отправки в БД
        return "redirect:/";
    }



}