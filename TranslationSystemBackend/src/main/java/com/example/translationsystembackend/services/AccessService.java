package com.example.translationsystembackend.services;

import com.example.translationsystembackend.entities.Access;
import com.example.translationsystembackend.mappers.AccessMapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AccessService {

    public static final int READ_FLAG = 0x1;
    public static final int WRITE_FLAG = 0x2;

    @Resource
    private AccessMapper accessMapper;

    public void createAccess(String username, int id, int flag) {
        accessMapper.createAccess(username, id, flag);
    }

    public void createAccess(Access access) {
        accessMapper.createAccess(access.getUsername(), access.getId(), access.getFlag());
    }

    public void deleteAccess(String username, int id) {
        accessMapper.deleteAccess(username, id);
    }

    public void deleteAccess(Access access) {
        accessMapper.deleteAccess(access.getUsername(), access.getId());
    }

    public void deleteAccessByUsername(String username) {
        accessMapper.deleteAccessByUsername(username);
    }

    public void deleteAccessById(int id) {
        accessMapper.deleteAccessById(id);
    }

    public Access getAccess(String username, int id) {
        return accessMapper.getAccess(username, id);
    }

    public List<Access> getAccessByUsername(String username) {
        return accessMapper.getAccessByUsername(username);
    }

    public List<Access> getAccessById(@Param("id") int id) {
        return accessMapper.getAccessById(id);
    }

    public void updateAccess(int flag, String username, int id) {
        accessMapper.updateAccess(flag, username, id);
    }

    public boolean isReadable(String username, int id) {
        Access access = getAccess(username, id);
        if (access == null) {
            return false;
        } else {
            return (access.getFlag() & READ_FLAG) != 0x0;
        }
    }

    public boolean isWritable(String username, int id) {
        Access access = getAccess(username, id);
        if (access == null) {
            return false;
        } else {
            return (access.getFlag() & WRITE_FLAG) != 0x0;
        }
    }

    public void grantReadAccess(String username, int id) {
        Access access = getAccess(username, id);
        if (access == null) {
            createAccess(username, id, 0x1);
        } else {
            updateAccess((char) (access.getFlag() | READ_FLAG), username, id);
        }
    }

    public void grantWriteAccess(String username, int id) {
        Access access = getAccess(username, id);
        if (access == null) {
            createAccess(username, id, 0x2);
        } else {
            updateAccess((char) (access.getFlag() | WRITE_FLAG), username, id);
        }
    }

    public void deleteReadAccess(String username, int id) {
        Access access = getAccess(username, id);
        if (access != null) {
            if (access.getFlag() == (READ_FLAG | WRITE_FLAG)) {
                updateAccess(WRITE_FLAG, username, id);
            } else if (access.getFlag() == READ_FLAG) {
                deleteAccess(username, id);
            }
        }
    }

    public void deleteReadAccess(Access access) {
        deleteReadAccess(access.getUsername(), access.getId());
    }

    public void deleteWriteAccess(String username, int id) {
        Access access = getAccess(username, id);
        if (access != null) {
            if (access.getFlag() == (READ_FLAG | WRITE_FLAG)) {
                updateAccess(READ_FLAG, username, id);
            } else if (access.getFlag() == WRITE_FLAG) {
                deleteAccess(username, id);
            }
        }
    }

    public void deleteWriteAccess(Access access) {
        deleteWriteAccess(access.getUsername(), access.getId());
    }

}
