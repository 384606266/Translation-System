package com.example.translationsystembackend.utils;

import java.util.Random;

public class LoginUtil {

    static final public String USERNAME_H = "Username";
    static final public String TOKEN_H = "Token";

    public static String getRandomToken() {
        String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < 64; ++i) {
            int number = random.nextInt(62);
            stringBuilder.append(str.charAt(number));
        }
        return stringBuilder.toString();
    }

}
