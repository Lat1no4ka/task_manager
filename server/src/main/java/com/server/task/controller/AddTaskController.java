package com.server.task.controller;

import com.server.task.model.dictionary.Status;
import com.server.task.model.entity.TaskEntity;
import com.server.task.model.entity.TaskAlterEntity;
import com.server.task.model.User;
import com.server.task.model.entity.UserEntity;
import com.server.task.repo.TaskRepository;
import com.server.task.repo.FilesRepository;
import com.server.task.repo.TaskEntityRepository;
import com.server.task.repo.UTconnectorRepository;
import com.server.task.repo.UserRepository;
import com.server.task.repo.UserEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.server.task.model.Files;
import com.server.task.model.Task;
import com.server.task.model.UTconnector;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AddTaskController {
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UTconnectorRepository utRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserEntityRepository userEntityRepository;
    @Autowired
    TaskEntityRepository taskEntityRepository;
    @Autowired
    FilesRepository filesRepository;


    @RequestMapping(value = {"/addTaskOld"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task addNewTaskPiece(@RequestBody Task task) {
        taskRepository.save(task);
        return task;
    }

    //новый вариант создания задачи, сразу добавляет связь в таблицу UTconnector, возвращает id
    @RequestMapping(value = {"/addTask"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public Long addNewTask(@RequestBody Task task) {

        if (task.getBegDate()==null) {
            task.setBegDate(new Date());
        }
        taskRepository.save(task);
        UTconnector link = new UTconnector();
        link.setUserId(task.getEmployee());
        link.setTaskId(task.getId());
        utRepository.save(link);
        Task usrTask = taskRepository.findFirstByAuthorIdOrderByIdDesc(task.getAuthor());
        return usrTask.getId();
    }


    //создание подзадачи, ловит List тел и записывет их.
    @RequestMapping(value = {"/addSubtask"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public List addNewSubtask(@RequestBody List<Task> tasks) {
        List<UTconnector> subLinkList = new ArrayList<>();
        taskRepository.saveAll(tasks);
        for (int i = 0; i < tasks.size(); i++) {
            Task subtsk = tasks.get(i);
            UTconnector link = new UTconnector();
            link.setUserId(subtsk.getEmployee());
            link.setTaskId(subtsk.getId());
            subLinkList.add(link);
        }
        utRepository.saveAll(subLinkList);
        return tasks;
    }

    //Изменение задач (необходимо добавить в JSON id изменяемой задачи)
    @RequestMapping(value = {"/alterTask"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public UTconnector alterTask(@RequestBody TaskAlterEntity task) {
        UTconnector link = new UTconnector();
        Task newtask = taskRepository.findById(task.getId());
        if (task.getTaskName()!=null){newtask.setTaskName(task.getTaskName());}
        if (task.getTaskDesc()!=null){newtask.setTaskDesc(task.getTaskDesc());}
        //if (task.getBegDate()!=null){newtask.setBegDate(task.getBegDate());}
        if (task.getEndDate()!=null){newtask.setEndDate(task.getEndDate());}
        if (task.getEmployee()!=null){
            link = utRepository.findByUserIdAndTaskId(newtask.getEmployee(), task.getId());
            link.setUserId(task.getEmployee());
            utRepository.save(link);
            newtask.setEmployee(task.getEmployee());
        }
        if (task.getPriority()!=null){newtask.setPriority(task.getPriority());}
        if (task.getStatus()!=null){newtask.setStatus(task.getStatus());}
        taskRepository.save(newtask);
        return link;
    }

    //удаление задачи, подзадач и чистка UT. ловит id задачи
    @RequestMapping(value = {"/deleteTask"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public String deleteTask(@RequestBody Task task) {
        Task removeTask = taskRepository.findById(task.getId());
        List<UTconnector> removeLink = utRepository.findByTaskId(task.getId());
        List<Task> removeSubtask = taskRepository.findByParentId(task.getId());
        List<Files> removeFiles = filesRepository.findByTaskId(task.getId());
        utRepository.deleteAll(removeLink);
        filesRepository.deleteAll(removeFiles);
        taskRepository.delete(removeTask);
        if (!removeSubtask.isEmpty()) {
            for (Task tasks : removeSubtask) {
                utRepository.deleteAll(utRepository.findByTaskId(tasks.getId()));
                List<Files> removeSubFiles = filesRepository.findByTaskId(tasks.getId());
                filesRepository.deleteAll(removeSubFiles);
            }
            taskRepository.deleteAll(removeSubtask);
        }


        return "Задание удалено";
    }

    //ловит id родительской задачи и кидает его подзадачи
    @RequestMapping(value = {"/getSubtasks"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<TaskEntity> ListSubtask(@RequestBody TaskEntity task) {
        Long parentId = task.getId();
        List<TaskEntity> subTaskList = taskEntityRepository.findByParentId(parentId);
        return subTaskList;
    }

    //выводит set родительских задач по id пользователя
    @RequestMapping(value = {"/getTasks"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public Set<TaskEntity> ListUsersTasks(@RequestBody UserEntity user) {
        User findUser = userRepository.findById(user.getId());
        List<TaskEntity> taskListEmp = findUser.getTasks();
        List<Task> taskListAut = (taskRepository.findByAuthorId(user.getId()));
        Set parTasksSet = new HashSet<>();

        //Ищет задачи, где пользователь - автор
        for (Task tasks : taskListAut) {
           TaskEntity task = taskEntityRepository.findById(tasks.getId());
            if (task.getParentId() == null) {
                parTasksSet.add(task);
            }
            else{
                parTasksSet.add(taskEntityRepository.findById(task.getParentId()));
            }
        }

        //Ищет задачи, где пользователь - исполнитель
        for (TaskEntity tasks : taskListEmp) {
            if (tasks.getParentId() == null) {
                parTasksSet.add(tasks);
            }
            else{
                parTasksSet.add(taskEntityRepository.findById(tasks.getParentId()));
            }
        }
        return parTasksSet;
    }

    @RequestMapping(value={"/getDate"}, headers = {"Content-type=application/json"}, method= RequestMethod.GET)
    public Date GetStatus()
    {
        Date sysdate = new Date();
        return sysdate;
    }

    //ловит id родительской задачи и выводит список всех пользователей
    @RequestMapping(value = {"/getTaskUsers"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public Set<UserEntity> ListTaskUsers(@RequestBody TaskEntity task) {
        Long parentId = task.getId();
        TaskEntity maintask = taskEntityRepository.findById(parentId);
        List<UTconnector> utList = utRepository.findByTaskId(parentId);
        Set<UserEntity> userSet = new HashSet<>();
        userSet.add(maintask.getAuthor());
        for (UTconnector users : utList) {
            userSet.add(userEntityRepository.findById(users.getUserId()));
        }
        List<TaskEntity> subTaskList = taskEntityRepository.findByParentId(parentId);
        for (TaskEntity tasks : subTaskList) {
            List<UTconnector> utLists = utRepository.findByTaskId(tasks.getId());
            for (UTconnector userd : utLists) {
                userSet.add(userEntityRepository.findById(userd.getUserId()));
            }
        }

        return userSet;
    }

}