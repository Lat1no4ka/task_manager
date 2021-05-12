package com.server.task.controller;


import com.server.task.model.Statistics;
import com.server.task.model.Task;
import com.server.task.model.User;
import com.server.task.model.dictionary.Status;
import com.server.task.model.entity.TaskEntity;
import com.server.task.model.entity.UserAlterEntity;
import com.server.task.model.entity.UserEntity;
import com.server.task.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class StatisticsController {

    @Autowired
    UserAlterEntityRepository userAlterEntityRepository;
    @Autowired
    UserEntityRepository userEntityRepository;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    TaskEntityRepository taskEntityRepository;
    @Autowired
    StatisticsRepository statisticsRepository;

    /*
    @RequestMapping(value={"/allUsersStat"}, method=RequestMethod.GET, headers = {"Content-type=application/json"})
    public List<Statistics> ListAllUsersStat()
    {
        List<Statistics> stat = statisticsRepository.findAll();
        return stat;
    }
     */

    //получает статистику для конкретного пользователя
    @RequestMapping(value={"/getUserStat"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Statistics UpdateUserStat(@RequestBody UserEntity user)
    {
        Long userId = user.getId();
        Statistics userStat = new Statistics();
        List<TaskEntity> taskList = taskEntityRepository.findByEmployee(user);
        userStat.setTaskCounter(taskList.size());
        userStat.setUser(userEntityRepository.findById(user.getId()));
        int stat1 = 0;
        int stat2 = 0;
        int stat3 = 0;
        int stat4 = 0;
        int stat5 = 0;
        int stat6 = 0;
        List<Long> statList = new ArrayList<>();
        for (TaskEntity tasks : taskList) {
            if((tasks.getStatus()).getId()==1){ stat1+=1; }
            if((tasks.getStatus()).getId()==2){ stat2+=1; }
            if((tasks.getStatus()).getId()==3){ stat3+=1; }
            if((tasks.getStatus()).getId()==4){ stat4+=1; }
            if((tasks.getStatus()).getId()==5){ stat5+=1; }
            if((tasks.getStatus()).getId()==6){ stat6+=1; }
        }
        userStat.setStat1(stat1);
        userStat.setStat2(stat2);
        userStat.setStat3(stat3);
        userStat.setStat4(stat4);
        userStat.setStat5(stat5);
        userStat.setStat6(stat6);
        return userStat;
    }

    //Получает статистику для всех пользователей
    @RequestMapping(value={"/getFullStat"}, method=RequestMethod.GET, headers = {"Content-type=application/json"})
    public List<Statistics> SetUserStat()
    {
        List<Statistics> allStat= new ArrayList<>();
        List<UserEntity> userList = userEntityRepository.findAll();
        for (UserEntity user : userList) {
            Statistics userStat = new Statistics();
            Long userId = user.getId();
            List<TaskEntity> taskList = taskEntityRepository.findByEmployee(user);
            userStat.setUser(userEntityRepository.findById(user.getId()));
            userStat.setTaskCounter(taskList.size());
            int stat1 = 0;
            int stat2 = 0;
            int stat3 = 0;
            int stat4 = 0;
            int stat5 = 0;
            int stat6 = 0;
            List<Long> statList = new ArrayList<>();
            for (TaskEntity tasks : taskList) {
                if ((tasks.getStatus()).getId() == 1) { stat1 += 1; }
                if ((tasks.getStatus()).getId() == 2) { stat2 += 1; }
                if ((tasks.getStatus()).getId() == 3) { stat3 += 1; }
                if ((tasks.getStatus()).getId() == 4) { stat4 += 1; }
                if ((tasks.getStatus()).getId() == 5) { stat5 += 1; }
                if ((tasks.getStatus()).getId() == 6) { stat6 += 1; }
            }
            userStat.setStat1(stat1);
            userStat.setStat2(stat2);
            userStat.setStat3(stat3);
            userStat.setStat4(stat4);
            userStat.setStat5(stat5);
            userStat.setStat6(stat6);
            allStat.add(userStat);
        }
        return allStat;
    }


}