package com.server.task.controller;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.stereotype.Controller;

import com.server.task.model.Task;
import com.server.task.repo.TaskRepository;

import javax.annotation.Resource;
import java.util.List;


@RestController
@RequestMapping(produces = "application/json")
@ResponseBody

public class AddTask
{

    @RequestMapping(value = "/test", method=RequestMethod.GET)
    public String addNewTaskPage()
    {
        return "GayLord228";
    }











}