package com.server.task.controller;

import com.server.task.model.dictionary.Role;
import com.server.task.repo.RoleDirRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class RoleDirController {

    @Autowired
    RoleDirRepository roleDirRepository;

    @RequestMapping(value={"/getRole"}, headers = {"Content-type=application/json"}, method= RequestMethod.GET)
    public List<Role> GetRole()
    {
        return roleDirRepository.findAll();
    }



}
