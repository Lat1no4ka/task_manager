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
import com.server.task.repo.FilesRepository;
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

    //одиночная загрузка - на всякий случай оставляю
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Files fileUpload(@RequestParam("file") MultipartFile file, @RequestParam("taskId") Long id) throws IOException {
        Files files = new Files();
        files.setFileName(file.getOriginalFilename());
        String hashFilename = (UUID.randomUUID()).toString();
        //--------------------------------!!!!---------------------------------
        File convertFile = new File("src\\main\\resources\\uploads\\"+hashFilename); //Сюда напишите путь до папки, куда нужно сохранить
        //--------------------------------!!!!---------------------------------
        convertFile.createNewFile();
        FileOutputStream fout = new FileOutputStream(convertFile);
        fout.write(file.getBytes());
        fout.close();
        files.setFilePath(convertFile.toString());
        files.setTaskId(id);

        filesRepository.save(files);

        return files;
    }


    //множественная загрузка
    @RequestMapping(value = "/uploadFiles", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<Files> filesUpload(@RequestParam("file") List<MultipartFile> multiPartFiles, @RequestParam("taskId") Long id) throws IOException {
        List<Files> fileList = new ArrayList<>();

        for (MultipartFile mPFile : multiPartFiles) {
            Files file = new Files();
            file.setFileName(mPFile.getOriginalFilename());
            String hashFilename = (UUID.randomUUID()).toString();
            File convertFile = new File("src\\main\\resources\\uploads\\" + hashFilename);
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




}
