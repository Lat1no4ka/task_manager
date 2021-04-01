package com.server.task.controller;

import com.server.task.model.User;
import com.server.task.repo.TaskRepository;
import com.server.task.repo.UTconnectorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.server.task.model.Task;
import com.server.task.model.UTconnector;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class AddTaskController
{
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    UTconnectorRepository utRepository;

    @RequestMapping(value={"/addTaskOld"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task addNewTaskPiece(@RequestBody Task task)
    {
        taskRepository.save(task);
        return task;
    }

    //новый вариант создания задачи, сразу добавляет связь в таблицу UTconnector, возвращает id
    @RequestMapping(value={"/addTask"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Long addNewTask(@RequestBody Task task)
    {
        taskRepository.save(task);
        UTconnector link = new UTconnector();
        link.setCUserId(task.getEmpid());
        link.setCTaskId(task.getId());
        utRepository.save(link);

        //бля я хуй знает. работает правильно но логика пиздец конечно у этого
        List<Task> listUsrTask = taskRepository.findByheadid(task.getHeadid());
        Task lastTask = listUsrTask.get(listUsrTask.size() - 1);

        return lastTask.getId();
    }



    //создание подзадачи, ловит List тел и записывет их.
    @RequestMapping(value={"/addSubtask"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List addNewSubtask(@RequestBody List<Task> tasks)
    {
        List<UTconnector> linkList = new ArrayList<>();

        for (int i=0; i<tasks.size(); i++)
        {
            Task subtsk = tasks.get(i);
            UTconnector link = new UTconnector();
            link.setCUserId(subtsk.getEmpid());
            link.setCTaskId(subtsk.getId());
            linkList.add(link);
        }

        taskRepository.saveAll(tasks);
        utRepository.saveAll(linkList);

        return tasks;
    }

    //Изменение задач (необходимо добавить в JSON id изменяемой задачи)
    @RequestMapping(value={"/alterTask"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task alterTask(@RequestBody Task newTask)
    {
        //
        List<UTconnector> conList = utRepository.findBycTaskId(newTask.getId());
        utRepository.deleteAll(conList);
        //
        taskRepository.save(newTask);
        //Task oldTask = taskRepository.findById(newTask.getId());
        //
        UTconnector link = new UTconnector();
        link.setCUserId(newTask.getEmpid());
        link.setCTaskId(newTask.getId());
        utRepository.save(link);

        return newTask;
    }



    @RequestMapping(value={"/delete"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public Task deleteTask(@RequestBody Task task)
    {
        taskRepository.delete(task);
        return task;
    }

    //TODO обновить фронд под новые функции в UserController (2 нижних уходят)

    /* Надеюсь фронт уже работает по новым функциям в UserController, эти нужно будет удалить
    @RequestMapping(value={"/listTask"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<Task> ListTask(@RequestBody Task task)
    {
        Long empl = task.getEmpid();
        List<Task> emplist = taskRepository.findByempid(empl);
        return emplist;
    }

    @RequestMapping(value={"/listTaskId"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<Task> ListTaskId(@RequestBody Task task)
    {
        Long idl = task.getId();
        List<Task> idlist = taskRepository.findById(idl);
        return idlist;
    }
    */


    //ловит id родителя и кидает его подзадачи
    @RequestMapping(value={"/getSubtasks"}, method=RequestMethod.POST, headers = {"Content-type=application/json"})
    public List<Task> ListSubtask(@RequestBody Task task)
    {
        Long parid = task.getId();
        List<Task> subtlist = taskRepository.findByparid(parid);
        return subtlist;
    }

}