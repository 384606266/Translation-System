package com.example.translationsystembackend.controllers;

import com.example.translationsystembackend.entities.File;
import com.example.translationsystembackend.exceptions.IllegalLoginStatusException;
import com.example.translationsystembackend.exceptions.NoUserException;
import com.example.translationsystembackend.services.FileService;
import com.example.translationsystembackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;

    /**
     * @param request       请求
     * @param filename      文件名
     * @param user          用户名
     * @param value         文件积分值
     * @param multipartFile 文件
     * @return 文件对象，但是id不准确
     *
     * <p>创建文件，采用post方法。上传参数为文件名、用户名、文件积分值和文件。如果用户声明用户名不一致抛出错误返回401错误，不存在抛出错误返回404错误，如果文件获取失败返回406错误，成功返回文件对象。</p>
     */
    @PostMapping("/create/")
    public ResponseEntity<File> createFile(HttpServletRequest request, @RequestParam("filename") String filename, @RequestParam("user") String user, @RequestParam("value") int value, @RequestParam("file") MultipartFile multipartFile) {
        if (!request.getHeader("Username").equals(user)) {
            throw new IllegalLoginStatusException();
        } else if (userService.getUserByUsername(user) == null) {
            throw new NoUserException();
        } else {
            File file = new File();
            file.setFilename(filename);
            file.setUser(user);
            file.setValue(value);
            try {
                file.setContent(multipartFile.getBytes());
            } catch (IOException exception) {
                return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
            }
            fileService.createFile(file);
            return new ResponseEntity<>(file, HttpStatus.OK);
        }
    }

    /**
     * @param request 请求
     * @param id 文件id
     * @return 被删除的文件对象
     *
     * <p>删除文件，采用delete方法，路径传参。如果文件不存在返回404错误，如果用户名校验不合法401错误，成功返回删除的文件对象。</p>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<File> deleteFile(HttpServletRequest request, @PathVariable("id") int id) {
        File file = fileService.getFileById(id);
        if (file == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if (!fileService.getFileById(id).getUser().equals(request.getHeader("Username"))) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } else {
            fileService.deleteFile(id);
            return new ResponseEntity<>(file, HttpStatus.OK);
        }
    }

}
