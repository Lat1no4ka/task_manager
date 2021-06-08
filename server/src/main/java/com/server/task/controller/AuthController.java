package com.server.task.controller;


import com.server.task.interfaces.TokenService;
import com.server.task.model.User;
import com.server.task.model.entity.UserEntity;
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
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    TokenService tokenService;
    @Autowired
    UserController userController;


    @RequestMapping(value = {"/auth"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public Map<String, String> auth(@RequestBody User data) {
        String name = data.getUserName();
        User user = userRepository.findByUserName(name);
        if (bCryptPasswordEncoder.matches(data.getPassword(), user.getPassword()) && user.getBlocked()==null) {
            String token = tokenService.getJWTToken(name);
            String key = user.getId().toString();

            Map<String, String> userData = new HashMap<String, String>();
            userData.put("userId", key);
            userData.put("token", token);
            return userData;
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
