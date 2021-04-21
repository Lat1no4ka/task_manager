package com.server.task.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

import com.server.task.model.Task;
import com.server.task.model.entity.FilesEntity;
import com.server.task.repo.FilesRepository;
import com.server.task.repo.FilesEntityRepository;
import com.server.task.model.Files;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping(produces = "application/json")
@ResponseBody
public class FilesController {

    @Autowired
    FilesRepository filesRepository;
    @Autowired
    FilesEntityRepository filesEntityRepository;

    //загрузка картинки пользователя с проверкой на изображение
    @RequestMapping(value = "/uploadProfilePic", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String pictureUpload(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long id) throws IOException {

        String[] parts = file.getOriginalFilename().split(Pattern.quote("."));
        String mediaType = (parts[1]);
        if (mediaType.equals("jpg") || mediaType.equals("jpeg") || mediaType.equals("png")) {
            FilesEntity files = new FilesEntity();
            files.setFileName(file.getOriginalFilename());
            String hashFilename = (UUID.randomUUID()).toString();
            File convertFile = new File("src\\main\\resources\\uploads\\profile\\" + hashFilename);
            convertFile.createNewFile();
            FileOutputStream fout = new FileOutputStream(convertFile);
            fout.write(file.getBytes());
            fout.close();
            files.setFilePath(convertFile.toString());
            files.setUserId(id);
            filesEntityRepository.save(files);
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
            File convertFile = new File("src\\main\\resources\\uploads\\documents\\" + hashFilename);
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

    //Получение картинки пользователя по id
    @RequestMapping(value = "/getProfilePic", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public String downloadFile(@RequestBody FilesEntity files) throws IOException  {
        FilesEntity link = filesEntityRepository.findByUserId(files.getUserId());
        return link.getFilePath();
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

    //Удаление файла - ловит id, удаляет файл из БД и сервера
    @RequestMapping(value = "/deleteFile", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public File deleteFile(@RequestBody Files files) throws IOException  {

        Files dbFile = filesRepository.findById(files.getId());
        File storageFile = new File(dbFile.getFilePath());
        filesRepository.delete(dbFile);
        storageFile.delete();

        return storageFile;

    }




}
