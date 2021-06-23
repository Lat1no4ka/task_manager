package com.server.task.controller;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

import com.server.task.model.*;
import com.server.task.model.entity.FilesEntity;
import com.server.task.model.entity.TaskEntity;
import com.server.task.model.entity.UserEntity;
import com.server.task.repo.*;

import com.server.task.services.FilesService;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class FilesController {

    @Autowired
    public FilesService imageService;
    @Autowired
    FilesRepository filesRepository;
    @Autowired
    ChatFilesRepository chatFilesRepository;
    @Autowired
    FilesEntityRepository filesEntityRepository;
    @Autowired
    UserEntityRepository userEntityRepository;
    @Autowired
    MessageRepository messageRepository;
    @Autowired
    TaskEntityRepository taskEntityRepository;
    @Autowired
    StatusDirRepository statusDirRepository;

    //загрузка картинки пользователя с проверкой на изображение
    @RequestMapping(value = "/uploadProfilePic", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String pictureUpload(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long id) throws IOException {

        String[] parts = file.getOriginalFilename().split(Pattern.quote("."));
        String mediaType = (parts[1]);
        if (mediaType.equals("jpg") || mediaType.equals("jpeg") || mediaType.equals("png")) {
            FilesEntity files = new FilesEntity();
            files.setFileName(file.getOriginalFilename());
            String hashFilename = (UUID.randomUUID()).toString();
            File convertFile = new File("src/main/resources/static/profile/" + hashFilename);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(file.getBytes());
            fout.close();
            files.setFilePath(convertFile.toString());
            UserEntity usr = userEntityRepository.findById(id);
            filesEntityRepository.save(files);
            usr.setPicture(files);
            usr.setPictureLink(ImgToLink(files));
            userEntityRepository.save(usr);
            return "Изображение успешно добавлено";
        }
        else{
            return "Неверный формат изображения";
        }
    }

    //множественная загрузка
    @RequestMapping(value = "/uploadFiles", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<Files> filesUpload(@RequestParam("file") List<MultipartFile> multiPartFiles, @RequestParam("taskId") Long id) throws IOException {
        List<Files> fileList = new ArrayList<>();

        for (MultipartFile mPFile : multiPartFiles) {
            Files file = new Files();
            file.setFileName(mPFile.getOriginalFilename());
            String hashFilename = (UUID.randomUUID()).toString();
            File convertFile = new File("src/main/resources/static/documents/" + hashFilename);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(mPFile.getBytes());
            fout.close();
            file.setFilePath(convertFile.toString());
            file.setTaskId(id);
            fileList.add(file);
        }

        filesRepository.saveAll(fileList);

        return fileList;
    }


    //Скачивание файла - ловит id, возвращает файл
    @RequestMapping(value = "/downloadFile", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public ResponseEntity<Object> downloadFile(@RequestBody Files files) throws IOException  {

        Files filepath = filesRepository.findById(files.getId());
        String filename = filepath.getFilePath();
        String[] parts = filepath.getFileName().split(Pattern.quote("."));
        String mediaType = ("application/" + parts[1]);
        File file = new File(filename);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        ResponseEntity<Object>
                responseEntity = ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(
                MediaType.parseMediaType(mediaType)).body(resource);
        return responseEntity;
    }

    //Получение картинки пользователя по id файла
    @RequestMapping(value = "/getProfilePic", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public String getImageAsLink(@RequestBody FilesEntity files) throws IOException {
        FilesEntity link = filesEntityRepository.findById(files.getId());
        String[] parts = link.getFilePath().split(Pattern.quote("/"));
        String filename  = parts[parts.length-1];
        String lnk = "http://82.179.12.115:8080/getImage/"+filename;
        return "{\"link\": \" "+ lnk +"\"}";
    }

    public String ImgToLink(FilesEntity files){
        FilesEntity link = filesEntityRepository.findById(files.getId());
        String[] parts = link.getFilePath().split(Pattern.quote("/"));
        String filename  = parts[parts.length-1];
        String lnk = "http://82.179.12.115:8080/getImage/"+filename;
        return "{\"link\": \" "+ lnk +"\"}";
    }

    //Удаление файла - ловит id, удаляет файл из БД и сервера
    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public File deleteFile(@RequestBody Files files) throws IOException  {
        Files dbFile = filesRepository.findById(files.getId());
        File storageFile = new File(dbFile.getFilePath());
        filesRepository.delete(dbFile);
        storageFile.delete();
        return storageFile;
    }

    //Удаление картинки - ловит id, удаляет файл из БД и сервера
    @RequestMapping(value = "/deletePicture", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public String deleteProfilePic(@RequestBody Files picture) throws IOException  {
        Files dbFile = filesRepository.findById(picture.getId());
        File storageFile = new File(dbFile.getFilePath());
        UserEntity user = userEntityRepository.findByPictureId(picture.getId());
        user.setPicture(null);
        userEntityRepository.save(user);
        filesRepository.delete(dbFile);
        storageFile.delete();
        return "Изображение удалено";
    }

    @GetMapping(
            value = "getImage/{imageName:.+}",
            produces = {MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_PNG_VALUE}
    )
    public @ResponseBody byte[] getImageWithMediaType(@PathVariable(name = "imageName") String fileName) throws IOException {
        return this.imageService.getImageWithMediaType(fileName);
    }

    //Загрузка файлов для чата
    @RequestMapping(value = "/uploadChatFiles", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<ChatFiles> chatFilesUpload(@RequestParam("file") List<MultipartFile> multiPartFiles) throws IOException {
        List<ChatFiles> fileList = new ArrayList<>();
        for (MultipartFile mPFile : multiPartFiles) {
            ChatFiles file = new ChatFiles();
            file.setFileName(mPFile.getOriginalFilename());
            String hashFilename = (UUID.randomUUID()).toString();
            File convertFile = new File("src/main/resources/static/chat/" + hashFilename);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(mPFile.getBytes());
            fout.close();
            file.setFilePath(convertFile.toString());
            file.setHashName(hashFilename);
            fileList.add(file);
        }
        chatFilesRepository.saveAll(fileList);

        return fileList;
    }

    //получение ссылки на файл
    @RequestMapping(value = "/getChatFile", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public String getFileAsLink(@RequestBody ChatFiles files) throws IOException {
        ChatFiles link = chatFilesRepository.findById(files.getId());
        String lnk = "http://82.179.12.115:8080/getFile/"+link.getHashName();
        return "{\"link\": \" "+ lnk +"\"}";
    }

    public String fileToLink(Long fileId) throws IOException {
        ChatFiles link = chatFilesRepository.findById(fileId);
        String lnk = "http://82.179.12.115:8080/getFile/"+link.getHashName();
        return "{\"link\": \" "+ lnk +"\"}";
    }


    //Скачивание файла по ссылке
    @GetMapping(
            value = "getFile/{hashname:.+}",
            produces = {MediaType.ALL_VALUE}
    )
    public ResponseEntity<Object> getFileByLink(@PathVariable(name = "hashname") String hashname) throws IOException {
        ChatFiles filepath = chatFilesRepository.findByHashName(hashname);
        String filename = filepath.getFilePath();
        String[] parts = filepath.getFileName().split(Pattern.quote("."));
        String mediaType = ("application/" + parts[1]);
        File file = new File(filename);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", filepath.getFileName()));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        ResponseEntity<Object>
                responseEntity = ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(
                MediaType.parseMediaType(mediaType)).body(resource);
        return responseEntity;
    }

    public Message ConvertIdToLinks (Message msg) throws IOException {
        List<String> fileNames = new ArrayList<>();
        List<ChatFiles> chatFiles = new ArrayList<>();
        List<Long> idList = new ArrayList<>();

      if (msg.getFileLink1() != null) {
          idList.add(Long.parseLong(msg.getFileLink1()));
      }
      if (msg.getFileLink2() != null) {
            idList.add(Long.parseLong(msg.getFileLink2()));
      }
      if (msg.getFileLink3() != null) {
          idList.add(Long.parseLong(msg.getFileLink3()));
      }
      if (msg.getFileLink4() != null) {
          idList.add(Long.parseLong(msg.getFileLink4()));
      }
      if (msg.getFileLink5() != null) {
          idList.add(Long.parseLong(msg.getFileLink5()));
      }

        for (Long fileId : idList) {
            ChatFiles chatFile = chatFilesRepository.findById(fileId);
            chatFile.setConnected("Yes");
            chatFiles.add(chatFile);
            fileNames.add(chatFile.getFileName());
        }
        chatFilesRepository.saveAll(chatFiles);

        if (idList.size() == 1) {
            msg.setFileLink1(fileToLink(idList.get(0)));
            msg.setFileName1(fileNames.get(0));
        }
        if (idList.size() == 2) {
            msg.setFileLink1(fileToLink(idList.get(0)));
            msg.setFileName1(fileNames.get(0));
            msg.setFileLink2(fileToLink(idList.get(1)));
            msg.setFileName2(fileNames.get(1));
        }
        if (idList.size() == 3) {
            msg.setFileLink1(fileToLink(idList.get(0)));
            msg.setFileName1(fileNames.get(0));
            msg.setFileLink2(fileToLink(idList.get(1)));
            msg.setFileName2(fileNames.get(1));
            msg.setFileLink3(fileToLink(idList.get(2)));
            msg.setFileName3(fileNames.get(2));
        }
        if (idList.size() == 4) {
            msg.setFileLink1(fileToLink(idList.get(0)));
            msg.setFileName1(fileNames.get(0));
            msg.setFileLink2(fileToLink(idList.get(1)));
            msg.setFileName2(fileNames.get(1));
            msg.setFileLink3(fileToLink(idList.get(2)));
            msg.setFileName3(fileNames.get(2));
            msg.setFileLink4(fileToLink(idList.get(3)));
            msg.setFileName4(fileNames.get(3));
        }
        if (idList.size() == 5) {
            msg.setFileLink1(fileToLink(idList.get(0)));
            msg.setFileName1(fileNames.get(0));
            msg.setFileLink2(fileToLink(idList.get(1)));
            msg.setFileName2(fileNames.get(1));
            msg.setFileLink3(fileToLink(idList.get(2)));
            msg.setFileName3(fileNames.get(2));
            msg.setFileLink4(fileToLink(idList.get(3)));
            msg.setFileName4(fileNames.get(3));
            msg.setFileLink5(fileToLink(idList.get(4)));
            msg.setFileName5(fileNames.get(4));
        }
        else{
            return msg;
        }
        return msg;
    }

    //Загрузка ответов
    @RequestMapping(value = "/uploadAnswer", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<Files>uploadAnswer(@RequestParam("file") List<MultipartFile> multiPartFiles, @RequestParam("taskId") Long id) throws IOException {
        List<Files> fileList = new ArrayList<>();
        TaskEntity task = taskEntityRepository.findById(id);
        for (MultipartFile mPFile : multiPartFiles) {
            Files file = new Files();
            file.setFileName(mPFile.getOriginalFilename());
            String hashFilename = (UUID.randomUUID()).toString();
            File convertFile = new File("src/main/resources/static/documents/" + hashFilename);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(mPFile.getBytes());
            fout.close();
            file.setFilePath(convertFile.toString());
            file.setAnswer(id);
            fileList.add(file);
        }
        task.setStatus(statusDirRepository.findById(new Long(3)));
        filesRepository.saveAll(fileList);
        taskEntityRepository.save(task);
        return fileList;
    }

    //удаление ответа
    @RequestMapping(value = "/deleteAnswer", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public TaskEntity deleteAnswer(@RequestBody TaskEntity task) throws IOException  {
        TaskEntity tsk = taskEntityRepository.findById(task.getId());
        List<Files> answer = tsk.getAnswer();
        for (Files file : answer) {
            Files dbFile = filesRepository.findById(file.getId());
            File storageFile = new File(dbFile.getFilePath());
            filesRepository.delete(dbFile);
            storageFile.delete();
        }
        tsk.setAnswer(null);
        taskEntityRepository.save(tsk);
        return tsk;
    }

    public String answerToLink(Long fileId) throws IOException {
        ChatFiles link = chatFilesRepository.findById(fileId);
        String lnk = "http://82.179.12.115:8080/getAnswer/"+link.getHashName();
        return "{\"link\": \" "+ lnk +"\"}";
    }


}
