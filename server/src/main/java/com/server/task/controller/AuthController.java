package com.server.task.controller;


import com.server.task.interfaces.TokenService;
import com.server.task.model.User;
import com.server.task.model.UserSession;
import com.server.task.repo.UserRepository;
import com.server.task.repo.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AuthController {

    @Autowired
    UserSessionRepository ActiveUser;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    TokenService tokenService;


    @RequestMapping(value = {"/auth"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public Map<String, String> auth(@RequestBody User data) {
        String name = data.getUserName();
        User user = userRepository.findByUserName(name);
        if (bCryptPasswordEncoder.matches(data.getPassword(), user.getPassword())) {
                String token = tokenService.getJWTToken(name);
            String key = user.getId().toString();
            ActiveUser.save(new UserSession(key, token));
            Map<String, String> userData = new HashMap<String, String>();
            userData.put("userId", key);
            userData.put("token", token);
            return userData;
        }
        return null;
    }

    @RequestMapping(value = {"/checkToken"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public boolean checkToken(@RequestBody Map<String, String> data) {
        if(data.get("userId") == null){
            return false;
        }
        Optional<UserSession> session = ActiveUser.findById(data.get("userId"));
        try {
            String token = session.get().getToken().toString();
            boolean check = data.get("token").matches(token);
            if (check) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @RequestMapping(value = {"/registerUser"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    @ResponseBody
    public String registerUser(@RequestBody User user) {
        String name = user.getUserName();
        if(user.getPassword().length() < 4 || user.getUserName().length()<4){
            return "reg error";
        }
        if(userRepository.findByUserName(name) == null){
            try{
                String password = bCryptPasswordEncoder.encode(user.getPassword());
                user.setPassword(password);
                userRepository.save(user);
                return "successful";
            }catch (Exception e){
                return "reg error";
            }
        }else{
            return "added";
        }
    }


    @RequestMapping("/test")
    public String test() {
        return "test";
    }


}
