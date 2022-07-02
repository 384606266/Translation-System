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

    public void createFile(String filename, String user, int value, byte[] content) {
        fileMapper.createFile(filename, user, value, content);
    }

    public void deleteFile(int id) {
        fileMapper.deleteFile(id);
    }

    public void deleteFileByUser(String user) {
        fileMapper.deleteFileByUser(user);
    }

    public List<File> getFile(){
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

    public byte[] downloadFile(int id) {
        return fileMapper.downloadFile(id);
    }

    public void updateFile(int value, byte[] content, int id) {
        fileMapper.updateFile(value, content, id);
    }

    public void updateFile(File file) {
        updateFile(file.getValue(), file.getContent(), file.getId());
    }

}
