package com.example.translationsystembackend.interceptors;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * 允许方法绕过token检查
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface PassToken {
    boolean require() default true;
}
