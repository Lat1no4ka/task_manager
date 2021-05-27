package com.server.task.controller;

import java.io.IOException;
import java.security.SecureRandom;
import com.server.task.model.Files;
import com.server.task.model.User;
import com.server.task.model.entity.TaskEntity;
import com.server.task.model.entity.UserEntity;
import com.server.task.repo.TaskEntityRepository;
import com.server.task.repo.UserEntityRepository;
import com.server.task.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Date;
import java.util.List;
import java.util.Random;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@EnableScheduling
@ResponseBody
public class RestoreController {

    @Autowired
    UserEntityRepository userEntityRepository;
    @Autowired
    TaskEntityRepository taskEntityRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    //Отправка временного пароля
    @RequestMapping(value={"/sendCode"}, method= RequestMethod.POST, headers = {"Content-type=application/json"})
    public String SendCode (@RequestBody User user) throws IOException {
        String userMail = (userRepository.findById(user.getId())).getEmail();
        User usr = userRepository.findById(user.getId());
        int min = 100000;
        int max = 999999;
        int diff = max - min;
        Random random = new Random();
        int i = random.nextInt(diff + 1);
        i += min;
        try (GenericXmlApplicationContext context = new GenericXmlApplicationContext()) {
            context.load("classpath:applicationContext.xml");
            context.refresh();
            JavaMailSender mailSender = context.getBean("mailSender", JavaMailSender.class);
            SimpleMailMessage templateMessage = context.getBean("templateMessage", SimpleMailMessage.class);
            SimpleMailMessage mailMessage = new SimpleMailMessage(templateMessage);
            mailMessage.setTo(userMail);
            mailMessage.setText("Ваш временный пароль  " + i + "\n Не забудьте заменить его во вкладке профиля");
            String newPass = ""+i;
            usr.setPassword(bCryptPasswordEncoder.encode(newPass));
            userRepository.save(usr);
            try {
                mailSender.send(mailMessage);
            } catch (MailException mailException) {
                mailException.printStackTrace();
            }
        }
        return "Проверьте почту";
    }

    //Отправляет оповещение о новой задаче. Ловит id задачи
    @RequestMapping(value={"/sendMessage"}, method= RequestMethod.POST, headers = {"Content-type=application/json"})
    public String SendMessage (@RequestBody TaskEntity task) throws IOException {

        TaskEntity tsk = taskEntityRepository.findById(task.getId());
        List<UserEntity> userList = tsk.getEmployee();
        UserEntity author = tsk.getAuthor();
        for (UserEntity user : userList) {
            String userMail = (userEntityRepository.findById(user.getId())).getEmail();
            try (GenericXmlApplicationContext context = new GenericXmlApplicationContext()) {
                context.load("classpath:applicationContext.xml");
                context.refresh();
                JavaMailSender mailSender = context.getBean("mailSender", JavaMailSender.class);
                SimpleMailMessage templateMessage = context.getBean("templateMessage", SimpleMailMessage.class);
                SimpleMailMessage mailMessage = new SimpleMailMessage(templateMessage);
                mailMessage.setTo(userMail);
                mailMessage.setText("Пользователь " + author.getFirstName() + " " + author.getLastName() + " Назначил вам новую задачу: " + tsk.getTaskName() + "\n Срок выполнения с " + tsk.getBegDate() + " по " + tsk.getEndDate());
                try {
                    mailSender.send(mailMessage);
                } catch (MailException mailException) {
                    mailException.printStackTrace();
                }
            }
        }
        return "Сообщение отправлено";
    }

    /*  !!!--- Добавил эту функцию в автоматическое выполнение, если нужно потестить - врубайте эту ---!!!
    //Отправляет оповещение о просроченой задаче. Ловит id задачи
    @RequestMapping(value={"/sendExpiredMessage"}, method= RequestMethod.POST, headers = {"Content-type=application/json"})
    public String SendExpiredMessage (@RequestBody TaskEntity task) throws IOException {

        TaskEntity tsk = taskEntityRepository.findById(task.getId());
        List<UserEntity> userList = tsk.getEmployee();
        UserEntity author = tsk.getAuthor();
        for (UserEntity user : userList) {
            String userMail = (userEntityRepository.findById(user.getId())).getEmail();
            try (GenericXmlApplicationContext context = new GenericXmlApplicationContext()) {
                context.load("classpath:applicationContext.xml");
                context.refresh();
                JavaMailSender mailSender = context.getBean("mailSender", JavaMailSender.class);
                SimpleMailMessage templateMessage = context.getBean("templateMessage", SimpleMailMessage.class);
                SimpleMailMessage mailMessage = new SimpleMailMessage(templateMessage);
                mailMessage.setTo(userMail);
                mailMessage.setText("Срок выполнения задачи: '" + tsk.getTaskName() + "' закончился " + tsk.getEndDate() + "\nДанная задача все еще доступна к выполнению, но уже не принесет положительного влияния на вашу статитику");
                try {
                    mailSender.send(mailMessage);
                } catch (MailException mailException) {
                    mailException.printStackTrace();
                }
            }
        }
        return "Сообщение отправлено";
    }
    */

    public void StatusCheck (TaskEntity task) throws IOException {
        List<UserEntity> userList = task.getEmployee();
        UserEntity author = task.getAuthor();
        for (UserEntity user : userList) {
            String userMail = (userEntityRepository.findById(user.getId())).getEmail();
            try (GenericXmlApplicationContext context = new GenericXmlApplicationContext()) {
                context.load("classpath:applicationContext.xml");
                context.refresh();
                JavaMailSender mailSender = context.getBean("mailSender", JavaMailSender.class);
                SimpleMailMessage templateMessage = context.getBean("templateMessage", SimpleMailMessage.class);
                SimpleMailMessage mailMessage = new SimpleMailMessage(templateMessage);
                mailMessage.setTo(userMail);
                mailMessage.setText("Срок выполнения задачи: '" + task.getTaskName() + "' закончился " + task.getEndDate() + "\nДанная задача все еще доступна к выполнению, но уже не принесет положительного влияния на вашу статитику");
                try {
                    mailSender.send(mailMessage);
                } catch (MailException mailException) {
                    mailException.printStackTrace();
                }
            }
        }
    }






}
