package com.example.translationsystembackend.interceptors;

import com.example.translationsystembackend.entities.User;
import com.example.translationsystembackend.exceptions.IllegalLoginStatusException;
import com.example.translationsystembackend.exceptions.NoUserException;
import com.example.translationsystembackend.services.UserService;
import com.example.translationsystembackend.utils.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Date;

@Component
public class LoginStatusInterceptor implements HandlerInterceptor {

    static final long EXPIRATION_MS = 24L * 60 * 60 * 60 * 1000;

    @Autowired
    private UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }
        if (handler instanceof HandlerMethod) {
            Method method = ((HandlerMethod) handler).getMethod();
            if (method.isAnnotationPresent(PassToken.class) && method.getAnnotation(PassToken.class).require()) {
                return true;
            }
        }
        String username = request.getHeader(LoginUtil.USERNAME_H);
        String token = request.getHeader(LoginUtil.TOKEN_H);
        if (token == null) {
            throw new IllegalLoginStatusException();
        } else if (username == null) {
            throw new NoUserException();
        } else {
            User user = userService.getUserByUsername(username);
            if (user == null) {
                throw new NoUserException();
            }
            Date now = new Date();
            if (!user.getToken().equals(token) || (now.getTime() - user.getLastLogin().getTime() > EXPIRATION_MS)) {
                throw new IllegalLoginStatusException();
            }
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
