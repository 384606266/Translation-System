package com.example.translationsystembackend.services;

import com.example.translationsystembackend.entities.Slice;
import com.example.translationsystembackend.mappers.SliceMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class SliceService {

    @Resource
    private SliceMapper sliceMapper;

    public void createSlice(int id, int file, byte[] content) {
        sliceMapper.createSlice(id, file, content);
    }

    public void deleteSlice(int id, int file) {
        sliceMapper.deleteSlice(id, file);
    }

    public void deleteSliceByFile(int file) {
        sliceMapper.deleteSlicesByFile(file);
    }

    public Slice getSlice(int id, int file) {
        return sliceMapper.getSlice(id, file);
    }

    public List<Integer> getIdsByFile(int file) {
        return sliceMapper.getIdsByFile(file);
    }

}
