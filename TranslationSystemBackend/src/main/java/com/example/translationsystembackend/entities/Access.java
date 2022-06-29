package com.example.translationsystembackend.entities;

import lombok.Data;

import java.io.Serializable;

@Data
public class Access implements Serializable {

    private String username;
    private int id;
    private char flag;

}
