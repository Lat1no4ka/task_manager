package com.server.task.controller;

import com.server.task.model.dictionary.Status;
import com.server.task.repo.StatusDirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class StatusDirController {

    @Autowired
    StatusDirRepository statusDirRepository;

    @RequestMapping(value={"/getStatus"}, headers = {"Content-type=application/json"}, method= RequestMethod.GET)
    public List<Status> GetStatus()
    {
        return statusDirRepository.findAll();
    }

}
