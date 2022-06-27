package com.example.translationsystembackend.services;

import com.example.translationsystembackend.entities.User;
import com.example.translationsystembackend.mappers.UserMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

@Service
public class UserService {

    @Resource
    private UserMapper userMapper;

    public void createUser(User user) {
        userMapper.createUser(user.getUsername(), user.getPasswordDigest(), user.getStatus(), user.getPoints(), user.getCreated(), user.getLastLogin(), user.getToken());
    }

    public void deleteByUsername(String username) {
        userMapper.deleteUserByUserName(username);
    }

    public User getUserByUsername(String username) {
        return userMapper.getUserByUsername(username);
    }

    public void updateUserByUsername(User user, String oldUsername) {
        userMapper.updateUserByUsername(user.getUsername(), user.getPasswordDigest(), user.getStatus(), user.getPoints(), user.getCreated(), user.getLastLogin(), user.getToken(), oldUsername);
    }

    public void updateLoginInfoByUsername(Date lastLogin, String token, String username) {
        userMapper.updateLoginInfoByUsername(lastLogin, token, username);
    }

}
