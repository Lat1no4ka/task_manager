package com.server.task.controller;

import com.server.task.model.*;
import com.server.task.model.dictionary.Status;
import com.server.task.model.entity.TaskEntity;
import com.server.task.model.entity.TaskAlterEntity;
import com.server.task.model.entity.UserEntity;
import com.server.task.model.entity.UserFolderEntity;
import com.server.task.repo.*;
import com.server.task.controller.RestoreController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@EnableScheduling
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
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserFolderEntityRepository userFolderEntityRepository;
    @Autowired
    StatusDirRepository statusRepository;
    @Autowired
    RestoreController restoreController;

    @RequestMapping(value = {"/addTaskOld"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task addNewTaskPiece(@RequestBody Task task) {
        taskRepository.save(task);
        return task;
    }

    //новый вариант создания задачи, сразу добавляет связь в таблицу UTconnector, возвращает id
    @RequestMapping(value = {"/addTask"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public Long addNewTask(@RequestBody Task task) {

        if (task.getBegDate() == null) {
            task.setBegDate(new Date());
        }
        Date date = new Date();
        task.setLastChange(date);
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
        if (task.getTaskName() != null) {
            newtask.setTaskName(task.getTaskName());
        }
        if (task.getTaskDesc() != null) {
            newtask.setTaskDesc(task.getTaskDesc());
        }
        //if (task.getBegDate()!=null){newtask.setBegDate(task.getBegDate());}
        if (task.getEndDate() != null) {
            newtask.setEndDate(task.getEndDate());
        }
        if (task.getEmployee() != null) {
            link = utRepository.findByUserIdAndTaskId(newtask.getEmployee(), task.getId());
            link.setUserId(task.getEmployee());
            utRepository.save(link);
            newtask.setEmployee(task.getEmployee());
        }
        if (task.getPriority() != null) {
            newtask.setPriority(task.getPriority());
        }
        if (task.getStatus() != null) {
            newtask.setStatus(task.getStatus());
        }
        Date date = new Date();
        newtask.setLastChange(date);
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
            } else {
                parTasksSet.add(taskEntityRepository.findById(task.getParentId()));
            }
        }

        //Ищет задачи, где пользователь - исполнитель
        for (TaskEntity tasks : taskListEmp) {
            if (tasks.getParentId() == null) {
                parTasksSet.add(tasks);
            } else {
                parTasksSet.add(taskEntityRepository.findById(tasks.getParentId()));
            }
        }
        return parTasksSet;
    }

    @RequestMapping(value = {"/getDate"}, headers = {"Content-type=application/json"}, method = RequestMethod.GET)
    public Date GetStatus() {
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

    //Получение приватных сообщений
    @RequestMapping(value = {"/getPrivateMessages"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<Message> ListPrivateMessages(@RequestBody Message sample) {
        String sender = sample.getSender();
        String receiver = sample.getReceiver();
        List<Message> messagesList = new ArrayList<>(messageRepository.findBySenderAndReceiver(sender, receiver));
        List<Message> reverse = messageRepository.findBySenderAndReceiver(receiver, sender);
        messagesList.addAll(reverse);
        return messagesList;
    }

    //Получение общих сообщений
    @RequestMapping(value = {"/getPublicMessages"}, method = RequestMethod.GET, headers = {"Content-type=application/json"})
    public List<Message> ListPublicMessages() {
        List<Message> messagesList = new ArrayList<>(messageRepository.findByReceiverIsNull());
        return messagesList;
    }


    //Получение списка пользователей и их назначенных им родительских задач (ловит id назначившего - возвращает список пользователей и их задачи, автор получает задачи, назначенные ему)
    @RequestMapping(value = {"/getParentTasks"}, method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<UserFolderEntity> ListUserParentTasks(@RequestBody UserEntity user) {
        Long authId = user.getId();
        UserEntity author = userEntityRepository.findById(authId);
        List<UserFolderEntity> userList = userFolderEntityRepository.findAll();
        for (UserFolderEntity usr : userList)
        {
            if(usr.getId() == authId){
                UserEntity myUser = userEntityRepository.findById(authId);
                usr.setTasks(taskEntityRepository.findByEmployeeAndParentIdIsNull(myUser));
            }
            else {
                UserEntity myUsr = userEntityRepository.findById(usr.getId());
                usr.setTasks(taskEntityRepository.findByEmployeeAndAuthorAndParentIdIsNull(myUsr,author));
            }
        }
        return userList;
    }


    //Автоматическая поебень™ смотрит дату и ебашит задачи в просроченные
    @Scheduled(cron ="50 59 23 * * *")
    public List<TaskEntity> DailyCheck () throws IOException, ParseException {
        Date today = new Date();
        List<TaskEntity> allTasks = taskEntityRepository.findAll();
        List<TaskEntity> overdueList = new ArrayList<>();
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        for (TaskEntity tsk : allTasks)
        {
            if (tsk.getEndDate()!=null && tsk.getStatus().getId()!=7)
            {
                Date tskdate = format.parse(tsk.getEndDate());
                if(tskdate.compareTo(today) < 0){
                    overdueList.add(tsk);
                }
            }
        }
        setTaskExpired(overdueList);
        return overdueList;
    }

    //Обновление просроченного задания для автоматической поебени™
    public void setTaskExpired(List<TaskEntity> taskList) throws IOException {
        for (TaskEntity tsk : taskList) {
            tsk.setOverdue("#cf1717");
            Long statId = new Long(7);
            tsk.setStatus(statusRepository.findById(statId));
            Date date = new Date();
            tsk.setLastChange(date);
            taskEntityRepository.save(tsk);
            restoreController.StatusCheck(tsk);
        }
    }
}