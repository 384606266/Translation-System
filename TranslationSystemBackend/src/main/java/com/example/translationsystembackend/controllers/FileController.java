package com.example.translationsystembackend.controllers;

import com.example.translationsystembackend.entities.File;
import com.example.translationsystembackend.exceptions.IllegalLoginStatusException;
import com.example.translationsystembackend.exceptions.NoUserException;
import com.example.translationsystembackend.services.AccessService;
import com.example.translationsystembackend.services.FileService;
import com.example.translationsystembackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private AccessService accessService;
    @Autowired
    private FileService fileService;
    @Autowired
    private UserService userService;

    /**
     * @param request       请求
     * @param filename      文件名
     * @param user          用户名
     * @param value         文件积分值
     * @param multipartFile 文件
     * @return 文件对象，但是id不准确
     *
     * <p>创建文件，采用post方法。上传参数为文件名、用户名、文件积分值和文件。如果用户声明用户名不一致且没有写权限抛出错误返回401错误，不存在抛出错误返回404错误，如果文件获取失败返回406错误，成功返回文件对象。</p>
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
     * @param id      文件id
     * @return 被删除的文件对象
     *
     * <p>删除文件和相关的授权信息，采用delete方法，路径传参。如果文件不存在返回404错误，如果用户名校验不合法且没有写权限401错误，成功返回删除的文件对象。</p>
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<File> deleteFile(HttpServletRequest request, @PathVariable("id") int id) {
        String username = request.getHeader("Username");
        File file = fileService.getFileById(id);
        if (file == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if (!(fileService.getFileById(id).getUser().equals(username) || accessService.isWritable(username, id))) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } else {
            accessService.deleteAccessById(id);
            fileService.deleteFile(id);
            return new ResponseEntity<>(file, HttpStatus.OK);
        }
    }

    /**
     * @return 所有文件对象
     *
     * <p>get方法请求所有文件对象。如果不是作者或者无读权限则撤销内容部分。</p>
     */
    @GetMapping("")
    public ResponseEntity<List<File>> getFile() {
        return new ResponseEntity<>(fileService.getFile(), HttpStatus.OK);
    }

    /**
     * @param id 文件号
     * @return 文件对象
     *
     * <p>获取文件，采用get方法在路径中声明希望获得的文件号。如果用户名与作者不一致或者无写权限则清空内容后再返回。</p>
     */
    @GetMapping("/id/{id}")
    public ResponseEntity<File> getFileById(@PathVariable("id") int id) {
        return new ResponseEntity<>(fileService.getFileById(id), HttpStatus.OK);
    }

    /**
     * @param filename 文件名
     * @return 文件对象列表
     *
     * <p>获取文件，采用get方法在路径中声明希望获得的文件名。如果用户名与作者不一致或者无写权限则清空内容后再返回。</p>
     */
    @GetMapping("/filename/{filename}")
    public ResponseEntity<List<File>> getFileByName(@PathVariable("filename") String filename) {
        return new ResponseEntity<>(fileService.getFileByName(filename), HttpStatus.OK);
    }

    /**
     * @param user 用户名
     * @return 文件对象列表
     *
     * <p>获取文件，采用get方法在路径中声明希望获得的用户名相关的文件。如果用户名与作者不一致或者无写权限则清空内容后再返回。</p>
     */
    @GetMapping("/user/{user}")
    public ResponseEntity<List<File>> getFileByUser(@PathVariable("user") String user) {
        return new ResponseEntity<>(fileService.getFileByUser(user), HttpStatus.OK);
    }

    /**
     * @param request 请求
     * @param response 响应
     * @param id 文件号
     * @throws IOException 获取输出流失败抛出错误
     *
     * <p>get方法，获取指定的文件内容。</p>
     */
    @GetMapping("/download/{id}")
    public void downloadFile(HttpServletRequest request, HttpServletResponse response, @PathVariable("id") int id) throws IOException {
        File file = fileService.getFileById(id);
        ByteArrayInputStream inputStream = fileService.downloadFile(id);
        String username = request.getHeader("Username");
        if (file != null && inputStream != null && (username.equals(file.getUser()) || accessService.isReadable(username, id))) {
            response.setHeader("Content-Disposition", String.format("attachment;filename=%s", file.getFilename()));
            response.setContentType("application/octet-stream");
            response.setContentLength(inputStream.available());
            OutputStream outputStream = response.getOutputStream();
            while (inputStream.available() > 0) {
                outputStream.write(inputStream.readNBytes(0x1000));
            }
            outputStream.close();
        }
    }

    /**
     * @param request       请求对象
     * @param value         文件价值，不可为空，若不希望发生变动则赋负值
     * @param multipartFile 文件对象，可为空
     * @param id            文件号
     * @return 文件列表
     *
     * <p>更新文件，采用put方法上传文件值。如果不为作者或者无写权限则返回401错误，若读取失败返回406错误，成功则返回更新后的文件。</p>
     */
    @PutMapping("/")
    public ResponseEntity<File> updateFile(HttpServletRequest request, @RequestParam("value") int value, @RequestParam(value = "content", required = false) MultipartFile multipartFile, @RequestParam("id") int id) {
        String username = request.getHeader("Username");
        File file = fileService.getFileById(id);
        if (file.getUser().equals(username) || accessService.isWritable(username, id)) {
            if (value >= 0) {
                file.setValue(value);
            }
            if (multipartFile != null) {
                try {
                    file.setContent(multipartFile.getBytes());
                } catch (IOException e) {
                    return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
                }

            }
            fileService.updateFile(file);
            return new ResponseEntity<>(file, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

}
