package com.example.translationsystembackend.controllers;

import com.example.translationsystembackend.entities.User;
import com.example.translationsystembackend.exceptions.NoUserException;
import com.example.translationsystembackend.interceptors.PassToken;
import com.example.translationsystembackend.services.UserService;
import com.example.translationsystembackend.utils.LoginUtil;
import com.example.translationsystembackend.utils.UserUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     *
     * @param username 用户名，不允许为空
     * @param password 密码，不允许为空
     * @return 用户信息
     *
     * <p>创建用户，免token校验，使用post方法传递参数。该用户已存在，返回409错误。成功返回用户信息。</p>
     */
    @PassToken
    @PostMapping("/create/")
    public ResponseEntity<User> createUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            user = new User();
            user.setUsername(username);
            user.setPasswordDigest(UserUtil.hashPassword(password));
            user.setStatus(0);
            user.setPoints(0);
            user.setCreated(new Date());
            user.setLastLogin(new Date());
            user.setToken(LoginUtil.getRandomToken());
            userService.createUser(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>((User) null, HttpStatus.CONFLICT);
        }
    }

    /**
     *
     * @param username 用户名
     * @return 用户信息
     *
     * <p>获取用户信息，使用get方法在路径中传递参数。若未找到用户抛出错误，返回404错误码。若找到返回用户信息。</p>
     */
    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            throw new NoUserException();
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    /**
     *
     * @param username 用户名，允许为空
     * @param password 密码，允许为空
     * @param oldUsername 原先用户名，不允许为空
     * @return 更新后的用户信息
     *
     * <p>更新用户的用户名与密码信息，采用put方法传递参数。若未找到用户抛出404错误，否则修改用户信息并返回更新后的信息。对于传递的参数若为空或不存在则不做修改。</p>
     */
    @PutMapping("/")
    public ResponseEntity<User> updateUserInfo(@RequestParam(value = "username",required = false) String username, @RequestParam(value = "password",required = false) String password, @RequestParam("old_username") String oldUsername) {
        User user = userService.getUserByUsername(oldUsername);
        if (user == null) {
            throw new NoUserException();
        } else {
            if (username != null) {
                user.setUsername(username);
            }
            if (password != null) {
                user.setPasswordDigest(UserUtil.hashPassword(password));
            }
            userService.updateUserByUsername(user, oldUsername);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    /**
     *
     * @param username 用户名
     * @return 原用户信息
     *
     * <p>删除用户，采用delete方法传递信息。若未找到用户抛出错误返回404码。若找到则删除用户并返回其信息。</p>
     */
    @DeleteMapping("/{username}")
    public ResponseEntity<User> deleteUser(@PathVariable("username") String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            throw new NoUserException();
        } else {
            userService.deleteByUsername(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

}
