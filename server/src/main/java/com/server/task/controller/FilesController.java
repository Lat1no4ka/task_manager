package com.server.task.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

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

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Files fileUpload(@RequestParam("file") MultipartFile file, @RequestParam("taskid") Long id) throws IOException {
        //--------------------------------!!!!---------------------------------
        File convertFile = new File("C:\\Users\\Chameleon\\Desktop\\Storage\\"+file.getOriginalFilename()); //Сюда напишите путь до папки, куда нужно сохранить
        //--------------------------------!!!!---------------------------------
        convertFile.createNewFile();
        FileOutputStream fout = new FileOutputStream(convertFile);
        fout.write(file.getBytes());
        fout.close();
        Files files = new Files();
        files.setFilePath(convertFile.toString());
        files.setFileName(file.getOriginalFilename());
        files.setTaskId(id);

        filesRepository.save(files);

        return files;
    }

    @RequestMapping(value = "/downloadFile", method = RequestMethod.POST, headers = {"Content-type=application/json"})
    public ResponseEntity<Object> downloadFile(@RequestBody Files files) throws IOException  {

        Files filepath = filesRepository.findById(files.getId());
        String filename = filepath.getFilePath();

        File file = new File(filename);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        ResponseEntity<Object>
                responseEntity = ResponseEntity.ok().headers(headers).contentLength(file.length()).contentType(
                MediaType.parseMediaType("application/txt")).body(resource);

        return responseEntity;
    }







}
