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

    public int createFile(File file) {
        return fileMapper.createFile(file.getFilename(), file.getUser(), file.getCost());
    }

    public int createFile(String filename, String user, int cost) {
        return fileMapper.createFile(filename, user, cost);
    }

    public void deleteFile(int id) {
        fileMapper.deleteFile(id);
    }

    public void deleteFileByUser(String user) {
        fileMapper.deleteFileByUser(user);
    }

    public List<File> getFile() {
        return fileMapper.getFile();
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

    public void updateFile(int value, int id) {
        fileMapper.updateFile(value, id);
    }

    public void updateFile(File file) {
        updateFile(file.getCost(), file.getId());
    }

}
