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

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
        userStat.setNewTask(stat1);
        userStat.setWorkTask(stat2);
        userStat.setCheckTask(stat3);
        userStat.setRevisionTask(stat4);
        userStat.setAcceptedTask(stat5);
        userStat.setClosedTask(stat6);
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
            userStat.setNewTask(stat1);
            userStat.setWorkTask(stat2);
            userStat.setCheckTask(stat3);
            userStat.setRevisionTask(stat4);
            userStat.setAcceptedTask(stat5);
            userStat.setClosedTask(stat6);
            allStat.add(userStat);
        }
        return allStat;
    }

    //получает статистику для конкретного пользователя
    @RequestMapping(value={"/getDateTasks"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Statistics DateUserStat(@RequestParam("beginDate") Date begin, @RequestParam("endDate") Date end, @RequestParam("userId") Long userId) throws ParseException {
        List<TaskEntity> allTasks = taskEntityRepository.findByEmployee(userEntityRepository.findById(userId));
        List<TaskEntity> dateTasks = new ArrayList<>();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        //Date beginBorder = format.parse(begin);
       // Date endBorder = format.parse(end);
        for (TaskEntity task : allTasks){
            Date taskBegDate = format.parse(task.getBegDate());
            Date taskEndDate = format.parse(task.getEndDate());
            if (taskBegDate.after(begin) && taskEndDate.before(end)){
                dateTasks.add(task);
            }
        }
        Statistics userStat = new Statistics();
        userStat.setTaskCounter(dateTasks.size());
        userStat.setUser(userEntityRepository.findById(userId));
        int stat1 = 0;
        int stat2 = 0;
        int stat3 = 0;
        int stat4 = 0;
        int stat5 = 0;
        int stat6 = 0;
        List<Long> statList = new ArrayList<>();
        for (TaskEntity tasks : dateTasks) {
            if((tasks.getStatus()).getId()==1){ stat1+=1; }
            if((tasks.getStatus()).getId()==2){ stat2+=1; }
            if((tasks.getStatus()).getId()==3){ stat3+=1; }
            if((tasks.getStatus()).getId()==4){ stat4+=1; }
            if((tasks.getStatus()).getId()==5){ stat5+=1; }
            if((tasks.getStatus()).getId()==6){ stat6+=1; }
        }
        userStat.setNewTask(stat1);
        userStat.setWorkTask(stat2);
        userStat.setCheckTask(stat3);
        userStat.setRevisionTask(stat4);
        userStat.setAcceptedTask(stat5);
        userStat.setClosedTask(stat6);
        return userStat;
    }


}
