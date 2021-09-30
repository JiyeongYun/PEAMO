package com.osds.peamo.repository;

import com.osds.peamo.model.entity.Brand;
import com.osds.peamo.model.entity.Perfume;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface BrandRepository extends JpaRepository<Brand, Long> {

    ArrayList<Brand> findAll();
    Brand getBrandById(long id);

}
