package com.osds.peamo.service;

import com.osds.peamo.model.entity.Brand;
import com.osds.peamo.repository.BrandRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Slf4j
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    /**
     * 브랜드 리스트 가져오기
     */
    public ArrayList<Brand> getBrandList() {
        ArrayList<Brand> brand = brandRepository.findAll();
        return brand;
    }

    /**
     * 하나의 브랜드 가져오기
     */
    public Brand getBrand(long id) {
        Brand brand = brandRepository.getBrandById(id);
        return brand;
    }

}
