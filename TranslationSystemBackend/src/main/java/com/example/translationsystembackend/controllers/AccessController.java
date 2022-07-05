package com.example.translationsystembackend.controllers;

import com.example.translationsystembackend.entities.Access;
import com.example.translationsystembackend.services.AccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/access")
public class AccessController {

    @Autowired
    private AccessService accessService;

    /**
     * @param username 用户名
     * @param id       文件号
     * @return 授权对象
     *
     * <p>通过post方法创建允许读的授权。返回新创建的授权对象。</p>
     */
    @PostMapping("/read/")
    public ResponseEntity<Access> grantReadAccess(@RequestParam("username") String username, @RequestParam("id") int id) {
        accessService.grantReadAccess(username, id);
        return new ResponseEntity<>(accessService.getAccess(username, id), HttpStatus.OK);
    }

    /**
     * @param username 用户名
     * @param id       文件号
     * @return 授权对象
     *
     * <p>通过post方法创建允许写的授权。返回新创建的授权对象。</p>
     */
    @PostMapping("/write/")
    public ResponseEntity<Access> grantWriteAccess(@RequestParam("username") String username, @RequestParam("id") int id) {
        accessService.grantWriteAccess(username, id);
        return new ResponseEntity<>(accessService.getAccess(username, id), HttpStatus.OK);
    }

    /**
     * @param username 用户名
     * @param id       文件号
     * @return 原授权对象
     *
     * <p>通过delete方法撤销读权限。如果权限不存在返回404。</p>
     */
    @DeleteMapping("/read/{username}/{id}")
    public ResponseEntity<Access> deleteReadAccess(@PathVariable("username") String username, @PathVariable("id") int id) {
        Access access = accessService.getAccess(username, id);
        if (access == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            accessService.deleteReadAccess(access);
            access.setFlag((char) (access.getFlag() & AccessService.READ_FLAG));
            return new ResponseEntity<>(access, HttpStatus.OK);
        }
    }

    /**
     * @param username 用户名
     * @param id       文件号
     * @return 原授权对象
     *
     * <p>通过delete方法撤销写权限。如果权限不存在返回404。</p>
     */
    @DeleteMapping("/write/{username}/{id}")
    public ResponseEntity<Access> deleteWriteAccess(@PathVariable("username") String username, @PathVariable("id") int id) {
        Access access = accessService.getAccess(username, id);
        if (access == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            accessService.deleteWriteAccess(access);
            access.setFlag((char) (access.getFlag() & AccessService.WRITE_FLAG));
            return new ResponseEntity<>(access, HttpStatus.OK);
        }
    }

    /**
     * @param username 用户名
     * @param id       文件号
     * @return 授权对象
     *
     * <p>通过get方法获取指定用户名对文件号的授权。</p>
     */
    @GetMapping("/{username}/{id}")
    public ResponseEntity<Access> getAccess(@PathVariable("username") String username, @PathVariable("id") int id) {
        return new ResponseEntity<>(accessService.getAccess(username, id), HttpStatus.OK);
    }

    /**
     * @param username 用户名
     * @return 授权对象
     *
     * <p>通过get方法获取指定用户名的授权。</p>
     */
    @GetMapping("/{username}")
    public ResponseEntity<List<Access>> getAccessByUsername(@PathVariable("username") String username) {
        List<Access> accesses = accessService.getAccessByUsername(username);
        return new ResponseEntity<>(accesses, HttpStatus.OK);
    }

}
