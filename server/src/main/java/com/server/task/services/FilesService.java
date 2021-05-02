package com.server.task.services;


import org.apache.commons.io.IOUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@Service
public class FilesService {


    //!!!!  ---Путь до папки с фотографиями--- !!!!
    public final String storageDirectoryPath = "D:\\Programs\\DIplom\\diploma\\server\\src\\main\\resources\\uploads\\profile";
    //!!!!
    public  byte[] getImageWithMediaType(String imageName) throws IOException {
        Path destination =   Paths.get(storageDirectoryPath+"\\"+imageName);
        return IOUtils.toByteArray(destination.toUri());
    }

}
