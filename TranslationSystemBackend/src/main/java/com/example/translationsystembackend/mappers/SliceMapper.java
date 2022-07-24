package com.example.translationsystembackend.mappers;

import com.example.translationsystembackend.entities.Slice;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface SliceMapper {

    @Insert("INSERT INTO slice(id, file, content) VALUES(#{id}, #{file}, #{content});")
    void createSlice(@Param("id") int id, @Param("file") int file, @Param("content") byte[] content);

    @Delete("DELETE FROM slice WHERE id=#{id} AND file=#{file};")
    void deleteSlice(@Param("id") int id, @Param("file") int file);

    @Delete("DELETE FROM slice WHERE file=#{file};")
    void deleteSlicesByFile(@Param("file") int file);

    @Select("SELECT * FROM slice WHERE id=#{id} AND file=#{file};")
    Slice getSlice(@Param("id") int id, @Param("file") int file);

    @Select("SELECT id FROM slice WHERE file=#{file} ORDER BY id;")
    List<Integer> getIdsByFile(@Param("file") int file);

}
