package com.server.task.controller;

import com.server.task.model.StateDir;
import com.server.task.repo.StateDirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class StateDirController {

    @Autowired
    StateDirRepository stateDirRepository;

    @RequestMapping(value={"/getState"}, headers = {"Content-type=application/json"}, method= RequestMethod.GET)
    public List<StateDir> GetState()
    {
        return stateDirRepository.findAll();
    }



}
