package com.example.translationsystembackend.controllers;

import com.example.translationsystembackend.entities.User;
import com.example.translationsystembackend.interceptors.PassToken;
import com.example.translationsystembackend.services.UserService;
import com.example.translationsystembackend.utils.LoginUtil;
import com.example.translationsystembackend.utils.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Date;

@RestController
public class LoginController {

    @Autowired
    private UserService userService;

    /**
     * @param username 用户名，不允许为空
     * @param password 密码，不允许为空
     * @return token
     *
     * <p>登录，使用post方法传递参数。如果用户不存在，返回404错误。如果密码核对失败，返回401错误。成功则返回用户信息。</p>
     */
    @PassToken
    @PostMapping("/login/")
    public ResponseEntity<User> login(HttpServletResponse response, @RequestParam(value = "username") String username, @RequestParam(value = "password") String password) {
        User user = userService.getUserByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if (!Arrays.equals(user.getPasswordDigest(), UserUtil.hashPassword(password))) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        } else {
            Date date = new Date();
            String token = LoginUtil.getRandomToken();
            user.setLastLogin(date);
            user.setToken(token);
            userService.updateLoginInfoByUsername(date, token, username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

}
