package com.server.task.controller;


import com.server.task.model.User;
import com.server.task.repo.UserRepository;
import com.server.task.repo.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AuthController {

    @Autowired
    UserSessionRepository ActiveUser;

    @Autowired
    UserRepository UserRep;




    @RequestMapping(value = {"/auth"},method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public User auth(@RequestBody User data) {
        User res = UserRep.findByEmail("test");
        return res;
    }

    @RequestMapping("/test")
    public String test() {
        return "test";
    }

}
