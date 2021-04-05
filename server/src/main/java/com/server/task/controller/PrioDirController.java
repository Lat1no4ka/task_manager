package com.server.task.controller;

import com.server.task.repo.PrioDirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.server.task.model.dictionary.Priority;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class PrioDirController {

    @Autowired
    PrioDirRepository prioDirRepository;

    @RequestMapping(value={"/getPriority"}, headers = {"Content-type=application/json"}, method= RequestMethod.GET)
    public List<Priority> GetPriority()
    {
        return prioDirRepository.findAll();
    }



}
