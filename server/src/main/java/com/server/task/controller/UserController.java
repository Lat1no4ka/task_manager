package com.server.task.controller;


import com.server.task.model.User;
import com.server.task.model.entity.UserAlterEntity;
import com.server.task.model.entity.UserEntity;
import com.server.task.repo.UserRepository;
import com.server.task.repo.UserEntityRepository;
import com.server.task.repo.UserAlterEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserAlterEntityRepository userAlterEntityRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    UserEntityRepository userEntityRepository;

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
    @RequestMapping(value={"/listUsers"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<UserEntity> ListUsersById(@RequestBody List<User> user)
    {
        List<UserEntity> usrList = new ArrayList<>();

        for (int i=0; i<user.size(); i++)
        {
            User usr = user.get(i);
            Long idu = usr.getId();
            UserEntity ousr = userEntityRepository.findById(idu);
            usrList.add(ousr);
        }

        return usrList;
    }

    //изменение Пользователя
    @RequestMapping(value={"/alterUser"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public String ListUsersById(@RequestBody UserAlterEntity user)
    {
        User newusr = userRepository.findById(user.getId());

        if (user.getUserName()!=null) {
            String name = user.getUserName();
            if (userRepository.findByUserName(name) == null) {
                    newusr.setUserName(name);
            }
            else {return "Данное имя пользователя уже занято";}
        }
        if (user.getEmail()!=null){newusr.setEmail(user.getEmail());}
        if (user.getFirstName()!=null){newusr.setFirstName(user.getFirstName());}
        if (user.getLastName()!=null){newusr.setLastName(user.getLastName());}

        //проверка старого пароля на соответствие, запись нового пароля
        if (user.getPassword()!=null && user.getNewPassword()!=null){
                if(bCryptPasswordEncoder.matches(user.getPassword(), newusr.getPassword())){
                    newusr.setPassword(bCryptPasswordEncoder.encode(user.getNewPassword()));
                }
                else{return user.getPassword() + " ___ " + " ___ " + newusr.getPassword();}
        }

        //Старое изменение - просто заменяет пароль
        //if (user.getPassword()!=null){newusr.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));}

        userRepository.save(newusr);
        return "Информация обновлена";
    }


}
