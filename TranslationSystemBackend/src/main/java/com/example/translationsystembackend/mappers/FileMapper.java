package com.example.translationsystembackend.mappers;

import com.example.translationsystembackend.entities.File;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface FileMapper {

    @Insert("INSERT INTO file(filename, user, value, content) VALUES(#{filename}, #{user}, #{value}, #{content});")
    void createFile(@Param("filename") String filename, @Param("user") String user, @Param("value") int value, @Param("content") byte[] content);

    @Delete("DELETE FROM file WHERE id=#{id};")
    void deleteFile(@Param("id") int id);

    @Select("SELECT * FROM file WHERE id=#{id};")
    File getFileById(@Param("id") int id);

    @Select("SELECT * FROM file WHERE file_name=#{filename};")
    List<File> getFileByName(@Param("filename") String filename);

    @Select("SELECT FROM file WHERE user=#{user};")
    List<File> getFileByUser(@Param("user") String user);

    @Update("UPDATE file SET value=#{value}, content=#{content} WHERE id=#{id};")
    void updateFile(@Param("value") int value, @Param("content") byte[] content, @Param("id") int id);

}
