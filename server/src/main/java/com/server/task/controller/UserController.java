package com.server.task.controller;


import com.server.task.interfaces.TokenService;
import com.server.task.model.Task;
import com.server.task.model.User;
import com.server.task.model.UserSession;
import com.server.task.repo.UserRepository;
import com.server.task.repo.UserSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class UserController {

    @Autowired
    UserSessionRepository ActiveUser;
    @Autowired
    UserRepository userRepository;

/* Тестовая поебень, при надобности - врубите (просто выводит пользоваетля по id)
    @RequestMapping(value={"/userTest"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<User> ListUserTest(@RequestBody User user)
    {
        Long idl = user.getId();
        List<User> list1 = userRepository.findById(idl);
        return list1;
    }
*/
    //вывод всех пользователей
    @RequestMapping(value={"/allUsers"}, method=RequestMethod.GET, headers = {"Content-type=application/json"})
    public List<User> ListAllUsers()
    {
        return userRepository.findAll();
    }

    //Ловит лист id, юзеров
    @RequestMapping(value={"/sendUsersId"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<User> ListUsersById(@RequestBody List<User> user)
    {
        List<User> usrList = new ArrayList<>();

        for (int i=0; i<user.size(); i++)
        {
            User usr = user.get(i);
            Long idu = usr.getId();
            User ousr = userRepository.findById(idu);
            usrList.add(ousr);
        }

        return usrList;
    }

    //выводит set задач пользователя по id
    @RequestMapping(value={"/listUsersTasks"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Set<Task> ListUsersTasks(@RequestBody User user)
    {
        Long idl = user.getId();
        User usr1 = userRepository.findById(idl);
        return usr1.getTasks();
    }



}
