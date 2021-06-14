package com.server.task.controller;


import com.server.task.interfaces.TokenService;
import com.server.task.model.User;
import com.server.task.model.UserAuth;
import com.server.task.model.entity.UserEntity;
import com.server.task.repo.UserAuthRepository;
import com.server.task.repo.UserRepository;
import com.server.task.controller.UserController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AuthController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserAuthRepository userAuthRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    TokenService tokenService;
    @Autowired
    UserController userController;


    @RequestMapping(value = {"/auth"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public UserAuth auth(@RequestBody UserAuth data) {
        String name = data.getUserName();
        UserAuth user = userAuthRepository.findByUserName(name);
        if(Objects.isNull(user)){
            return  null;
        }
        if (bCryptPasswordEncoder.matches(data.getPassword(), user.getPassword()) && user.getBlocked()==null) {
            user.setToken(tokenService.getJWTToken(name));
            return user;
        }
        return null;
    }

    @RequestMapping(value = {"/registerUser"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public String registerUser(@RequestBody User user) {
        String name = user.getUserName();
        if (user.getPassword().length() < 4 || user.getUserName().length() < 4) {
            return "reg error";
        }
        if (userRepository.findByUserName(name) == null) {
            try {
                String password = bCryptPasswordEncoder.encode(user.getPassword());
                user.setPassword(password);
                userRepository.save(user);
                userController.newUserSettings(user);
                return "successful";
            } catch (Exception e) {
                return "reg error";
            }
        } else {
            return "added";
        }
    }


}
