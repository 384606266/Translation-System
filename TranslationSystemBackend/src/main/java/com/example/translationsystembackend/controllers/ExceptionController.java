package com.example.translationsystembackend.controllers;

import com.example.translationsystembackend.exceptions.IllegalLoginStatusException;
import com.example.translationsystembackend.exceptions.NoUserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

    /**
     * @return 404错误
     *
     * <p>处理未找到用户的错误。</p>
     */
    @ExceptionHandler({NoUserException.class})
    public ResponseEntity<String> noUser() {
        return new ResponseEntity<>("No user named exists.", HttpStatus.NOT_FOUND);
    }

    /**
     * @return 401错误
     *
     * <p>处理用户登陆状态不合法的错误。</p>
     */
    @ExceptionHandler({IllegalLoginStatusException.class})
    public ResponseEntity<String> illegalLoginStatus() {
        return new ResponseEntity<>("The status of login is illegal.", HttpStatus.UNAUTHORIZED);
    }

}
