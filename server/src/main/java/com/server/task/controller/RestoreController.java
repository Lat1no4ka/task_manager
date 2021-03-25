package com.server.task.controller;

import java.security.SecureRandom;
import com.server.task.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class RestoreController {


    @RequestMapping(value={"/SendCode"}, method= RequestMethod.POST, headers = {"Content-type=application/json"})
    public static void SendCode( String[] args )
    {
        /*
        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[8];
        random.nextBytes(bytes);
        String code = random.toString();
        return code;
        ^ более безопасный
        */
        int min = 1000;
        int max = 9999;
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

            mailMessage.setTo("dashkovtemk@mail.ru");//адрес получателя

            mailMessage.setText("Забыл пароль блять? Ну вот нахуй ты такой тупой-то? Ладно, введи этот код: " + i + "\nЕще раз забудешь свой ебаный пароль - я самоуничтожу твой компьютер");
            try {
                mailSender.send(mailMessage);
            } catch (MailException mailException) {
                mailException.printStackTrace();
            }
        }

    }




}
