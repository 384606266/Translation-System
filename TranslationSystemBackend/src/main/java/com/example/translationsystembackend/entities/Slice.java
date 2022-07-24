package com.example.translationsystembackend.entities;

import lombok.Data;

import java.io.Serializable;

@Data
public class Slice implements Serializable {

    static public final int SLICE_SIZE = 0x4000;

    private int id;
    private int file;
    private byte[] content;

}
