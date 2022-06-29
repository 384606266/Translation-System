package com.example.translationsystembackend.services;

import com.example.translationsystembackend.entities.File;
import com.example.translationsystembackend.mappers.FileMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class FileService {

    @Resource
    private FileMapper fileMapper;

    public void createFile(File file) {
        fileMapper.createFile(file.getFilename(), file.getUser(), file.getValue(), file.getContent());
    }

    public void deleteFile(int id) {
        fileMapper.deleteFile(id);
    }

    public File getFileById(int id) {
        return fileMapper.getFileById(id);
    }

    public List<File> getFileByName(String filename) {
        return fileMapper.getFileByName(filename);
    }

    public List<File> getFileByUser(String user) {
        return fileMapper.getFileByUser(user);
    }

    public void updateFile(int value, byte[] content, int id) {
        fileMapper.updateFile(value, content, id);
    }

}
