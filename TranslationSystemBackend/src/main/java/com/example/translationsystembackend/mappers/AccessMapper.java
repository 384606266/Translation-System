package com.example.translationsystembackend.mappers;

import com.example.translationsystembackend.entities.Access;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AccessMapper {

    @Insert("INSERT INTO access VALUES(#{username}, #{id}, #{flag});")
    void createAccess(@Param("username") String username, @Param("id") int id, @Param("flag") int flag);

    @Delete("DELETE FROM access WHERE username=#{username}, id=#{id};")
    void deleteAccess(@Param("username") String username, @Param("id") int id);

    @Delete("DELETE FROM access WHERE username=#{username};")
    void deleteAccessByUsername(@Param("username") String username);

    @Delete("DELETE FROM access WHERE id=#{id};")
    void deleteAccessById(@Param("id") int id);

    @Select("SELECT * FROM access WHERE username=#{username} AND id=#{id};")
    Access getAccess(@Param("username") String username, @Param("id") int id);

    @Select("SELECT * FROM access WHERE username=#{username};")
    List<Access> getAccessByUsername(@Param("username") String username);

    @Select("SELECT * FROM access WHERE id=#{id};")
    List<Access> getAccessById(@Param("id") int id);

    @Update("UPDATE access SET flag=#{flag} WHERE username=#{username} AND id=#{id};")
    void updateAccess(@Param("flag") char flag, @Param("username") String username, @Param("id") int id);

}
