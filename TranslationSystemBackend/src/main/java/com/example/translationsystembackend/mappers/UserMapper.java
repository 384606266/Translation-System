package com.example.translationsystembackend.mappers;

import com.example.translationsystembackend.entities.User;
import org.apache.ibatis.annotations.*;

import java.util.Date;

@Mapper
public interface UserMapper {

    @Insert("INSERT INTO user VALUES(#{username}, #{password_digest}, #{status}, #{points}, #{created}, #{last_login}, #{token});")
    void createUser(@Param("username") String username, @Param("password_digest") byte[] passwordDigest, @Param("status") int status, @Param("points") int points, @Param("created") Date created, @Param("last_login") Date lastLogin, @Param("token") String token);

    @Delete("DELETE FROM user WHERE username=#{username};")
    void deleteUserByUserName(@Param("username") String username);

    @Select("SELECT * FROM user WHERE username=#{username};")
    User getUserByUsername(@Param("username") String username);

    // 不应该允许对用户名的修改
    @Update("UPDATE user SET password_digest=#{password_digest}, status=#{status}, points=#{points}, created=#{created}, last_login=#{last_login}, token=#{token} WHERE username=#{username};")
    void updateUserByUsername(@Param("password_digest") byte[] passwordDigest, @Param("status") int status, @Param("points") int points, @Param("created") Date created, @Param("last_login") Date lastLogin, @Param("token") String token, @Param("username") String username);

    @Update("UPDATE user SET last_login=#{last_login}, token=#{token} WHERE username=#{username};")
    void updateLoginInfoByUsername(@Param("last_login") Date lastLogin, @Param("token") String token, @Param("username") String username);
}
