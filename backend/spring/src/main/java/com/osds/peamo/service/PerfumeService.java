package com.osds.peamo.service;

import com.osds.peamo.model.entity.Perfume;
import com.osds.peamo.repository.PerfumeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Slf4j
public class PerfumeService {

    @Autowired
    private PerfumeRepository perfumeRepository;

    public ArrayList<Perfume> getPerfumes(int page) {

        long startNum = 26120000;
        startNum += (page - 1) * 20;
        ArrayList<Perfume> result = perfumeRepository.findTop20ByIdGreaterThanEqual(startNum);

        return result;
    }

    public Perfume getPerfume(long id) {
        Perfume result = perfumeRepository.getPerfumeById(id);

        return result;
    }

}
