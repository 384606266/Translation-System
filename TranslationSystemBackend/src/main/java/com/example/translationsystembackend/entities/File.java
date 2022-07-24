package com.example.translationsystembackend.entities;

import lombok.Data;

import java.io.Serializable;

@Data
public class File implements Serializable {

    private int id;
    private String filename;
    private String user;
    private int cost;

}
