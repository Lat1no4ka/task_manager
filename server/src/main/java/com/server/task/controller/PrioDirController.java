package com.server.task.controller;

import com.server.task.model.Task;
import com.server.task.repo.PrioDirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.server.task.model.PrioDir;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class PrioDirController {

    @Autowired
    PrioDirRepository prioDirRepository;

    @RequestMapping(value={"/getPriority"}, headers = {"Content-type=application/json"}, method= RequestMethod.GET)
    public List<PrioDir> GetPriority()
    {
        return prioDirRepository.findAll();
    }



}
