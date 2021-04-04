package com.server.task.controller;


import com.server.task.model.Task;
import com.server.task.model.User;
import com.server.task.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class UserController {

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
        List<User> Users = userRepository.findAll();
        for(User user: Users) {
            user.setPassword("");
        }
        return Users;
    }

    //Ловит лист id, выводит список юзеров
    @RequestMapping(value={"/sendUsersId"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<User> ListUsersById(@RequestBody List<User> user)
    {
        List<User> usrList = new ArrayList<>();

        for (int i=0; i<user.size(); i++)
        {
            User usr = user.get(i);
            Long idu = usr.getId();
            User ousr = userRepository.findById(idu);
            ousr.setPassword("");
            usrList.add(ousr);
        }

        return usrList;
    }
}
