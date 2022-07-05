package com.example.translationsystembackend.mappers;

import com.example.translationsystembackend.entities.File;
import org.apache.ibatis.annotations.*;

import java.io.ByteArrayInputStream;
import java.util.List;


@Mapper
public interface FileMapper {

    @Insert("INSERT INTO file(filename, user, cost, content) VALUES(#{filename}, #{user}, #{cost}, #{content});")
    void createFile(@Param("filename") String filename, @Param("user") String user, @Param("cost") int cost, @Param("content") byte[] content);

    @Delete("DELETE FROM file WHERE id=#{id};")
    void deleteFile(@Param("id") int id);

    @Delete("DELETE FROM file WHERE user=#{user};")
    void deleteFileByUser(@Param("user") String user);

    @Select("SELECT id, filename, user, cost, 0 FROM file;")
    List<File> getFile();

    @Select("SELECT id, filename, user, cost, 0 FROM file WHERE id=#{id};")
    File getFileById(@Param("id") int id);

    @Select("SELECT id, filename, user, cost, 0 FROM file WHERE filename=#{filename};")
    List<File> getFileByName(@Param("filename") String filename);

    @Select("SELECT id, filename, user, cost, 0 FROM file WHERE user=#{user};")
    List<File> getFileByUser(@Param("user") String user);

    @Select("SELECT content FROM file WHERE id=#{id};")
    ByteArrayInputStream downloadFile(@Param("id") int id);

    @Update("UPDATE file SET cost=#{cost}, content=#{content} WHERE id=#{id};")
    void updateFile(@Param("cost") int cost, @Param("content") byte[] content, @Param("id") int id);

}
